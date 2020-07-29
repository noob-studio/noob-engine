---
layout: default
title: Controller
has_children: true
nav_order: 4
---
## Controller

controller คือตัวบริหารจัดการ request ที่เข้ามาอาจจะเรียกว่าเป็นส่วนของ logic ก็ได้โดย noob engine มี default controller สำหรับทุก route ให้โดยอัตโนมัติแล้ว แต่คุณสามารถ extends เพื่อเพิ่มฟังชันใหม่ๆได้ โดยใน controller มี default method กับ property มาให้ดังนี้

```js

    class Controller extends Noob.controller {
        async get (req, res) {
            this.output.success(res, 'Hello Noob')
        }
    }
    module.exports = Controller
```
