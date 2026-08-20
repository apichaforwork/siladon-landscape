const IDENTITY_BASE = 'https://siladonlandscape.netlify.app/.netlify/identity';

exports.handler = async function (event) {
  return proxyNetlifyService(event, IDENTITY_BASE, 'cms-auth');
};

async function proxyNetlifyService(event, baseUrl, proxyName) {
  const path = getProxyPath(event.path, proxyName);
  const targetUrl = new URL(path, baseUrl + '/');

  if (event.rawQuery) {
    targetUrl.search = event.rawQuery;
  }

  const headers = { ...event.headers };
  delete headers.host;
  delete headers['content-length'];

  const response = await fetch(targetUrl, {
    method: event.httpMethod,
    headers,
    body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body,
  });

  const responseHeaders = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: await response.text(),
  };
}

function getProxyPath(eventPath, proxyName) {
  const marker = `/${proxyName}/`;
  const markerIndex = eventPath.indexOf(marker);

  if (markerIndex >= 0) {
    return eventPath.slice(markerIndex + marker.length);
  }

  const functionMarker = `/.netlify/functions/${proxyName}/`;
  const functionIndex = eventPath.indexOf(functionMarker);

  if (functionIndex >= 0) {
    return eventPath.slice(functionIndex + functionMarker.length);
  }

  return '';
}
