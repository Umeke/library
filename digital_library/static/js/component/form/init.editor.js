"use strict";

//=> Class definition
var HTMLEditor = function () {

    var cssPath = '', fileNames = [''];

    //=> CSS Path
    var getCssPath = function () {
        const url = window.location.pathname,
            urlPath = url.split('/'),
            htmlPage = urlPath[urlPath.length - 1],
            src = 'src',
            dist = 'dist',
            theme = 'theme';
        var index;
        for(var i = 0; i < urlPath.length; i++) {
            if(urlPath[i] === src || urlPath[i] === dist || urlPath[i] === theme) {
                index = i;
            }
        }

        if(index) {
            for(var j = index + 1; j < urlPath.length; j++) {
                if(urlPath[j] !== htmlPage) {
                    cssPath += '../';
                }
            }
        } else {
            for(var l = 1; l < urlPath.length; l++) {
                if(urlPath[l] !== htmlPage) {
                    cssPath += '../';
                }
            }
        }
        cssPath += 'assets/css/styles.css';
    };

    //=> Init HTML Editor
    var initHTMLEditor = function() {
        var editor = new wysihtml.Editor("editor", {
            toolbar: "toolbar",
            parserRules: wysihtmlParserRules,
            stylesheets: cssPath
        });
    };

    return {
        //=> Init
        init: function () {
            getCssPath();
            initHTMLEditor();
        },
    };
}();

//=> Class Initialization
$(document).ready(function () {
    HTMLEditor.init();
});