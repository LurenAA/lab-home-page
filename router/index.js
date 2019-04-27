const router = require('../module/koa-router/router')()
// const router = require('koa-router')()

router.get('/',async function (ctx, next)  {
  let [news, pics, focus] = await Promise.all([
    ctx.pool.better_query('SELECT * FROM lab_news LIMIT 3'),
    ctx.pool.better_query('SELECT * FROM lab_show_img'),
    ctx.pool.better_query('SELECT * FROM lab_focus')
  ]).catch(err => {
    console.log('database query error')
    ctx.throw(500,'database query error')
  })
  focus.forEach(function (ele) {
    ele.pics = JSON.parse(ele.pics)
  })
  await ctx.render('index', { title: '主页' , news: news, pics: pics, focus: focus})
})

module.exports = router
