---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
nav_order: 1
---
# Noob Engine
framework ที่ทำให้คุณ `Code น้อยลง`เพื่อที่จะมีเวลา `คิดมากขึ้น`

[ติดตั้ง](#install){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/noob-studio/noob-engine){: .btn .fs-5 .mb-4 .mb-md-0 }

* `Develop Fast`
เพียงแค่ 5 พอคุณก็มี API พร้อมใช้งานสำหรับฐานข้อมูลของคุณ หรือเริ่มสร้างใหม่ตั้งแต่ต้นก็ยังได้

* `Simple`
ใช้งานง่ายเพียงมีพื้นฐาน Javascript โปรแกรมนิดหน่อยก็สามารถเร่ิมใช้งานได้

* `Customizable`
สร้างขึ้นบน express และ sequelize ทำให้สามารถใช้ร่วมกับ middleware ต่างๆ ได้

#### Table Of Content
* Concept (Comming Soon)
* Example (Comming Soon)
* [Engine](/engine)
* [Router](/router)
* [Model](/model)
* [Controller](/controller)
* [Helper](/helper)
* [Config](/config)

## Install

เพื่อใช้งาน noob engine คุณต้องติดตั้ง node.js ในเครื่องก่อน
```js
    mkdir awesome-api
    cd awesome-api
    npm install --save noob-engine
```

## Usage

สร้างไฟล์ `index.js` ขึ้นมาแล้วเพิ่ม code ข้างล่างนี้ลงไป

```js 
    const Noob = require('noob-engine')
    const Engine = new Noob.engine()

    class Controller extends Noob.controller {
        get (req, res) {
          this.output.success(res, 'Hello Noob')
      }
    }

    Engine.set({
        route: [{
          path: '/',
          controller: Controller
        }]
    })

    Engine.start()
```
จากนั้นพิมพ์คำสั่ง

```js
    node index.js
```

noob engine จะเพิ่มทำงานอัตโนมัติที่ port 3000 เมื่อเปิด browser ไปที่ `http://localhost:3000` ก็จะพบกับคำว่า 

```js
Hello Noob
```

ต่อไป [Engine](/Engine)

#### Road Map

* First Release `in progress`
    * core feature `done`
    * make document `80%`
    * make unit test `todo`
* Noob Editor - เครื่องมือที่จะช่วยให้การเขียน API ง่ายขึ้น และมี Quality มากขึ้น
    * core feature `40%`
* Second Release `todo`
    * auto generate swagger `todo`
    * auto generate unit test script `todo`
    * noob cli `todo`