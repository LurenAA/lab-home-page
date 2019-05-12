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
    content.expires = new Date(Date.now() + finalOptions['max-Age'] * 1000)
    content = JSON.stringify(content)

    this.addSessionToStore(sessionId, content)
    let sig = signature.sign(content, key)
    let value = sessionId + '.' + sig
    this.setHead(finalOptions, value)
  }

  addSessionToStore(id, content) {
    this.store.add(id, content)
  }

  setHead(options, value, add) {
    if(typeof add === 'object') {
      options = Object.assign({}, options, add)
    }
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

  checkSession(cookie, options) {
    options = Object.assign({}, this.options, options)
    let arr = cookie.split('.'), content
    if(!this.store.isset(arr[0])) {
      this.setHead(options, '', {'max-Age': -1})
      return 'redirect'
    }
    content = JSON.parse(this.store.space[arr[0]])
    if(Date.now() > content.expires) {
      this.setHead(options, '', {'max-Age': -1})
      return 'redirect'
    }
    let check = signature.unsign(arr[1], this.store.space[arr[0]], content.password)
    if(check) {
      content.expires = new Date(Date.now() + options['max-Age'] * 1000)
      let key = content.password
      let contentSign = JSON.stringify(content)
      let sig = signature.sign(contentSign, key)
      let value = arr[0] + '.' + sig
      this.store.add(arr[0], contentSign)
      this.setHead(this.options, value)
      return content
    }
  }

  deleteSession(consid) {
    let sessionId = consid.split('.')[0]
    this.store.delete(sessionId)
    this.deleteCookie()
    process.nextTick(() => {
      this.store.refresh()
    })
    return true
  }

  deleteCookie() {
    let str = 'consid=;max-Age=-1;'
    this.ctx.set('Set-Cookie', str)
  }

  refresh() {
    this.store.refresh()
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