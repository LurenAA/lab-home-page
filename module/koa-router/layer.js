const pathToRegexp = require('path-to-regexp')

function Layer (path, middlewareArray, method) {
  this.path = path
  this.middleware = []
  this.methods = []
  this.keys = []
  middlewareArray.forEach((mid) => {
    if(typeof mid === 'function'){
      this.middleware.push(mid)
    }
  })
  this.regExp = pathToRegexp(path, this.keys)
  this.methods.push(method)
}

module.exports = Layer