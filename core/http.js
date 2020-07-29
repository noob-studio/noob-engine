'use strict'
const request = require('request')
const path = require('path')
const _ = null
class NoobHttp {
  constructor (useEngine = false) {
    this.useEngine = useEngine
  }

  getHeader () {
    return this.headers
  }

  setHeader (header) {
    this.headers = header
  }

  sendRequest (method, link, data) {
    const opt = {
      url: link,
      method: method,
      qs: data,
      form: data,
      headers: this.headers
    }

    request(opt, (err, response, body) => {
      try {
        Promise.resolve({ err, response, body })
      } catch (err) {
        Promise.reject(Error(err))
      }
    })
  }

  sendResponse (res = null, code = 200, data = null, headers = null) {
    if (!res) { throw Error('invalid param') }
    if (headers) {
      res.setHeader(headers)
    }
    res.status(code).send(data)
  }

  success (res, data) {
    this.sendResponse(res, 200, data)
  }

  html (res, filePath, data = null) {
    if (this.useEngine) {
      res.render(filePath, data)
    } else {
      res.sendFile(path.resolve(filePath))
    }
  }

  error (res, error, code = 400) {
    this.sendResponse(res, code, error)
  }
}

module.exports = NoobHttp
