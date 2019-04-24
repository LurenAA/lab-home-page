const router = require('koa-router')()

router.get('/',async function (ctx, next)  {
  let [news, pics] = await Promise.all([
    ctx.pool.better_query('SELECT * FROM lab_news LIMIT 3'),
    ctx.pool.better_query('SELECT * FROM lab_show_img')
  ])
  await ctx.render('index', { title: '主页' , news: news, pics: pics})
})

module.exports = router
