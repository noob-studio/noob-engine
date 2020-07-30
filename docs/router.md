---
layout: default
title: Router
nav_order: 2
---
# Router

Router คือ config ตัวนึงของ Noob Engine ใช้สำหรับจัดการ request เข้ามาจาก client โดยทำงานร่วมกับ controller และ model

```js
    Engine.set({
        route: [{
            path: '/hello', // path ที่เข้ามา
            model: model // ใส่ noob.model หรือ sequelize.model ก็ได้
            controller: controller, // ใส่ noob controller
            children: [{ // sub path ของ route นี้
                path: '/children', // sub path ที่เข้ามา
                method: 'get', // http method 
                function: 'hello' // ฟังชันที่ใช้ควบคุม sub path นี้
            }]
        }]
    })
```

## property

*   path กำหนด path ที่เข้ามา
*   model ใช้แทนตารางในฐานข้อมูล อ่านเพิ่มเติมได้ที่ model
*   controller ใช้แทนตัวควบคุม อ่านเพิ่มเติมได้ที่ controller
*   children ใช้แทน sub path ใน route นั้นๆ โดยตัวควบคุมแต่ละ sub path คือฟังชันใน controller

## children
*   path กำหนดแทน path ที่เข้ามาใน children นี้
*   method ใช้กำหนดแทน http method 
*   function ชื่อฟังชันใน controller