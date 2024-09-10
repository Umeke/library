"use strict";

//=> Class definition
var ChartistDemo = function () {

    //=> Line Chart
    var lineChart = function () {
        var lineChartId = '#chartist-1';
        if($(lineChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            series: [[12, 9, 7, 8, 5], [2, 1, 3.5, 7, 3], [1, 3, 4, 5, 6]]
        };
        var options = {
            fullWidth: true,
            showArea: true,
            chartPadding: {
                right: 40
            }
        };
        new Chartist.Line(lineChartId, data, options);
    };

    //=> Line Null Data Chart
    var lineNullDataChart = function () {
        var lineNullDataChartId = '#chartist-2';
        if($(lineNullDataChartId).length === 0) {
            return;
        }

        var data = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            series: [
                [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
                [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
                [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null],
                [{x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: undefined}, {x: 6, y: 4}, {x: 7, y: null}, {x: 8, y: 4}, {
                    x: 9,
                    y: 4
                }]
            ]
        };
        var options = {
            fullWidth: true,
            chartPadding: {
                right: 10
            },
            low: 0
        };
        new Chartist.Line(lineNullDataChartId, data, options);
    };

    //=> Dotted Chart
    var dottedChart = function () {
        var dottedChartId = '#chartist-3';
        if($(dottedChartId).length === 0) {
            return;
        }

        var times = function (n) {
            return Array.apply(null, new Array(n));
        };
        var data = times(52).map(Math.random).reduce(function (data, rnd, index) {
            data.labels.push(index + 1);
            data.series.forEach(function (series) {
                series.push(Math.random() * 100)
            });

            return data;
        }, {
            labels: [],
            series: times(4).map(function () {
                return new Array()
            })
        });
        var options = {
            showLine: false,
            axisX: {
                labelInterpolationFnc: function (value, index) {
                    return index % 13 === 0 ? 'W' + value : null;
                }
            }
        };
        new Chartist.Line(dottedChartId, data, options);
    };

    //=> Bar Chart
    var barChart = function () {
        var barChartId = '#chartist-4';
        if($(barChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
            ]
        };
        var options = {
            seriesBarDistance: 10
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        new Chartist.Bar(barChartId, data, options, responsiveOptions);
    };

    //=> Stacked Bar Chart
    var stackedBarChart = function () {
        var stackedBarChartId = '#chartist-5';
        if($(stackedBarChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            series: [[800000, 1200000, 1400000, 1300000], [200000, 400000, 500000, 300000], [100000, 200000, 400000, 600000]]
        };
        var options = {
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function (value) {
                    return (value / 1000) + 'k';
                }
            }
        };
        new Chartist.Bar(stackedBarChartId, data, options)
            .on('draw', function (data) {
                if (data.type === 'bar') {
                    data.element.attr({
                        style: 'stroke-width: 30px'
                    });
                }
            });
    };

    //=> Horizontal Bar Chart
    var horizontalBarChart = function () {
        var horizontalBarChartId = '#chartist-6';
        if($(horizontalBarChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [[5, 4, 3, 7, 5, 10, 3], [3, 2, 9, 5, 4, 6, 4]]
        };
        var options = {
            seriesBarDistance: 10,
            reverseData: true,
            horizontalBars: true,
            axisY: {
                offset: 70
            }
        };
        new Chartist.Bar(horizontalBarChartId, data, options);
    };

    //=> Pie Chart
    var pieChart = function () {
        var pieChartId = '#chartist-7';
        if($(pieChartId).length === 0) {
            return;
        }

        var data = {
            series: [5, 3, 4]
        };
        var sum = function (a, b) {
            return a + b
        };
        new Chartist.Pie(pieChartId, data, {
            labelInterpolationFnc: function (value) {
                return Math.round(value / data.series.reduce(sum) * 100) + '%';
            }
        });
    };

    //=> Gauge Chart
    var gaugeChart = function () {
        var gaugeChartId = '#chartist-8';
        if($(gaugeChartId).length === 0) {
            return;
        }

        var data = {
            series: [20, 10, 30, 40]
        };
        var options = {
            donut: true,
            donutWidth: 60,
            startAngle: 270,
            total: 200,
            showLabel: false
        };
        new Chartist.Pie(gaugeChartId, data, options);
    };

    //=> Donut Chart
    var donutChart = function () {
        var donutChartId = '#chartist-9';
        if($(donutChartId).length === 0) {
            return;
        }

        var data = {
            series: [10, 20, 50, 20, 5, 50, 15],
            labels: [1, 2, 3, 4, 5, 6, 7]
        };
        var options = {
            donut: true,
            showLabel: false
        };
        var chart = new Chartist.Pie(donutChartId, data, options);

        chart.on('draw', function (data) {
            if (data.type === 'slice') {
                // Get the total path length in order to use for dash array animation
                var pathLength = data.element._node.getTotalLength();

                // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                data.element.attr({
                    'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                });

                // Create animation definition while also assigning an ID to the animation for later sync usage
                var animationDefinition = {
                    'stroke-dashoffset': {
                        id: 'anim' + data.index,
                        dur: 1000,
                        from: -pathLength + 'px',
                        to: '0px',
                        easing: Chartist.Svg.Easing.easeOutQuint,
                        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                        fill: 'freeze'
                    }
                };

                // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                if (data.index !== 0) {
                    animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
                }

                // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                data.element.attr({
                    'stroke-dashoffset': -pathLength + 'px'
                });

                // We can't use guided mode as the animations need to rely on setting begin manually
                // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                data.element.animate(animationDefinition, false);
            }
        });

        // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
        chart.on('created', function () {
            if (window.__anim21278907124) {
                clearTimeout(window.__anim21278907124);
                window.__anim21278907124 = null;
            }
            window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
        });
    };

    //=> Line Animated Chart
    var lineAnimatedChart = function () {
        var lineAnimatedChartId = '#chartist-10';
        if($(lineAnimatedChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            series: [
                [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
                [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
                [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
                [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
            ]
        };
        var options = {
            low: 0
        };
        var chart = new Chartist.Line(lineAnimatedChartId, data, options);

        var seq = 0,
            delays = 80,
            durations = 500;

        // Once the chart is fully created we reset the sequence
        chart.on('created', function() {
            seq = 0;
        });

        // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
        chart.on('draw', function(data) {
            seq++;

            if(data.type === 'line') {
                // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
                data.element.animate({
                    opacity: {
                        // The delay when we like to start the animation
                        begin: seq * delays + 1000,
                        // Duration of the animation
                        dur: durations,
                        // The value where the animation should start
                        from: 0,
                        // The value where it should end
                        to: 1
                    }
                });
            } else if(data.type === 'label' && data.axis === 'x') {
                data.element.animate({
                    y: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.y + 100,
                        to: data.y,
                        // We can specify an easing function from Chartist.Svg.Easing
                        easing: 'easeOutQuart'
                    }
                });
            } else if(data.type === 'label' && data.axis === 'y') {
                data.element.animate({
                    x: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.x - 100,
                        to: data.x,
                        easing: 'easeOutQuart'
                    }
                });
            } else if(data.type === 'point') {
                data.element.animate({
                    x1: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.x - 10,
                        to: data.x,
                        easing: 'easeOutQuart'
                    },
                    x2: {
                        begin: seq * delays,
                        dur: durations,
                        from: data.x - 10,
                        to: data.x,
                        easing: 'easeOutQuart'
                    },
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'easeOutQuart'
                    }
                });
            } else if(data.type === 'grid') {
                // Using data.axis we get x or y which we can use to construct our animation definition objects
                var pos1Animation = {
                    begin: seq * delays,
                    dur: durations,
                    from: data[data.axis.units.pos + '1'] - 30,
                    to: data[data.axis.units.pos + '1'],
                    easing: 'easeOutQuart'
                };

                var pos2Animation = {
                    begin: seq * delays,
                    dur: durations,
                    from: data[data.axis.units.pos + '2'] - 100,
                    to: data[data.axis.units.pos + '2'],
                    easing: 'easeOutQuart'
                };

                var animations = {};
                animations[data.axis.units.pos + '1'] = pos1Animation;
                animations[data.axis.units.pos + '2'] = pos2Animation;
                animations['opacity'] = {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                };

                data.element.animate(animations);
            }
        });

        // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
        chart.on('created', function() {
            if(window.__exampleAnimateTimeout) {
                clearTimeout(window.__exampleAnimateTimeout);
                window.__exampleAnimateTimeout = null;
            }
            window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
        });
    };

    //=> SVG Animated Chart
    var svgAnimatedChart = function () {
        var svgAnimationChartId = '#chartist-11';
        if($(svgAnimationChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            series: [
                [1, 5, 2, 5, 4, 3],
                [2, 3, 4, 8, 1, 2],
                [5, 4, 3, 2, 1, 0.5]
            ]
        };
        var options =  {
            low: 0,
            showArea: true,
            showPoint: false,
            fullWidth: true
        };
        var chart = new Chartist.Line(svgAnimationChartId, data, options);

        chart.on('draw', function(data) {
            if(data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 2000 * data.index,
                        dur: 2000,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
        });
    };

    return {
        //=> Init
        init: function () {
            lineChart();
            lineNullDataChart();
            dottedChart();
            barChart();
            stackedBarChart();
            horizontalBarChart();
            pieChart();
            gaugeChart();
            donutChart();
            lineAnimatedChart();
            svgAnimatedChart();
        },
    };
}();

//=> Class Initialization
$(document).ready(function () {
    ChartistDemo.init();
});