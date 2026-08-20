# Siladon Landscape CMS V2

เวอร์ชันนี้เพิ่ม Decap CMS เพื่อให้แก้ส่วน “ผลงานจัดสวน” ได้เองจาก `/admin/` โดยไม่ต้องแก้ HTML

## โครงสร้าง
- `index.html` หน้าเว็บหลัก
- `data/projects.json` ข้อมูล Project ทั้งหมด
- `admin/index.html` หน้า CMS
- `admin/config.yml` ตั้งค่าช่องแก้ไข
- `images/uploads/` รูปที่อัปโหลดจาก CMS

## ต้องตั้งค่าครั้งเดียวบน GitHub + Netlify
1. นำโฟลเดอร์นี้ขึ้น GitHub repository โดยใช้ branch `main`
2. ที่ Netlify ให้เชื่อมเว็บไซต์เดิม `siladonlandscape.netlify.app` กับ repository นี้ (Deploy from Git)
3. Netlify Dashboard → Integrations / Identity → Enable Netlify Identity
4. Registration ให้เลือก **Invite only**
5. Services → Enable **Git Gateway**
6. Invite อีเมลของเจ้าของเว็บเป็น Identity user
7. หลัง deploy เปิด `https://siladonlandscape.netlify.app/admin/`
8. Login แล้วเข้า “ผลงานจัดสวน” → “อัลบั้ม / โครงการ”

## สิ่งที่แก้เองได้
- เพิ่ม / ลบ / เรียง Project
- รูปหน้าปก
- Gallery หลายรูป
- ชื่อโครงการ
- หมวดงาน
- พื้นที่
- งบประมาณต่ำสุด / สูงสุด
- ระยะเวลาทำงาน
- รายละเอียด
- Tags
- เปิด / ปิดการแสดงผล

เมื่อกด Publish ใน CMS ระบบจะ commit การเปลี่ยนแปลงลง Git repo และ Netlify จะ deploy เว็บเวอร์ชันใหม่
