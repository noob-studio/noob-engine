const Sequelize = require('sequelize')
const SequelizeAuto = require('sequelize-auto')
const sequelizePaginate = require('sequelize-paginate')
const { QueryTypes } = require('sequelize')
const path = require('path')
class Database {
  constructor (config) {
    this.config = config
  }

  async init () {
    await this.load(this.config.dbName)
  }

  load (dbName = 'default') {
    return new Promise((resolve, reject) => {
      this.dbName = dbName
      this.conn = new Sequelize(this.config[this.dbName].database, this.config[this.dbName].username, this.config[this.dbName].password, {
        host: this.config[this.dbName].hostname,
        port: this.config[this.dbName].port || 3306,
        dialect: this.config[this.dbName].engine,
        pool: this.config[this.dbName.pool],
        define: this.config[this.dbName].define || {
          freezeTableName: true
        }
      })
      this.isAlive().then(() => {
        if (this.config[this.dbName].migration.enable) {
          const auto = new SequelizeAuto(this.config[this.dbName].database, this.config[this.dbName].username, this.config[this.dbName].password, {
            host: this.config[this.dbName].hostname,
            port: this.config[this.dbName].port || 3306,
            dialect: this.config[this.dbName].engine,
            directory: this.migrationPath(),
            additional: this.config[this.dbName].migration.additional
          })
          auto.run((error) => {
            if (error) { reject(error) }
            this.conn.sync({ force: this.config[this.dbName].migration.force }).then(() => {
              this.isMigration = true
              resolve()
            })
          })
        } else {
          resolve()
        }
      })
    })
  }

  async select(select, table, page = 1, condition = null, groupBy = null){
    let sql = `SELECT ${select} FROM ${table} `
    let total = 0
    if(condition){
      sql += `WHERE  ${condition} `
    }
    if(groupBy){
      sql += `GROUP BY ${groupBy} `
    }
    if(page != -1){
      let numPerPage = this.config.limit || 10
      let skip = (page - 1 ) * numPerPage
      let limit = skip + ',' + numPerPage
      total = await this.conn.query(sql, { type: QueryTypes.SELECT })
      sql += `LIMIT ${limit}`
    }

    let docs = await this.conn.query(sql , { type: QueryTypes.SELECT })
    return { docs, page, total }
  }

  loadModel (name) {
    let model = require(path.join(this.migrationPath(), name))(this.conn, Sequelize.DataTypes)
    sequelizePaginate.paginate(model)
    return model
  }

  migrationPath () {
    return path.resolve(this.config[this.dbName].migration.dir || 'model')
  }

  async isAlive () {
    try {
      await this.conn.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
      throw error
    }
  }
}

module.exports = Database
