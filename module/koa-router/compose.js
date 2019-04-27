function compose (middleware) {
  let index = -1;
  return function (ctx, next) {
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn
      i === middleware.length ? 
      (fn = next) : (fn = middleware[i]);
      if(typeof fn !== 'function') {
        return Promise.resolve()
      }
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i+ 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
} 

module.exports = compose