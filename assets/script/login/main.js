require(['../lib/config'], function () {
  require(['jquery'], function () {
    let $ = require('jquery')

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

    // $('.CTA>input').click(function () {
    //   $.ajax(
    //     {
    //       method: 'POST',
    //       url: '/login',
    //       dataType: "text",
    //       data: {
    //         account: $('#loginemail').val(),
    //         password: $('#loginPassword').val()
    //       },
    //       success: function (result) {
    //         console.log(result);
    //         if (result.resultCode == 200) {
    //             alert("SUCCESS");
    //         }
    //       },
    //       error : function() {
    //         alert("异常！");
    //       }
    //     }
    //   )
    // })
  })
})