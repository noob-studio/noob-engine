---
layout: default
title: Property
parent: Engine
nav_order: 2
---
## Property

##### app

express application ที่ใช้ในการ run server

```js
    let app = Engine.app // return express application
    app.get("/", (req, res) => {...})
```

##### config

config ทั้งหมดที่ใช้ใน server ดูที่เพิ่มเติมได้ที่ config

##### db

class database ที่ใช้งานการจัดการกับฐานข้อมูลสร้างขึ้นบน Sequelize ดูเพิ่มเติมได้ที่ Database

