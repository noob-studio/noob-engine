---
layout: default
title: Database
parent: Helper
nav_order: 2
---
# Database
class database สร้างขึ้นเพื่อช่วยให้การทำงานร่วมกับ Sequelize ง่ายมากขึ้นโดยสามารถเรียกใช้ใน controller ได้ผ่าน `this.db`

## Method
### select() 
คิวรี่ข้อมูลจากตารางใดๆ ก็ได้ตาม พร้อม pagination

#### Parameter

| Name        | Type                   | Attribute | Description                                                                  |
|-------------|------------------------|-----------|------------------------------------------------------------------------------|
| select       | string                 | require   | ฟิลด์ที่ต้องการ select        |
| table         | string        | require   | ตารางที่ต้องการ |
| page         | int |           | page ที่ต้องการคิวรี่ |
| condition | string                |           | เงื่อนไขที่ต้องการคิวรี่
| groupBy   | string                |           | group by อะไร       |

### loadModel()
ดาวโหลดโมเดลอื่นๆ นอกจาก default model เข้าสู่ controller

#### Parameter

| Name        | Type                   | Attribute | Description                                                                  |
|-------------|------------------------|-----------|------------------------------------------------------------------------------|
| name       | string                 | require   | ชื่อโมเดลที่ต้องการดาวโหลดเข้ามา        |

### isAlive()
เช็คว่าสามารถเชื่อมต่อฐานข้อมูลได้หรือไม่

