---
layout: default
title: Output
parent: Helper
nav_order: 1
---
## Output
เป็นตัวช่วยสำหรับคือข้อมูลให้ Client โดยมี method ต่างๆ ดังนี้

### constructor
* `useEngine` ถ้าเป็น true จะ render ข้อมูลพร้อม binding data ด้วย

### sendResponse()
เป็นฟังชันพื้นฐานสำหรับส่ง response ไปให้ client 

##### parameter
* `res` ***require*** express response object
* `code` http response code เช่น 200 = success, 400 = bad request, 500 = internal error ***default เป็น 200***
* `data` ข้อมูลที่ต้องการคืนกลับไปให้ client
* `headers` headers สำหรับ response หากต้องการ set headers ด้วย

### success()
เป็นฟังชันสำหรับส่ง response แบบ success โดยเฉพาะ ***response code จะเป็น 200 เสมอ***

##### parameter
* `res` ***require*** express response object 
* `data` ข้อมูลที่ต้องการคืนกลับไปให้ client

### error()
เป็นฟังชันสำหรับส่ง response แบบ error โดยเฉพาะ

##### parameter
* `res` ***require*** express response object 
* `error` error ที่ต้องการคืนกลับไปให้ client
* `code` response code ที่ต้องการส่งไปให้ client ***default เป็น 200***

### html()
เป็นฟังชันสำหรับส่ง response แบบ html โดยเฉพาะโดยสามารถทำงานร่วมกับ view engine ได้

##### parameter
* `res` ***require*** express response object 
* `filePath` filePath ที่อยู่ของไฟล์ view
* `data` ข้อมูลที่ต้องการ binding กับ view engine 
