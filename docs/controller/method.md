---
layout: default
title: Method
parent: Controller
nav_order: 2
---
## Method

เป็น method สำหรับช่วยให้การใช้งาน controller ง่ายขึ้น

### getPrimary()

ใช้สำหรับดึง primary key ของ model คืนข้อมูลเป็น string

### loadModel()

ใช้สำหรับเรียก model จากไฟล์เข้ามาใช้งานใน controller
* `parameter` ชื่อโมเดลที่อยู่ในโฟลเดอร์ model

```js
    let MyModel = this.loadModel('blog') 
    let data = MyModel.findAll()
    ...
```

### valiate()

ใช้สำหรับ validate model ว่าถูกต้องตาม type ที่เราตั้งไว้หรือไม่

```js
    await this.validate(req.body) // validate โดยใช้ default model ที่มากับ controller
    await this.validate(req.body, MyModel) // validate โดยกำหนด model ที่ต้องการเอง
```
