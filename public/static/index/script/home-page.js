function showUsInfo(e) {
  if($(".us-info").offset().top-$(window).scrollTop() < window.innerHeight) {
    // $(".us-info").css('visibility','visible')
    // $(".us-info").eq(0).css('animation','fadeIn 1s')
    // $(".us-info").eq(1).css('animation','fadeIn 0.6s')
    $(".us-info").eq(0).addClass("show-info-ani-0")
    $(".us-info").eq(1).addClass("show-info-ani-1")
    $(window).off('scroll', arguments.callee)
  }
}

function changeSliderBar() {
  let picHeight = $('#carouselExampleIndicators').height()
  $('.carousel-control-prev-diy').height(picHeight)
  $('.carousel-control-next-diy').height(picHeight)
}

function setLinePos(offsetLeft, i, w){
  if(w === undefined){
    $('#moveLine').width(offsetLeft[i].width)
  } else {
    $('#moveLine').width(w)
  }
  $('#moveLine').css('left',`${offsetLeft[i].move + offsetLeft[i].padle}px`)
} 

function changeMoveLine(){
  let y = $(document).scrollTop() + $(".header-class").height();
  for(let i = 0, len = offsetLeft.length; i < len; i++) {
    if(i === len - 1) {
      setLinePos(offsetLeft,len - 1)
      index = len -1 
      break;
    } else if (y < offsetLeft[0].cont){
      setLinePos(offsetLeft, 0, 0)
      index = -1
      break;
    } else if (y > offsetLeft[i].cont && y < offsetLeft[i + 1].cont) {
      setLinePos(offsetLeft,i)
      index = i
      break;
    }
  }
}

function initMoveLine() {
  let children = $('.row-div>nav').children()
  const container = [
    '.us-title',
    '.areas',
    '.team',
    '.achieve',
  ]
  for(let i = 0; i < 5; i++) {
    offsetLeft[i] = {
      cont: container[i] ? $(container[i]).position().top: 10000,
      move: children.eq(i).position().left, 
      width: children.eq(i).width(),
      padle: parseInt(children.eq(i).css('padding-left'))
    }
  }
  changeMoveLine()
  // console.log(offsetLeft)
}

let num = 0;
let offsetLeft = []
let index

// 左右两边按钮高度等于轮播高度
$(window).on('resize', function (e) {
  changeSliderBar()
})


//头部黑色背景
$(window).on("scroll", function(e){
  if($(document).scrollTop() > $(".header-class").height()){
    $(".header-class").addClass("show-shadow");
  } else{
    $(".header-class").removeClass('show-shadow')
  }
})

$(window).on('scroll',showUsInfo)
$(window).on('scroll',changeMoveLine)

$('.row-div>nav').children().each(function(i){
  $(this).hover(function() {
    let pos =$(this).position().left + offsetLeft[0].padle - parseFloat($('#moveLine').css('left'))
    $('#moveLine').css('transform',`translate3d(${pos}px,0,0)`)
    $('#moveLine').css('width', `${offsetLeft[i].width}px`)
  }, function () {
    $('#moveLine').css('transform', '')
    $('#moveLine').css('width', `${index === -1 ? 0 : offsetLeft[index].width}px`)
  })
  .click(function() {
    
  })
})

//初始化时调节高度
$(document).ready(function(){
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

  if(height < 1240) {
    $(".info-content").eq(2).remove()
  }
  
  changeSliderBar()
  showUsInfo()
  initMoveLine()
});

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

