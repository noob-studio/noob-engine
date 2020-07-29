---
layout: default
title: Property
parent: Controller
nav_order: 2
---
## property

### model

default model ของ controller นี้ที่ถูก set มาพร้อมกับตอนตั้ง route

### output

output helper ใช้สำหรับส่ง response ไปที่ client ดูเพิ่มเติมได้ที่ output

```js
    this.output.success(res, data) // send success 200
    this.output.error(res, error) // send error 400
    this.output.error(res, error, 404) // send error 404
    this.outout.sendResponse(res, 200, data) // send success 200
    this.outout.sendResponse(res, 400, null, error) // send error 400
```

