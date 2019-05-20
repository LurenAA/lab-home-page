function compose (middleware) {
  middleware = middleware instanceof Array ? middleware : [middleware]

  return function (ctx, next) {
    let index = 0;
    function comFunc(n) {
      if(n !== index) {
        console.error('cant use next twice')
        return 
      }
      index += 1
      let implementFunc = middleware[n]
      if(typeof implementFunc !== 'function') {
        return Promise.resolve()
      }
      let nextFunc = n === middleware.length - 1 ? next : comFunc.bind(null, n + 1)
      try{
        return Promise.resolve(implementFunc(ctx, nextFunc))
      } catch(err) {
        return Promise.reject(err)
      }
    }

    return comFunc(0)
  }
} 

module.exports = compose 