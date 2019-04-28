const send = require('koa-send')
const assert = require('assert').strict
const path = require('path')

module.exports = function (rootPath, opts) {
  opts = Object.assign({}, opts)

  assert(rootPath, "need root parameter")
  opts.root = path.resolve(rootPath)
  let done
  //这里不可以用__dirname，是当前模块路径
  return async function (ctx, next) {
    done = false
    try {
      done = await send(ctx, ctx.path, opts) //报错不返回值
    } catch (err) {
      //不能都报错，可能不是请求静态资源
      err.status !== 404 && ctx.throw(err)
    }
    //done是用来设置是否访问图片成功，成功就不next了
    if(!done) {
      await next()
    }
  }
}