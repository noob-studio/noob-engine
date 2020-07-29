const Sequelize = require('sequelize')
class MasterModel extends Sequelize.Model {}

class NoobModel {
  constructor (tname, obj, otp = {}, name = null) {
    this.tname = tname
    this.name = name || this.tname
    this.obj = obj
    this.noob = true
    this.setOtp(otp)
  }

  setOtp (otp) {
    const masterOtp = {
      autoGen: false,
      force: false,
      sequelize: this.db.conn,
      modelName: this.name,
      tableName: this.tname,
      createdAt: false,
      updatedAt: false
    }
    this.otp = { ...masterOtp, ...otp }
  }

  async create () {
    if (this.obj && typeof this.obj === 'object') {
      MasterModel.init(this.obj, this.otp)
      if (this.otp.autoGen) {
        await MasterModel.sync({ force: this.otp.force })
      }
    } else {
      throw Error('invalid parameter')
    }
    return MasterModel
  }
}

module.exports = NoobModel
