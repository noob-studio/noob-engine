const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const RefreshTokenStrategy = require('passport-refresh-token').Strategy

class Authen {
  constructor (config, output, db) {
    this.config = config
    this.output = output
    this.db = db
    this.passport = passport
    this.secret = this.config.secret || ''
    this.jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: this.secret
    }
    this.authStrategy = new JwtStrategy(this.jwtOptions, this.strategy.bind(this))
    this.refreshStrategy = new RefreshTokenStrategy(this.refreshStrategy.bind(this))
    
    this.authMiddleWare = this.passport.authenticate('jwt', { session: false })
    this.refreshTokenMiddleWare = this.passport.authenticate('refresh_token', { session: false })
  }

  login (req, res) {
    this.output.success(res, '<h1>there are no login function implement</h1>')
  }

  strategy(payload, done) {
    return done(null, true)
  }

  refreshToken (req, res){
    this.output.success(res, '<h1>there are no refresh token function implement</h1>')
  }

  refreshStrategy(token, done){
    return done(null, true)
  }

  serialize(user, done){
    done(null, user)
  }

  deserialize(user, done){
    done(null, user)
  }
}

module.exports = Authen
