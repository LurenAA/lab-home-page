const router = require('../module/koa-router/router')()
const koaBody = require('koa-body');

// const router = require('koa-router')()

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

let redirect_count = false  //标志重定向，保证只有开始时重定向
router.all('/login', async function (ctx, next) {
  if (ctx.headers.cookie && !redirect_count) {
    return ctx.redirect('/loginback')
  }
  await ctx.render('login')
})

router.all('/loginback', koaBody(), async function (ctx, next) {
  if (Object.keys(ctx.request.body).length &&
    ctx.method === 'POST') {
    let key
    try {
      key = await ctx.pool.better_query(`SELECT md5(account) as account, md5(password) as password FROM lab_users WHERE account = 
        ${ctx.request.body.account} AND password = ${ctx.request.body.password}`)
    } catch (err) {
      console.log(err)
    }
    if (key[0]) {
      let cookie = [`${key[0].account}=${key[0].password}`, 'Max-Age=1000', 'HttpOnly']
      ctx.set('Set-Cookie', cookie.join(';'))
      redirect_count = false
      return await ctx.render('backend')
    }
  }
  else if (ctx.headers.cookie) {
    let reg = /([^=;\s]+)=([^;=\s]+)/g
    let res, key
    try {
      while(res = reg.exec(ctx.headers.cookie)) {
        key = await ctx.pool.better_query(`SELECT EXISTS(SELECT 1 FROM lab_users 
          WHERE md5(account) = '${res[1]}' AND md5(password) = '${res[2]}') as val`)
        if (key[0].val) {
          redirect_count = false
          return await ctx.render('backend')
        }
      }
    } catch (err) {
      console.log(err)
      ctx.throw(500, err)
    }
    redirect_count = true
    return ctx.redirect('/login') 
  }
})

module.exports = router
