require(['../lib/config'], function () {
  require(['jquery'], function () {
    let $ = require('jquery')

    $('.form-piece').click(function () {
      $(this).addClass('switched').siblings('.form-piece').removeClass('switched')
    })
  })
})