const toReg = require('./path-to-reg')

class Layer {
  constructor (methods, path, middlewares) {
    this.methods = methods instanceof Array ? methods : [methods]
    this.path = path
    this.reg = toReg(path)
    this.middlewares = {}
    this.methods.forEach(method => {
      this.middlewares[method] = middlewares
    });
  }

  add(method, middlewares) {
    if(this.middlewares[method]) {
      this.middlewares[method].push(...middlewares)
    } else {
      this.methods.push(method)
      this.middlewares[method] = middlewares
    }
  }
}

module.exports = Layer