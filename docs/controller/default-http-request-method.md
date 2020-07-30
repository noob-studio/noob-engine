---
layout: default
title: Default Http Request Method
parent: Controller
nav_order: 1
---
## Default Http Request Method

เป็น default ฟังชันสำหรับจัดการ http request method คุณสามารถ overwrite ได้โดยประกาศชื่อฟังชันนี้อีกครั้งใน controller ของคุณ

### get()

* `description` ใช้สำหรับจัดการ request method get (ใช้สำหรับอ่านข้อมูล)
* `parameter`
    *   request: เก็บ request อ่านเพิ่มเติมได้ที่ request
    *   response: เก็บ response ที่จะส่งออกไปอ่านเพิ่มเติมได้ที่ response

#### Request Data
* `content-type`  application/json
* `query string`   
    *   ไม่ใส่เพื่อ get all 
    *   ใส่ primary key เพื่อ get one `?id=1`
    *   ใส่ page เพื่อ get by page `?page=1`
    *   ใส่ชื่อ column เพื่อ where ตามชื่อคอลัมม์ในตาราง `?fname=hello&lname=world`

#### Response Data
```js

[{
  id: 1,
  fname: "hello",
  lname: "lady"
}{
  id: 2,
  fname: "hello",
  lname: "world"
}] // get all

// request ?id=1
{
  id: 1,
  fname: "hello",
  lname: "lady"
} // get by id

// request ?fname=hello&lname=world
[{
  id: 2,
  fname: "hello",
  lname: "world"
}] // get where

// request ?page=1
{   
    docs: [{
        id: 2,
        fname: "hello",
        lname: "world"
    }],
    page: 1, //หน้าปัจจุบัน
    total: 100 // จำนวนข้อมูลทั้งหมด
} // get page

```

### post()
* `description` ใช้สำหรับจัดการ request method post (ใช้สำหรับเพิ่มข้อมูลลงฐานข้อมูล)
* `parameter`
    *   request: เก็บ request อ่านเพิ่มเติมได้ที่ request
    *   response: เก็บ response ที่จะส่งออกไปอ่านเพิ่มเติมได้ที่ response

#### Request Data
* `content-type`  application/json
* `body` json object ตาม model โดยจะมีการ validate ทุกครั้งก่อนทำ insert ข้อมูล

#### Response Data
ข้อมูลที่ทำการ insert ลงไป

### patch()
* `description` ใช้สำหรับจัดการ request method patch (ใช้สำหรับแก้ไขข้อมูลข้อมูล)
* `parameter`
    *   request: เก็บ request อ่านเพิ่มเติมได้ที่ request
    *   response: เก็บ response ที่จะส่งออกไปอ่านเพิ่มเติมได้ที่ response

#### Request Data

* `content-type`  application/json
* `query string` เงื่อนไขที่ต้องการให้ update `?id=1`
* `body` json object ตาม model ที่ถูกส่งมา `จะถูกแก้ไข`

#### Response Data
ข้อมูลที่ทำการอัพเดต หรือจำนวนถูกที่ถูกอัพเดต

### delete()

* `description` ใช้สำหรับจัดการ request method delete (ใช้ลบข้อมูล)
* `parameter`
    *   request: เก็บ request อ่านเพิ่มเติมได้ที่ request
    *   response: เก็บ response ที่จะส่งออกไปอ่านเพิ่มเติมได้ที่ response

#### Request Data
* `content-type`  application/json
* `query string`  เงื่อนไขที่ต้องการให้ลบ

#### Response Data
จำนวนแถวที่ถูกลบ
