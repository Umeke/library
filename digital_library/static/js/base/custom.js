"use strict";

//=> Class definition
var Custom = function () {

    //=> Init Slim Scroll
    var initSlimScroll = function (element, height) {
        $(element).slimScroll({
            height: height,
            railVisible: true,
            size: '4px',
            opacity: 0
        }).mouseover(function() {
            $(this).next('.slimScrollBar').css('opacity', 0.4);
        });
    };

    //=> Init Sidebar Navigation
    var initSidebar = function () {
        var $sidebar = $('#sidebar-nav');
        if($sidebar.length === 0) {
            return;
        }

        initSlimScroll("#sidebar-nav", 'auto');
        var $navItems = $("#sidebar-nav .sub-nav");
        $navItems.on('click', function (e) {
            e.stopPropagation();
            var $this = $(this);
            if ($this.next().hasClass('show')) {
                $this.next().removeClass('show');
                $this.removeClass('active');
                $this.next().slideUp(350);
            } else {
                $this.parent().parent().find('.sub-nav-item').removeClass('show').slideUp(350);
                $this.parent().parent().find('.sub-nav').removeClass('active');
                $this.next().toggleClass('show');
                $this.toggleClass('active');
                $this.next().slideToggle(350);
            }
        });
    };

    //=> Init Click Events
    var initCommonClick = function () {
        var $hamburger = $("#hamburger"),
            $searchButton = $(".search-form button"),
            $searchAnchor = $("#search-input a"),
            $cardClose = $(".card-close");

        $hamburger.on('click', function (e) {
            e.stopPropagation();
            $('body').toggleClass('js-mini-sidebar');
        });
        $searchButton.on('click', function (e) {
            e.stopPropagation();
            $('#search-input').addClass('show');
        });
        $searchAnchor.on('click', function (e) {
            e.stopPropagation();
            $(this).parent().removeClass('show');
        });
        $cardClose.on('click', function () {
            $(this).closest('.card').addClass('js-card-hide');
        });
    };

    //=> Data Line Animation
    var dataLineAnimation = function () {
        var $dataLine = $('.data-line');
        if($dataLine.length === 0) {
            return
        }

        $dataLine.css("width",
            function () {
                return $(this).attr("data-width") + "%";
            }
        );
    };

    //=> Init Common Function
    var initCommonFunction = function () {
        var $dataTooltip = $('[data-toggle="tooltip"]'),
            $dataPopover = $('[data-toggle="popover"]'),
            $tagsInput = $('#tagsinput'),
            $imageUpload = $('#image-upload'),
            $dropFile = $('.drop-file');

        if($dataTooltip.length) {
            $dataTooltip.tooltip()
        }
        if($dataPopover.length) {
            $dataPopover.popover();
        }
        if($tagsInput.length) {
            $tagsInput.tagsinput();
        }
        if($imageUpload.length) {
            $imageUpload.dropify();
        }
        if($dropFile.length) {
            $dropFile.dropify();
        }
    };

    //=> Check All
    var checkAll = function () {
        var $checkAll = $('#check-all'),
            $childCheck = $('.child-check');
        if($checkAll.length === 0) {
            return;
        }

        $checkAll.on("click", function() {
            $childCheck.prop("checked", this.checked);
        });
        $childCheck.on("click", function() {
            if ($('.child-check:checked').length === $childCheck.length) {
                $checkAll.prop('checked', true);
            } else {
                $checkAll.prop('checked', false);
            }
        });
    };

    return {
        //=> Init
        init: function () {
            initSidebar();
            initCommonClick();
            initCommonFunction();
            dataLineAnimation();
            checkAll();
            if ($(".scrollbar").length) {
                initSlimScroll(".scrollbar", 'auto');
            }
        }
    };
}();

//=> Class Initialization
$(document).ready(function () {
    Custom.init();
});

//=> Loader
$(window).on('load', function() {
    $('#loader').fadeOut(1000);
});