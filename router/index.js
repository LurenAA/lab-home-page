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

router.all('/login', koaBody(), async function (ctx, next) {
  ctx.set('Cache-Control', 'no-store')
  if (Object.keys(ctx.request.body).length &&
    ctx.method === 'POST') {
    let key
    try {
      key = await ctx.pool.better_query(`SELECT md5(account) as account, md5(password) as password, username 
        FROM lab_users WHERE account = "${ctx.request.body.account}" AND password = "${ctx.request.body.password}"`)
    } catch (err) {
      console.log(err)
    }
    if (key[0]) {
      let cookie = [`${key[0].account}=${key[0].password}`, 'Max-Age=1000', 'HttpOnly']
      ctx.set('Set-Cookie', cookie.join(';'))
      redirect_count = false
      return await ctx.render('backend', {username: key[0].username})
    } else {
      return await ctx.render('login', {error: true})
    }
  }
  else if (ctx.headers.cookie) {
    let reg = /([^=;\s]+)=([^;=\s]+)/g
    let res, key
    try {
      while(res = reg.exec(ctx.headers.cookie)) {
        // key = await ctx.pool.better_query(`SELECT EXISTS(SELECT 1 FROM lab_users 
        //   WHERE md5(account) = '${res[1]}' AND md5(password) = '${res[2]}') as val`)
        key = await ctx.pool.better_query(`SELECT username FROM lab_users 
          WHERE md5(account) = '${res[1]}' AND md5(password) = '${res[2]}'`)
        if (key[0].username) {
          return await ctx.render('backend',{username: key[0].username})
        }
      }
    } catch (err) {
      console.log(err)
      ctx.throw(500, err)
    }
  }
  await ctx.render('login')
})

module.exports = router
