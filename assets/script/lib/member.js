define(function (require, exports, module) {
        let $ = require('jquery');


        function memberDetail() {
            $('.click-member').click(function () {
                var _this = $(this).data('point');
                $('.member-page').eq(_this).show();
            })

        }

        function memberClose() {
            $('.close-member').click(function () {
                    $('.member-page').hide()
                }

            )
        }

        module.exports = {
            memberDetail,
            memberClose
        }
    }

)