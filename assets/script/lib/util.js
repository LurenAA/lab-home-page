define(function (require, exports, module) {
  let $ = require('jquery')

  let showPic = (function () { 
    let num = 0;
    return function () {
      let children = $('.show-pic').children()
      num %= children.length
      let last = (num - 1) % children.length
      last === -1 && (last = children.length - 1)
      // console.log(last)
      children.eq(last).removeClass('active-pic')
      children.eq(num).addClass('active-pic')
  
      num++
      setTimeout(showPic, 3500)
    }
  })()
  

  function showUsInfo() {
    if ($(".us-info").offset().top - $(window).scrollTop() < window.innerHeight) {
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

  function setLinePos(offsetLeft, i, w) {
    if(i < 0) {
      return $('#moveLine').width(0)
    }
    if (w === undefined) {
      $('#moveLine').width(offsetLeft[i].width)
    } else {
      $('#moveLine').width(w)
    }
    $('#moveLine').css('transform', `translate3d(${offsetLeft[i].move + offsetLeft[i].padle}px,0,0)`)
  }

  function changeMoveLine() {
    if(window.animateFlag) {
      return 
    }
    let y = $(document).scrollTop() + $(".header-class").height();
    for (let i = 0, len = offsetLeft.length; i < len; i++) {
      if (i === len - 1) {
        setLinePos(offsetLeft, len - 1)
        index = len - 1
        break;
      } else if (y < offsetLeft[0].cont) {
        setLinePos(offsetLeft, 0, 0)
        index = -1
        break;
      } else if (y > offsetLeft[i].cont && y < offsetLeft[i + 1].cont) {
        setLinePos(offsetLeft, i)
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
    for (let i = 0; i < 5; i++) {
      offsetLeft[i] = {
        cont: container[i] ? $(container[i]).position().top : 10000,
        move: children.eq(i).position().left,
        width: children.eq(i).width(),
        padle: parseInt(children.eq(i).css('padding-left'))
      }
    }
    changeMoveLine(offsetLeft)
    // console.log(offsetLeft)
  }

  function offHover(i) {
    setLinePos(offsetLeft, index)
  }

  function onHover(i) {
    setLinePos(offsetLeft, i)
  }

  module.exports = {
    onHover,
    offHover,
    showPic,
    showUsInfo,
    changeSliderBar,
    initMoveLine,
    changeMoveLine
  }
})