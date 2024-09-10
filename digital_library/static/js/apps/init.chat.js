"use strict";

//=> Class definition
var Chat = function () {

    //=> Init Slim Scroll
    var initSlimScroll = function (element, height) {
        $(element).slimScroll({
            height: height,
            railVisible: true,
            size: '4px',
            opacity: 0
        }).mouseover(function () {
            $(this).next('.slimScrollBar').css('opacity', 0.4);
        });
    };

    var callSlimScroll = function () {
        if ($(".chat-widget").length) {
            initSlimScroll(".chat-widget", '411px');
        }
        if ($(".msg-list").length) {
            initSlimScroll(".msg-list", '450px');
        }
    };

    //=> Init Chat Click Event
    var initChatClick = function() {
        $('.msg-list-item').on("click", function () {
            $(".chat").addClass('js-show-msg');
        });
        $('#chat-back').on("click", function () {
            $(".chat").removeClass('js-show-msg');
        });
    };

    return {
        //=> Init
        init: function () {
            callSlimScroll();
            initChatClick();
        },
    };
}();

//=> Class Initialization
$(document).ready(function () {
    Chat.init();
});