"use strict";

//=> Class definition
var SparklineDemo = function () {

    //=> Charts
    var initSparkline = function () {
        var $sparkline1 = $('#sparkline1');
        var $sparkline2 = $('#sparkline2');
        var $sparkline3 = $('#sparkline3');
        var $sparkline4 = $('#sparkline4');
        var $sparkline5 = $('#sparkline5');

        if ($sparkline1.length) {
            $sparkline1.sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
                type: 'line',
                width: '100%',
                height: '180',
                lineColor: '#20bf6b',
                fillColor: '#20bf6b',
                minSpotColor: '#20bf6b',
                maxSpotColor: '#20bf6b',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: '#20bf6b'
            });
        }

        if ($sparkline2.length) {
            $sparkline2.sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
                type: 'line',
                width: '100%',
                height: '180',
                lineColor: '#17a2b8',
                fillColor: 'transparent',
                minSpotColor: '#17a2b8',
                maxSpotColor: '#17a2b8',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: '#17a2b8',
                lineWidth: 2
            });
        }

        if ($sparkline3.length) {
            $sparkline3.sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
                type: 'bar',
                height: '180',
                barColor: '#8854d0',
                barWidth: 8,
                barSpacing: 8
            });
        }

        if ($sparkline4.length) {
            $sparkline4.sparkline([20, 40, 30], {
                type: 'pie',
                height: '200',
                resize: true,
                sliceColors: ['#dee2e6', '#f368e0', '#17a2b8']
            });
        }

        if ($sparkline5.length) {
            $sparkline5.sparkline([5, 6, 2, 9, 4, 7, 10, 12, 4, 7, 10], {
                type: 'bar',
                height: '200',
                barWidth: '10',
                resize: true,
                barSpacing: '7',
                barColor: '#ff8840'
            });
            $sparkline5.sparkline([5, 6, 2, 9, 4, 7, 10, 12, 4, 7, 10], {
                type: 'line',
                height: '200',
                lineColor: '#ff8840',
                fillColor: 'transparent',
                composite: true,
                highlightLineColor: 'rgba(0,0,0,.1)',
                highlightSpotColor: 'rgba(0,0,0,.2)'
            });
        }
    };

    return {
        //=> Init
        init: function() {
            initSparkline();
        },
    };
}();

//=> Class Initialization
$(document).ready(function() {
    SparklineDemo.init();
});