const http = require('http')
const Layer = require('./layer.js')
const compose = require('./compose.js')

const methods = http.METHODS.map(value => value.toLowerCase())

function Router(options) {
  if(!(this instanceof Router)) {
    return new Router(options)
  }
  this.stack = []
}

methods.forEach(function (method) {
  Router.prototype[method] = function (path, ...middleware) {
    let target 
    if(target = this.stack.find(checkIndex)) {
      target.add(method, middleware)
    } else {
      let newLayer = new Layer(method, path, middleware)
      this.stack.push(newLayer)
    }

    function checkIndex(item){
      return item.path ===  path
    }
  }
})

Router.prototype.all = function (path, ...middleware) {
  methods.forEach(ele => {
    this[ele](path, ...middleware)
  })
}

Router.prototype.routes = function () {
  let _this = this
  return function (ctx, next) {
    let middlewareList = _this.match(ctx.path, ctx.method)

    if(!middlewareList.length) {
      return next()
    }
    let returnFunc = compose(middlewareList)
    return returnFunc(ctx, next)
  }
}

Router.prototype.match = function (path, method) {
  method = method.toLowerCase()
  let matchList = []
  this.stack.forEach(layer => {
    if(layer.methods.includes(method) && layer.reg.test(path)) {
      matchList.push(...layer.middlewares[method])
    }
  })
  return matchList
}

module.exports = Router