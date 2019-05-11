require(['../lib/config'], function () {
  require(['jquery', 'md5'], function () {
    let $ = require('jquery')
    let md5 = require('md5')

    $('.CTA a').click(function (e) {
      $(this).closest('.form-piece').addClass('switched').siblings('.form-piece').removeClass('switched')
      e.stopPropagation()
    })

    $('input').focus(function () {
      $(this).siblings('label').addClass('actived');
    })
    .blur(function (e) {
      if($(this).val().length <= 0) {
        $(this).siblings('label').removeClass('actived')
      }  
    })

    $(document).ready(function () {
      $('.form-group > input').val('')
    })

    $('.CTA>input').click(function () {
      let passWordMd5 = md5($('#loginPassword').val())
      $.ajax(
        {
          method: 'POST',
          url: '/backend',
          dataType: "text",
          data: {
            account: $('#loginemail').val(),
            password: passWordMd5
          },
          success: function (result) {
            result && (result = JSON.parse(result))
            if(result.status === true) {
              window.location.href = '/backend' 
            } else {
              $('#error-log-tip').css('display', 'block')
            }
          },
          error : function() {
            alert("异常！");
          }
        }
      )
    })
  })
})