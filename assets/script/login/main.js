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

    $('input').blur(function (e) {
      if($(this).val().length <= 0) {
        $(this).siblings('label').removeClass('actived')
      }
      
    })
  })
})