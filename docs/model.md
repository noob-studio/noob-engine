---
layout: default
title: Model
nav_order: 3
---
## Model

Model คือ ตัวแทนตารางในฐานข้อมูลสร้างขึ้นบนพื้นฐานของ Sequelize โดยมีสองแบบคือ
* `Sequelize` เป็น model ที่ระบบทำการ generate ขึ้นมาเหมาะสำหรับกรณีที่มีฐานข้อมูลอยู่แล้ว สำหรับการให้งาน model แบบ sequelize สามารถอ่านเพิ่มเติมได้ ที่นี่

```js
    function (sequelize, DataTypes) {
      return sequelize.define('blog', {
        blog_id: {
          type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        blog_name: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }, {
        tableName: 'blog',
        timestamps: false,
        createdAt: false,
        updatedAt: false
      })
    } // ประกาศ model แบบ sequelize
```
* `Noob.model` เป็นตัวช่วยทำให้สามารถใช้งาน Sequelize ได้ง่ายขึ้นเหมาะสำหรับใช้งานในกรณีที่ยังไม่ได้สร้างตาราง
```js
    const blog = new Noob.model('blog', {
      blog_id: {
        type: DataTypes.INTEGER(10),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      autoGen: true,
      force: false
    }) // ประกาศ model แบบ noob
```
### Parameter

| Name        | Type                   | Attribute | Description                                                                  |
|-------------|------------------------|-----------|------------------------------------------------------------------------------|
| tname       | string                 | require   | ชื่อตาราง                                                                      |
| obj         | Sequelize Model        | require   | รายระเอียดของ column ในตาราง อ่านเพิ่มเติมได้ที่ Sequelize Model                     |
| otp         | Sequelize Model Option |           | option ต่างๆของ model นี้ extends มาจาก Sequelize Model โดยมี property เพิ่มเติมดังนี้ |
| otp.autoGen | boolean                |           | ถ้าเป็น true จะสร้างตารางให้อัตโนมัติ default เป็น `false`                           |
| otp.force   | boolean                |           | ถ้าเป็น **true** เวลาสร้าง**ตารางจะ drop ก่อนทุกครั้ง** default เป็น `false`         |
| name        | string                 |           | ชื่อของ model นี้ตั้งหรือไม่ตั้งก็ได้                                                    |