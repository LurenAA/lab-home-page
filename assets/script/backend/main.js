require(['../lib/config'], function () {
  require(['jquery'], function () {
    let $ = require('jquery')

    $(window).click(function (e) {
      if(e.target.parentElement && e.target.parentElement.id === 'loginStatus' || 
        e.target.id === 'loginStatus') {
        $('.downbar').toggleClass('hid')
      } else {
        $('.downbar').addClass('hid')
      }
    })  

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