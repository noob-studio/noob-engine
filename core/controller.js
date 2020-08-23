class NoobController {
  constructor (model, output, db) {
    this.db = db
    this.output = output
    if (model) {
      this.model = model
    }
  }

  async get (req, res) {
    if (this.model) {
      try {
        let data = []
        let group = []
        const key = await this.getPrimary()
        if(req.query.groupBy){
          group = req.query.groupBy.split(',')
          delete req.query.groupBy
        }
        if(key.length === 0){
          this.model.removeAttribute('id')
        }
        if (this.isEmpty(req.query) && group.length == 0) {
          data = await this.model.findAll()
        } else if (req.query[key]) {
          data = await this.model.findOne({where: req.query})
        } else {
          if(req.query.page){
            let page = req.query.page
            delete req.query.page
            const { docs, pages, total } = await this.model.paginate({
              page: page,
              paginate: 10,
              where: req.query
            })
            data = {
              docs,
              page: pages,
              total
            }
          }else if(group.length > 0){
            data = await this.model.findAll({
              where: req.query,
              group
            })
          }else{
            data = await this.model.findAll({
              where: req.query
            })
          }
        }

        if (!this.isEmpty(req.query) && !data) {
          throw 'data not found'
        } else {
          this.output.success(res, data)
        }
      } catch (err) {
        console.log('err===>' + err)
        this.output.error(res, err)
      }
    } else {
      this.output.success(res, '<h1>This is get</h1>')
    }
  }

  async post (req, res) {
    if (this.model) {
      try {
        await this.validate(req.body)
        const data = await this.model.create(req.body)
        this.output.success(res, data)
      } catch (error) {
        this.output.error(res, error)
      }
    } else {
      this.output.success(res, '<h1>This is post</h1>')
    }
  }

  async patch (req, res) {
    if (this.model) {
      try {
        if (this.isEmpty(req.query)) {
          throw 'no update condition'
        } else {
          const data = await this.model.update(req.body, {
            where: req.query,
            individualHooks: true,
          })
          if (data > 0 || data.length > 0) {
            if(typeof data === 'object'){
              this.output.success(res, data)
            }else{
              this.output.success(res, `update data success ${data} row`)
            }
            
          } else {
            throw 'not found data for update'
          }
        }
      } catch (error) {
        this.output.error(res, error)
      }
    } else {
      this.output.success(res, '<h1>This is patch</h1>')
    }
  }

  async delete (req, res) {
    if (this.model) {
      try {
        if (this.isEmpty(req.query)) {
          throw 'no delete condition'
        } else {
          const data = await this.model.destroy({
            where: req.query
          })
          if (data > 0) {
            this.output.success(res, `delete data success ${data} row`)
          } else {
            throw 'not found data for delete'
          }
        }
      } catch (error) {
        this.output.error(res, error)
      }
    } else {
      this.output.success(res, '<h1>This is delete</h1>')
    }
  }

  async getPrimary () {
    const schema = await this.model.describe()
    const key = Object.keys(schema).filter(function (field) {
      return schema[field].primaryKey
    })
    return key
  }

  async validate (obj, model = null) {
    if (!model) {
      await this.model.build(obj).validate()
    } else {
      await model.build(obj).validate()
    }
  }

  isEmpty (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) { return false }
    }
    return true
  }
}

module.exports = NoobController
