---
layout: default
title: Config
nav_order: 7
---
# Config
config ทั้งหมดที่ใช้ Noob Engine

## General
ตั้งค่าพื้นฐานสำหรับ Noob Engine

| Name      | Type                    | Attribute   | Default     |Description                           |
|-----------|-------------------------|-------------|-------------|--------------------------------------|
| route     | [Router Setting Array Object](#router-setting-object)   | required    | หากมี model จะ generate ตาม model            |config สำหรับ map controller และ model |
| database  | [Database Setting Array Object](#database-setting-object) |             |             |config สำหรับฐานข้อมูล                   |
| auth      | [Auth Setting Object](#authen-setting-object)     |             |             |config สำหรับ authen โดยใช้ passport.js |
| port      | int                     |             | 3000            |port ที่ต้องการสำหรับ run service                                      |
| baseUrl   | string                  |             |             |base url สำหรับในกรณีที่ service อยู่ใน sub directory |

## Router Setting Object
ตั้งค่า Router ต่างๆ สำหรับ Noob Engine

| Name      | Type                    | Attribute   | Default     |Description                           |
|-----------|-------------------------|-------------|-------------|--------------------------------------|
| path     | string   | required    ||ชื่อตามชื่อไฟล์ของ model |
| model  | string หรือ model ของเรา |required||controller ที่เรา extends                   |
| children | Children Path Object     ||             |ใช้กรณีที่ต้องการ map path เพิ่มเติม |
| children.path      | string         |require||sub path สำหรับแต่ละแต่ละ request ที่เข้ามา                                    |
| children.method    | string         |require||method สำหรับ method นี้|
| children.function  | string         |require|| ชื่อฟังชันที่ควบคุม path |

## Database Setting Object
ตั้งค่าฐานข้อมูลสำหรับ Noob Engine

| Name      | Type                    | Attribute   | Default     |Description                           |
|-----------|-------------------------|-------------|-------------|--------------------------------------|
| dbName    | Object   | required    ||ชื่อฐานข้อมูลใช้เวลาเรียกใช้งานฐานข้อมูลตัวพื้นฐานชื่อว่า Default |
| dbName.engine  | string | required ||ประเภทของฐานข้อมูลที่ต้องการใช้งานปัจุบันรองรับ postgres และ mysql|
| dbName.hostname | string     | required |             | |
| dbName.port      | string         |require||port ที่ใช้ในการเชื่อมต่อกับฐานข้อมูล                                    |
| dbName.username    | string         |require||username ที่ใช้เชื่อมต่อกับฐานข้อมูล|
| dbName.password  | string         |require|| ชื่อฟังชันที่ควบคุม path |
| dbName.database  | string         |require|| ชื่อฐานข้อมูลที่ต้องการเชื่อมต่อ |
| dbName.limit  | string         |require|| จำนวนแถวต่อการ get pagination เท่านั้น |
| dbName.migration | Migration Object || |config สำหรับการ auto migration |

## Migration Setting Object

ตั้งค่าสำหรับทำ Auto Mirgration บน Noob Engine

| Name            | Type                    | Attribute   | Default     |Description                           |
|-----------------|-------------------------|-------------|-------------|--------------------------------------|
| migration.enable| boolean                 |             | false       |ถ้าเป็น true จะทำการ noob engine จะทำ generate model ขึ้นมาตามตารางในฐานข้อมาตามฐานข้อมูลของเราให้อัตโนมัติ |
| migration.force| boolean                 |             | false       |ถ้าเป็น true noob engine จะทำการ genereate model ***ขึ้นใหม่ทับไฟล์เก่าทุกครั้ง*** ที่มีการ start service |       
| migration.dir| string                 |             | 'model'       |default directory path  ที่ต้องการให้ noob generate model ให้|
|migration.additional|Sequelize Model Option |        |               | setting สำหรับ model ที่จะ generate ขึ้นมา อ่านเพิ่มเติมได้ ที่นี่ |

## Authen Setting Object
ตั้งค่าสำหรับการทำ Authen โดยใช้งานร่วมกับ [Passport.js](http://www.passportjs.org/)

| Name            | Type                    | Attribute   | Default     |Description                           |
|-----------------|-------------------------|-------------|-------------|--------------------------------------|
| secret| string                 | require             |        | secret key สำหรับสร้าง token |
| path| string                 |  require            | '/login'       |path สำหรับ authen default เป็น login |       
| controller| Noob Authen Class | require             |     |controller สำหรับจัดการการ authen |
