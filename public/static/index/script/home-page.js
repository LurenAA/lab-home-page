// 左右两边按钮高度等于轮播高度
$(window).on('resize', function (e) {
  let picHeight = $('#carouselExampleIndicators').height()
  $('.carousel-control-prev-diy').height(picHeight)
  $('.carousel-control-next-diy').height(picHeight)
})
//头部黑色背景
$(window).on("scroll", function(e){
  if($(document).scrollTop() > $(".header-class").height()){
    $(".header-class").addClass("show-shadow");
  } else{
    $(".header-class").removeClass('show-shadow')
  }
})
//初始化时调节高度
$(document).ready(function(){
  let picHeight = $('#carouselExampleIndicators').height()
  $('.carousel-control-prev-diy').height(picHeight)
  $('.carousel-control-next-diy').height(picHeight)

  $clamp('.us-info>p', {
    clamp: 6,
    lang: 'Ch',
    tailHtml: '<a id = "watchDetail" href = "https://v4.bootcss.com/">查看详情</a>'
  })
});

