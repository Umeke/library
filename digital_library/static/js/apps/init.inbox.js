"use strict";

//=> Class definition
var InboxOptions = function () {

    //=> Init Indox Options
    var initIndoxOptions = function() {
        $('.mail-item .mail-content').on("click", function () {
            $(".inbox").addClass('js-show-mail');
        });
        $('#inbox-back').on("click", function () {
            $(".inbox").removeClass('js-show-mail');
        });

        $('#compose').on("click", function () {
            $(".compose-mail").css({'display': 'block'});
        });
        $('.mailbox-close').on("click", function () {
            $(this).closest('.compose-mail').css({'display': 'none'});
        });
        $('.mailbox-minimize').on("click", function () {
            $(this).closest('.compose-mail').toggleClass('minimize');
        });
    };

    return {
        //=> Init
        init: function () {
            initIndoxOptions();
        },
    };
}();

//=> Class Initialization
$(document).ready(function () {
    InboxOptions.init();
});