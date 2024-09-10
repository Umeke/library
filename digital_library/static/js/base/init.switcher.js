"use strict";

var ThemeSwitcher = ThemeSwitcher || {};

$(function () {
    ThemeSwitcher = {
        init: function () {
            ThemeSwitcher.sidebarHTML();
            ThemeSwitcher.changeSidebar();
            ThemeSwitcher.changeThemeColor();
            ThemeSwitcher.setDefaultCookie();
            ThemeSwitcher.openSidebar();
            ThemeSwitcher.closeSidebar();
        },

        checkbox: function (id) {
            return '<div class="cf-switch">' +
                '<input type="checkbox" id="' + id + '" class="switch-blue">' +
                '<label for="' + id + '"></label>' +
                '</div>';
        },

        themeColorOption: function (value) {
            return '<a href="javascript:void(0);" class="bg-'+ value +'" data-theme="'+ value +'"></a>';
        },

        setDefaultCookie: function () {
            if(!!$.cookie('themeColor')) {
                setThemeColor = $.cookie('themeColor');
                $body.addClass(setThemeColor);
            } else {
                $body.addClass(themeColorScheme);
            }
            if(!!$.cookie('sidebarColor')) {
                setSidebarColor = $.cookie('sidebarColor');
                $body.addClass(setSidebarColor);
            }
            if(setSidebarColor) {
                $('#dark').attr('checked', true);
                themeColorScheme = setThemeColor;
            }
        },

        sidebarHTML: function () {
            var rightSidebar = '<div class="sidebar-header">' +
                '<h6 class="h6">Theme Settings</h6>' +
                '<button id="close-sidebar" class="btn bg-transparent p-0"><i class="mi mi-close"></i></button>' +
                '</div>' +
                '<div class="sidebar-body">' +
                '<div class="sidebar-option">' +
                '<ul class="sidebar-check-list">' +
                '<li class="d-flex">' +
                '<label for="dark">Dark Sidebar</label>' +
                '<div class="cf-switch ml-auto">' +
                '<input type="checkbox" id="dark" class="switch-blue" data-sidebar="dark">' +
                '<label for="dark"></label>' +
                '</div>' +
                '</li>' +
                '</ul></div>' +
                '<div class="sidebar-option">' +
                '<span class="title-small">Theme Colors</span>' +
                '<div class="sidebar-theme-color">';
            for (var j = 0; j < themeColor.length; j++) {
                rightSidebar += ThemeSwitcher.themeColorOption(themeColor[j]);
            }
            rightSidebar += '</div></div></div>';
            $sidebar.append(rightSidebar);
        },

        changeSidebar: function () {
            $sidebar.on('click', dataSidebar, function (e) {
                var data = 'theme-' + $(this).data('sidebar');
                if ($(this).is(':checked')) {
                    setSidebarColor = data;
                    $body.addClass(data);
                } else {
                    setSidebarColor = '';
                    $body.removeClass(data);
                }
                $.cookie('sidebarColor', setSidebarColor, { expires: 7, path: '/' });
                e.stopPropagation();
            });
        },

        changeThemeColor: function () {
            $sidebar.on('click', dataTheme, function (e) {
                var data = 'theme-' + $(this).data('theme');
                $body.removeClass(themeColorScheme).addClass(data);
                themeColorScheme = data;
                if(setThemeColor !== themeColorScheme) {
                    setThemeColor = themeColorScheme;
                }
                $.cookie('themeColor', setThemeColor, { expires: 7, path: '/' });
                e.stopPropagation();
            });
        },

        openSidebar: function () {
            $themeSettings.on('click', function (e) {
                $sidebar.addClass('show');
                e.stopPropagation();
            });
        },

        closeSidebar: function () {
            $sidebar.on('click', closeButton, function (e) {
                $sidebar.removeClass('show');
                e.stopPropagation();
            });
        }
    };

    var $body = $('body'),
        $sidebar = $('#right-sidebar'),
        $themeSettings = $('#themeSettings'),
        themeColor = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'cyan'],
        dataSidebar = '[data-sidebar]',
        dataTheme = '[data-theme]',
        closeButton = '#close-sidebar',
        themeColorScheme = 'theme-blue',
        setThemeColor = '',
        setSidebarColor = '';

    $(document).ready(ThemeSwitcher.init);
});