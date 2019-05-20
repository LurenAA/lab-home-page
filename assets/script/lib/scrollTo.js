// setting: {
//   progress,step,complete,start,done,fail 回调函数，
//   easing :swing / linear
//   duration : ms
// }
// des: {
//   x:
//   y:
// }

define(function (require,exports,module){
  let $ = require('jquery')

  function isWin(ele) {
    return !ele.nodeName || $.inArray(ele.nodeName.toLowerCase(),[
      'iframe','#document','html','body'
    ]) !== -1
  }

  function testNumber() {
    let reg = /^(?<=[\+-]?)\d+(\.\d+)?(px|%)?$/

    return function (args) {
      for (let i in args) {
        if(!reg.test(args[i])){
          return false
        }
      }
      return true
      // return reg.test(args)
    }
  }

  ;(function ($) {
    let getNumberF = testNumber()
    $.scrollTo = function (des, setting) {
      $(document.documentElement).scrollTo(des, setting)
    }

    $.fn.scrollTo = function (des, setting) {
      let win = isWin(this[0]), 
      scroll = win ? win.contentWindow || document.documentElement : document.documentElement
      if(!getNumberF(des)) {
        console.error('[$.fn.scrollTo]: des need value')
        return this
      }
      let maxScrollY = document.documentElement.scrollHeight 
        - document.documentElement.clientHeight
      let maxScrollX = document.documentElement.scrollWidth 
        - document.documentElement.clientWidth
      des.x = parseFloat(des.x)
      des.y = parseFloat(des.y)
      des.x = des.x < 0 ? 0 : des.x > maxScrollX ? maxScrollX : des.x
      des.y = des.y < 0 ? 0 : des.y > maxScrollY ? maxScrollY : des.y

      setting = $.extend({
        duration: 400,
        easing: 'swing'
      },  setting)

      return $(scroll).animate({
        scrollLeft: des.x,
        scrollTop: des.y
      }, setting)
    }
  })($)
})