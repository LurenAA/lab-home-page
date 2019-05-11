function cookie_parser(ctx, next) {
  let reg = /([^[\]()=,"/?@:;]*)\=([^[\]()=,"/?@:;]*)/g
  let res, container = {} 
  while(res = reg.exec(ctx.headers.cookie)) {
    container[res[1]] = res[2]
  }
  ctx.cookieResult = container
  return next()
}

module.exports = cookie_parser