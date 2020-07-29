---
layout: default
title: Method
parent: Engine
nav_order: 1
---
## Method

### set()

ใช้สำหรับตั้งค่าต่างๆ ใน noob engine วิธีการเรียกใช้งาน
```js
    Engine.set({...})
```
สามารถดู config เพิ่มเติมได้ในส่วนของ config

### setPublic()

ใช้สำหรับ set public path ในกรณีที่ต้องการส่ง output เป็น file static
```js
    Engine.setPublic({ 
        dir: 'example/public',  // path ที่ต้องการให้เป็น public
        path: '/assets' // path ที่ต้องการให้มองเห็นไม่ต้องใส่จะ set default ไปที่ dir path
    })
```
### use()

ใช้สำหรับเรียกใช้งาน express middleware ต่างๆ เช่น

```js
    const compression = require('compression')
    Engine.use(compression())
```

### start()

ใช้สำหรับเริ่ม start service ของเรา

##### parameter
* `callback` ส่ง callback ฟังชันเข้าไป ฟังชันนี้จะถูกเรียกใช้งานหลังจาก start service แล้วโดยข้างในฟังชันนี้จะคือ property และ method ทุกอย่างที่ noob engine สร้างขึ้นในขณะที่ run time มาให้ผ่าน parameter
* `app` express application ใช้สำหรับ overwrite default express ของ noob.engine
```js
    Engine.start() // วิธีปกติ
    
    Engine.start((app) => {
        console.log(`start noob engine at port ${app.config.port}`)
    }) // call with callback function

    const app = express()
    Engine.start(null, app) // overwrite default express
```
