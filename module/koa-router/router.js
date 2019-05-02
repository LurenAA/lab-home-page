const methods = require('./methods')
const Layer = require('./layer')
const compose = require('./compose')

function Router() {
  if(!(this instanceof Router)) {
    return new Router()
  }
  
  this.stack = []
}

methods.forEach(function (verb){
  Router.prototype[verb] = function (path, middleware) {
    let middlewareArray = Array.prototype.slice.call(arguments, 1)

    let newOne = new Layer(path, middlewareArray, verb)
    
    this.stack.push(newOne)
  }
})

Router.prototype.routes = function () {
  let router = this
  return async function dispatch (ctx, next) {
    let matched = router.match(ctx.method, ctx.path) || []
     
    let  middleware = matched.reduce(function (total, element) {
      return total.concat(element.middleware)
    }, [])

    await compose(middleware)(ctx, next)
  }
}

Router.prototype.match = function (method, path) {
  let matched = []
  this.stack.forEach(function (element) {
    if(element.regExp.test(path) && ~element.methods.indexOf(method.toLowerCase())){
      matched.push(element)
    }
  })
  return matched;
}

module.exports = Router