const router = require('../module/koa-router/router')()
const koaBody = require('koa-body');
const cookieParser = require('../module/cookie-parser/index')

router.get('/', async function (ctx, next) {
  let [news, pics, focus] = await Promise.all([
    ctx.pool.better_query('SELECT * FROM lab_news LIMIT 3'),
    ctx.pool.better_query('SELECT * FROM lab_show_img'),
    ctx.pool.better_query('SELECT * FROM lab_focus')
  ]).catch(err => {
    console.log('database query error')
    ctx.throw(500, 'database query error')
  })
  focus.forEach(function (ele) {
    ele.pics = JSON.parse(ele.pics)
  })
  await ctx.render('index', { title: '主页', news: news, pics: pics, focus: focus })
})

router.get('/login', cookieParser, async function (ctx, next) {
  ctx.set('Cache-Control', 'no-store')
  
  if(ctx.querystring.includes('deleteCookie')) {
    if(ctx.session.deleteSession(ctx.cookieResult.consid)) {
      ctx.body = true
      return 
    }
  }

  if (ctx.cookieResult.consid) {
    return ctx.redirect('/backend')
  }
  return await ctx.render('login')
})

router.all('/backend', koaBody() , cookieParser, async function (ctx, next) {
  ctx.set('Cache-Control', 'no-store')
  setImmediate(() => {
    ctx.session.refresh()
  })

  if (Object.keys(ctx.request.body).length &&
    ctx.method === 'POST') {
    let key
    try {
      key = await ctx.pool.better_query(`SELECT md5(account) as account, password, username 
        FROM lab_users WHERE account = "${ctx.request.body.account}" AND password= "${ctx.request.body.password}"`)
      key = key[0]
    } catch (err) {
      console.log(err)
    }
    if (key) {
      ctx.session.createSession(key, key.password)
      ctx.body = {
        status:true
      }
      return 
    } else {
      ctx.body = {
        status:false
      }
      return 
    }
  } else if (ctx.cookieResult.consid) {
    let result = ctx.session.checkSession(ctx.cookieResult.consid)
    if(result === 'redirect') {
      return await ctx.redirect('/login')
    } else {
      return await ctx.render('backend', {
        username: result.username
      })
    }
  } else {
    return ctx.redirect('/login')
  }
})

module.exports = router
