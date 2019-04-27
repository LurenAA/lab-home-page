const Koa = require('koa')
const http = require('http')
const serveStatic = require('koa-static')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const views = require('koa-views')
const path = require('path')

const app = new Koa()

onerror(app);
app.use(logger())

app.use(serveStatic(path.join(__dirname,'assets')))

const indexRouter = require('./router/index')

app.use(views(__dirname + '/view', {
  extension: 'hbs',
  map: {
    hbs: 'handlebars'
  },
  options: {
    helpers: {
      isActive: function (e) {
        if(e === 0) {
          return true
        }
        return false
      },
      item: function(items, num){
        let arr = items.toString().split('')
        return arr[num]
      }
    },
    partials: {
      header: __dirname + '/view/header.hbs',
      footer: __dirname + '/view/footer.hbs'
    }
  }
}));

app.use(async function(ctx, next)  {
  ctx.pool = require('./assets/script/util/mysql.js')
  await next()
})

app.use(indexRouter.routes())

// app.use(async function (ctx, next){
//   await indexRouter.routes()(ctx, next)
// })

  // .use(indexRouter.allowedMethods())

// app.use(function (ctx,next) {
//   ctx.throw(404)
// })

app.on('error',async function(err,ctx) {
  console.error(err.status)
})

http.createServer(app.callback()).listen(3000)
