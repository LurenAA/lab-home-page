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

  let height = window.innerWidth
  if(height < 578) {
    $clamp('.us-info>p', {
      clamp: 4,
      tailHtml: '<a id = "watchDetail" href = "https://v4.bootcss.com/">查看详情</a>'
    })
  } else if (height > 578) {
    $clamp('.us-info>p', {
      clamp: 8,
      tailHtml: '<a id = "watchDetail" href = "https://v4.bootcss.com/">查看详情</a>'
    })
  }

});

let num = 0;
function showPic() {
  let children = $('.show-pic').children()
  num %= children.length
  let last = ( num - 1 ) % children.length
  last === -1 && (last = children.length - 1) 
  // console.log(last)
  children.eq(last).removeClass('active-pic')
  children.eq(num).addClass('active-pic')
  

  num++
  setTimeout(showPic, 3500)
}


setTimeout(showPic, 3500)

