'use strict'
const Noob = require('../server.js')
const Engine = new Noob.engine()

class Controller extends Noob.controller {
  async get (req, res) {
    this.output.html(res, 'index.html')
  }
}

Engine.set({
  publicDir: { dir: 'public', path: '/assets' },
  route: [{
    path: '/',
    controller: Controller
  }]
})

Engine.start((app) => {
  console.log(JSON.stringify(app.config))
})
