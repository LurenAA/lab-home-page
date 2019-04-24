require(['./config'], function() {
  require(['clamp', 'bootstrap', 'util', 'scrollTo'], function() {
    const $clamp = require('clamp')
    const _ = require('util')

    window.num = 0;
    window.offsetLeft = []
    window.index

    $(window).on('resize', function(e) {
      _.changeSliderBar()
      _.initMoveLine()
    })

    $(window).on('scroll', function(e) {
      if ($(document).scrollTop() > $('.header-class').height()) {
        $('.header-class').addClass('show-shadow');
      } else {
        $('.header-class').removeClass('show-shadow')
      }
    })

    $(window).on('scroll', _.showUsInfo)
    $(window).on('scroll', _.changeMoveLine)

    $('.row-div>nav').children().each(function(i) {
      $(this).hover(_.onHover.bind(this, i), _.offHover.bind(this, i))
        .click(function() {
          $.scrollTo({
            y: offsetLeft[i].cont - $('.header-class').height() + 1
          }, {
            start: function() {
              window.animateFlag = true
            },
            done: function() {
              window.animateFlag = false
              index = i
            }
          })
        })
    })

    $(document).ready(function() {
      const height = window.innerWidth
      if (height < 578) {
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

      if (height < 1240) {
        $('.info-content').eq(2).remove()
      }

      _.changeSliderBar()
      _.showUsInfo()
      _.initMoveLine()
      setTimeout(_.showPic, 3500)
    });
  })
})

