const {
  fs,
  isHidden
} = require('./fs')
const process = require('process')
const {
  join,
  parse,
  sep
} = require('path')
// const {
//   createReadStream
// } = require('fs')


module.exports = function (path, options) {
  options = Object.assign({}, options)
  let root = path ? path : process.cwd()
  let extensions = options.extensions ? options.extensions : [
    'jpg', 'png', 'webp', 'gif', 'jpeg', 'scss', 
    'css', 'js', 'html' ,'eot', 'ttf', 'woff', 'woff2'
  ]
  let maxage = options.maxage || 0

  return async function (ctx, next) {
    let thePath = join(root, ctx.path)
    if(isHidden(root, thePath) || thePath[thePath.length - 1] === sep) {
      return await next()
    }
    let stat, par = parse(thePath)
    if(par.ext) {
      try {
        stat = await fs.stat(thePath)
      } catch (err) {
        return await next()
      }
    } else {
      for(let i = 0, len = extensions.length; i < len; i++) {
        try {
          let str = thePath + '.' + extensions[i]
          stat = await fs.stat(str)
          if(stat) {
            thePath = str
            break
          }
        } catch (err) {
          continue;
        }
      }
    }
    
    if(!stat || stat.isDirectory()) {
      return await next()
    }
    
    ctx.set('Content-Length', stat.size)
    ctx.set('Last-Modified', stat.mtime.toUTCString())
    let directives = ['max-age=' + (maxage / 1000 | 0)]
    if (options.immutable) {
      directives.push('immutable')
    }
    ctx.type = parse(thePath).ext
    ctx.set('Cache-Control', directives.join(','))
    ctx.body = fs.createReadStream(thePath)
  }
}