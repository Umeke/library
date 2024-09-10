"use strict";

//=> Class definition
var OwlCarouselDemo = function () {

    //=> Init Owl Carousel
    var initOwlCarousel = function ($id, nav, dots) {
        $id.owlCarousel({
            loop: true,
            margin: 10,
            nav: nav,
            dots: dots,
            responsive: {
                0: {items: 1},
                600: {items: 3},
                1000: {items: 4}
            }
        });
    };

    var callOwlCarousel = function () {
        initOwlCarousel($('#owl-carousel-nav'), true, false);
        initOwlCarousel($('#owl-carousel-dots'), false, true);
    };

    return {
        //=> Init
        init: function () {
            callOwlCarousel();
        },
    };
}();

//=> Class Initialization
$(document).ready(function () {
    OwlCarouselDemo.init();
});