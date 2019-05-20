const Koa = require('koa')
const http = require('http')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const views = require('koa-views')
const path = require('path')

const serveStatic = require('./module/koa-static/index')
const session = require('./module/koa-session/index')

const app = new Koa()

app.use(session({
  'max-Age': 6000
}))
onerror(app);
app.use(logger())

app.use(serveStatic(path.join(__dirname, 'assets'), {
  maxage: 1000
}))

const indexRouter = require('./router/index')

app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    await ctx.render('error', {
      message: err.message,
      status: err.status || 500
    })
  }
})

app.use(views(__dirname + '/view', {
  extension: 'hbs',
  map: {
    hbs: 'handlebars'
  },
  options: {
    helpers: {
      isActive: function (e) {
        if (e === 0) {
          return true
        }
        return false
      },
      item: function (items, num) {
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

app.use(async function (ctx, next) {
  ctx.pool = require('./assets/script/util/mysql.js')
  await next()
})

app.use(indexRouter.routes())

app.use(function (ctx, next) {
  if (ctx.status === 200) {
    return next()
  }
  ctx.throw(ctx.status)
})

app.on('error', async function (err, ctx) {
  console.error(err.status)
})

app.use(async function (ctx, next) {
  if (ctx.status === 404) {
    ctx.throw(404, 'not found')
  }
})

http.createServer(app.callback()).listen(3000)