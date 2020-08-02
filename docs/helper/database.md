---
layout: default
title: Database
parent: Helper
nav_order: 2
---
# Database
class database สร้างขึ้นเพื่อช่วยให้การทำงานร่วมกับ Sequelize ง่ายมากขึ้นโดยสามารถเรียกใช้ใน controller ได้ผ่าน `this.db`

## Usage
### Setting
วิธีใช้งาน Database ให้ตั้งค่าฐานข้อมูลที่ต้องการเชื่อมต่อก่อน โดยสามารถใส่ได้มากกว่าหนึ่งฐานข้อมูล แต่ตัวที่ถูกเรียกใช้งานจะเป็น default ก่อนเสมอสามารถอ่านเพิ่มเพิ่มได้ [ที่นี่](https://noob-studio.github.io/noob-engine/config.html#database-setting-object)

```js
Engine.set(
    {
        ...
        database: {
          default: {
            engine: 'mysql',
            hostname: 'localhost',
            port: '3306',
            username: 'admin',
            password: '',
            database: 'blog',
            limit: '10'
          }
        }
        ...
    }
)
```

### Model Generator
Noob Engine ใช้ [Sequelize Auto](https://github.com/sequelize/sequelize-auto) ในการสร้างโมเดลอัตโนมัติตามฐานข้อมูล หรือสร้างฐานข้อมูลอัตโนมัติตามโมเดล โดยมีตัวอย่างการใช้งานดังนี้
เพิ่มเติม
* [model](https://noob-studio.github.io/noob-engine/model.html)
* [config](https://noob-studio.github.io/noob-engine/config.html#migration-setting-object)
```js
database: {
    default: {
        ...
        migration: {
            enable: true,
            force: false,
            dir: 'model',
            additional: {
                timestamps: false,
                createdAt: true,
                updatedAt: true,
                force: true
            }
        },
    }
}
```

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

