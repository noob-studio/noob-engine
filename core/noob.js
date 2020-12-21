const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const passport = require('passport')
const Database = require('./database')
const NoobController = require('./controller')
// const Authen = require('./authen')
const Http = require('./http')
const router = express.Router()

class NoobEngine {
  constructor () {
    this.config = {
      baseUrl: '',
      auth: {
        secret: 'my secret code',
        path: '/login',
        refreshToken: '/refresh_token'
      },
      port: 3000
    }
    this.app = express()
  }

  set (config) {
    this.config = { ...this.config, ...config }
  }

  async setRoute () {
    if(this.config.auth.controller){
      router.use(this.auth.authMiddleWare)
    }
    for (let i = 0; i < this.config.route.length; i++) {
      const route = this.config.route[i]
      let ctrl = null
      let model = null

      if (route.model) {
        if (this.config.database) {
          if (typeof route.model === 'string') {
            model = this.db.loadModel(route.model)
          } else if (route.model.noob) {
            model = await route.model.create()
          } else {
            model = route.model
          }
          model.db = this.db
        } else {
          throw Error('you need database setting to use model')
        }
      }
      if (route.controller) {
        ctrl = new route.controller(model, this.output, this.db)
      } else {
        ctrl = new NoobController(model, this.output, this.db)
      }

      router.route(`${this.config.baseUrl}${route.path}`)
        .get(ctrl.get.bind(ctrl))
        .post(ctrl.post.bind(ctrl))
        .patch(ctrl.patch.bind(ctrl))
        .delete(ctrl.delete.bind(ctrl))

      if (route.children) {
        for (let x = 0; x < route.children.length; x++) {
          router.route(`${this.config.baseUrl}${route.path}${route.children[x].path}`)[route.children[x].method.toLowerCase()](ctrl[route.children[x].function].bind(ctrl))
        }
      }
    }
    this.app.use('/', router)
  }

  async setting () {
    // set public dir
    if (this.config.publicDir) {
      if (Array.isArray(this.config.publicDir)) {
        for (let i = 0; i < this.config.publicDir.length; i++) {
          this.setPublic(this.config.publicDir[i])
        }
      } else {
        this.setPublic(this.config.publicDir)
      }
    }
    // set view engine
    if (this.config.viewEngine) {
      this.output = new Http(this.config.viewEngine.engine)
      this.setViewEngine(this.config.viewEngine.engine, this.config.viewEngine.path)
    } else {
      this.output = new Http()
    }

    // set database
    if (this.config.database) {
      this.db = new Database(this.config.database)
      await this.db.init()
    }

    // set auth
    if (this.config.auth.controller) {  
      this.app.use(passport.initialize())
      this.app.use(passport.session())
      if(this.config.auth.session){
        this.app.use(express.session({secret: this.config.auth.session.secret}))
      }
      this.auth = new this.config.auth.controller(this.config.auth, this.output, this.db)
      passport.use(this.auth.authStrategy)
      // passport.use(this.auth.refreshStrategy)
      passport.serializeUser(this.auth.serialize)
      passport.deserializeUser(this.auth.deserialize)

      // set refresh token route
      // this.app.get(this.config.auth.refreshToken, this.auth.refreshTokenMiddleWare, this.auth.refreshToken.bind(this.auth))
      // set login route
      this.app.post(this.config.auth.path, this.auth.login.bind(this.auth))
      // this.app.use(this.auth.authMiddleWare)

    }

    // set route
    const _route = await this.generateRoute()
    if (!this.config.route) { this.config.route = [] }
    this.config.route = this.config.route.concat(_route)
    this.setRoute()
  }

  setPublic (publicDir) {
    const _path = publicDir.path || `/${publicDir.dir}`
    this.app.use(_path, express.static(path.resolve(publicDir.dir)))
  }

  setViewEngine (viewEngine, viewPath = 'views') {
    fs.access(viewPath, function (err) {
      if (err && err.code === 'ENOENT') {
        fs.mkdir(viewPath) // Create dir in case not found
      }
    })
    this.app.set('view engine', viewEngine)
  }

  use (middle) {
    this.app.use(middle)
  }

  async start (cb = null, app) {
    if (app) {
      this.app = app
    }
    // TODO add parse limit config
    this.use(bodyParser.urlencoded({limit: "5mb", extended: true}))
    this.use(bodyParser.json({limit: "5mb"}))
    await this.setting()
    if(cb){
      this.app.listen(this.config.port, () => {
        cb(this)
      })
    }else{
      this.app.listen(this.config.port)
    }

  }

  generateRoute () {
    return new Promise((resolve, reject) => {
      const routes = []
      if(this.db){
        const directoryPath = this.db.migrationPath()
        if (fs.existsSync(directoryPath)) {
          // passsing directoryPath and callback function
          fs.readdir(directoryPath, (err, files) => {
            // handling error
            if (err) {
              reject(Error('Unable to read directory: ' + err))
            } else {
              for (let i = 0; i < files.length; i++) {
                const _path = files[i].split('.')
                routes.push({
                  path: `/${_path[0]}`,
                  model: this.db.loadModel(_path[0])
                })
              }
              resolve(routes)
            }
          })
        }
      }else{
        resolve(routes)
      }
    })
  }
}

module.exports = NoobEngine
