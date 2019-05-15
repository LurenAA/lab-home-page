require(['../lib/config'], function () {
  require(['jquery'], function () {
    let $ = require('jquery')

    $('#iconTitle').click(function () {
      window.location = '/'
    })

    $(window).click(function (e) {
      if(e.target.parentElement && e.target.parentElement.id === 'loginStatus' || 
        e.target.id === 'loginStatus') {
        $('.downbar').toggleClass('hid')
      } else {
        $('.downbar').addClass('hid')
      }
    })  

    let nowPage = 0
    $('.side-bar li').click(function () {
      let name = this.parentElement.id || this.id,
        li = $('.side-bar li')
      switch (name) {
        case 'firstPage':
          if(nowPage === 0) {
            return 
          }
          changeIframe('/iframes/first.html')
          li.eq(nowPage).removeClass('activePage')
          li.eq(0).addClass('activePage')
          nowPage = 0
          break;
        case 'secondPage':
          if(nowPage === 1) {
            return 
          }
          changeIframe('/iframes/second.html')
          li.eq(nowPage).removeClass('activePage')
          li.eq(1).addClass('activePage')
          nowPage = 1
          break;
      }

    })

    function changeIframe(url) {
      document.querySelector('iframe').src = url
    }

    $('#exit-to').click(function () {
      $.ajax('/login', {
        method: 'GET',
        dataType: 'text',
        data: {
          deleteCookie: true
        },
        success: function (res) {
          console.log(res)
          if(res) {
            window.location.href = '/login'
          }
        },
        error: function () {
          alert("异常！");
        }
      })
    })
  })
})