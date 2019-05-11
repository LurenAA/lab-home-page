const sessionStore = require('./Store.js'),
  uid = require('./uid.js'),
  signature = require('./cookie-signature.js')


class Session {
  constructor (options) {
    if (!(this instanceof Session)) {
      return new Session(options)
    }
    this.options = Object.assign({}, {
      httpOnly: true,
      'max-Age': 0,
      secure: false,
      key: 'consid'
    }, options)
    this.store = new sessionStore()
  }

  // s:12位随机字符id.hmac生成的字符串（secret：密码的MD5）
  // content：{用户名，密码，账号}
  createSession (content, key, options) {
    let sessionId = uid(12)
    let finalOptions = Object.assign({}, this.options ,options)
    content.expires = new Date(Date.now() + finalOptions.maxAge * 1000)
    content = JSON.stringify(content)

    this.addSessionToStore(sessionId, content)
    let sig = signature.sign(content, key)
    let value = sessionId + '.' + sig
    this.setHead(finalOptions, value)
  }

  addSessionToStore(id, content) {
    this.store.add(id, content)
  }

  setHead(options, value) {
    let headOptions = ['httpOnly','expires','max-Age','Domain','path','secure', 'SameSite'],
      str = ''
    str += `${options.key}=${value};`
    headOptions.forEach(ele => {
      if(options[ele]) {
        if(options[ele] === true){
          str += ele + ';'
        } else {
          str += `${ele}=${options[ele]};`
        }
      }
    })
    this.ctx.set('Set-Cookie', str)
  }

  checkSession(cookie) {

    if(!this.store.isset(cookie)) {

    }
  }
}

module.exports = function (options) {
  let session = new Session(options)

  return function (ctx, next) {
    ctx.session = session
    session.ctx = ctx

    return next()
  }
}