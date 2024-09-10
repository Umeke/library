"use strict";

//=> Class definition
var FlotDemo = function () {

    var data1 = [[0, 30], [1, 35], [2, 35], [3, 30], [4, 30]],
        data2 = [[0, 50], [1, 40], [2, 45], [3, 60], [4, 50]],
        data3 = [[0, 40], [1, 50], [2, 35], [3, 25], [4, 40]],
        stackedData = [ {data: data1, color: "#8854d0"}, {data: data2, color: "#17a2b8"}, {data: data3, color: "#ff8840"}];

    //=> Line Chart
    var lineChart = function() {
        var $flotLineChartId = $("#flot-line-chart");
        if($flotLineChartId.length === 0) {
            return;
        }

        var options = {
            series: {
                shadowSize: 0,
                lines: {
                    show: true
                }
            },
            grid: {
                borderWidth: 1,
                labelMargin: 10,
                mouseActiveRadius: 6,
                borderColor: '#eee',
                show: true,
                hoverable: true,
                clickable: true

            },
            xaxis: {
                tickColor: '#eee',
                tickDecimals: 0,
                font: {
                    lineHeight: 15,
                    style: "normal",
                    color: "#000"
                },
                shadowSize: 0,
                ticks: [
                    [0, "Jan"],
                    [1, "Feb"],
                    [2, "Mar"],
                    [3, "Apr"],
                    [4, "May"],
                    [5, "Jun"],
                    [6, "Jul"],
                    [7, "Aug"],
                    [8, "Sep"],
                    [9, "Oct"],
                    [10, "Nov"],
                    [11, "Dec"]
                ]
            },

            yaxis: {
                tickColor: '#eee',
                tickDecimals: 0,
                font: {
                    lineHeight: 15,
                    style: "normal",
                    color: "#000"
                },
                shadowSize: 0
            },

            legend: {
                container: '.flc-line',
                backgroundOpacity: 0.5,
                noColumns: 0,
                backgroundColor: "white",
                lineWidth: 0
            },
            colors: ["#fd3550", "#008cff", "#15ca20"]
        };
        $.plot($flotLineChartId, [{
            data: data1,
            lines: {
                show: true
            },
            label: 'Product A',
            stack: true,
            color: '#8854d0'
        },
            {
                data: data2,
                lines: {
                    show: true
                },
                label: 'Product B',
                stack: true,
                color: '#17a2b8'
            },
            {
                data: data3,
                lines: {
                    show: true
                },
                label: 'Product C',
                stack: true,
                color: '#ff8840'
            }
        ], options);
    };

    //=> Pie Chart
    var pieChart = function() {
        var $flotPieChartId = $("#flot-pie-chart");
        if($flotPieChartId.length === 0) {
            return;
        }

        var data = [{
            data: 18000,
            color: '#4b6584',
            label: 'Linda'
        },
            {
                data: 20000,
                color: '#eb3b5a',
                label: 'John'
            },
            {
                data: 13000,
                color: '#4b7bec',
                label: 'Margaret'
            },
            {
                data: 15000,
                color: '#20bf6b',
                label: 'Richard'
            }
        ];

        $.plot($flotPieChartId, data, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 3 / 4,
                        formatter: labelFormatter,
                        background: {
                            opacity: 0.5
                        }
                    }
                }
            },
            legend: {
                show: false
            }
        });

        function labelFormatter(label, series) {
            return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
        }
    };

    //=> Area Chart
    var areaChart = function () {
        var $flotAreaChartId = $("#flot-area-chart");
        if($flotAreaChartId.length === 0) {
            return;
        }

        var d1 = [
            [0, 0],
            [1, 35],
            [2, 35],
            [3, 30],
            [4, 30],
            [5, 5],
            [6, 32],
            [7, 37],
            [8, 30],
            [9, 35],
            [10, 30],
            [11, 5]
        ];
        var options = {
            series: {
                shadowSize: 0,
                curvedLines: { //This is a third party plugin to make curved lines
                    apply: true,
                    active: true,
                    monotonicFit: true
                },
                lines: {
                    show: false,
                    fill: 0.98,
                    lineWidth: 0
                }
            },
            grid: {
                borderWidth: 0,
                labelMargin: 10,
                hoverable: true,
                clickable: true,
                mouseActiveRadius: 6

            },
            xaxis: {
                tickDecimals: 0,
                tickLength:0
            },

            yaxis: {
                tickDecimals: 0,
                tickLength:0
            },

            legend: {
                show: false
            }
        };

        $.plot($flotAreaChartId, [{
            data: d1,
            lines: {
                show: true,
                fill: 0.6
            },
            label: 'Product 1',
            stack: true,
            color: '#4b7bec'
        }], options);
    };

    //=> Real Time Chart
    var realTimeCart = function () {
        var $flotRealChartId = $("#flot-real-chart");
        if($flotRealChartId.length === 0) {
            return;
        }

        var data = [], totalPoints = 300;
        function getRandomData() {
            if (data.length > 0)
                data = data.slice(1);

            while (data.length < totalPoints) {
                var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;
                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }
                data.push(y);
            }

            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        }

        var plot = $.plot($flotRealChartId, [getRandomData()], {
            series: {
                shadowSize: 0,
                lines: {
                    fill: false
                }
            },
            yaxis: {
                min: 0,
                max: 100
            },
            xaxis: {
                show: false,
                borderColor: "#fff"
            },
            colors: ["#177ec1"],
            grid: {
                borderColor: "#FFF",
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0
            }
        });

        var updateInterval = 30;

        function update() {
            plot.setData([getRandomData()]);
            plot.draw();
            setTimeout(update, updateInterval);
        }
        update();
    };

    //=> Bar Chart
    var barChart = function () {
        var $flotBarChartId = $("#flot-bar-chart");
        if($flotBarChartId.length === 0) {
            return;
        }

        var data = [
            ["January", 10],
            ["February", 8],
            ["March", 4],
            ["April", 13],
            ["May", 17],
            ["June", 9]
        ];
        $.plot($flotBarChartId, [data], {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.6,
                    align: "center"
                }
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            },

            grid: {
                borderWidth: 0,
                labelMargin: 10,
                hoverable: true,
                clickable: true,
                mouseActiveRadius: 6
            }

        });
    };

    //=> Stack Bar Chart
    var stackBarChart = function () {
        var $flotStackChartId = $("#flot-stack-chart");
        var d1 = [];
        for (var i = 0; i <= 10; i += 1) {
            d1.push([i, parseInt(Math.random() * 30)]);
        }

        var d2 = [];
        for (var j = 0; j <= 10; j += 1) {
            d2.push([j, parseInt(Math.random() * 30)]);
        }

        var d3 = [];
        for (var k = 0; k <= 10; k += 1) {
            d3.push([k, parseInt(Math.random() * 30)]);
        }

        $.plot($flotStackChartId, stackedData, {
            series: {
                stack: 0,
                lines: {
                    show: false,
                    fill: true,
                    steps: false
                },
                bars: {
                    show: true,
                    fill: true,
                    barWidth: 0.6
                }
            },
            grid: {
                borderWidth: 0,
                labelMargin: 10,
                hoverable: true,
                clickable: true,
                mouseActiveRadius: 6
            }
        });
    };

    return {
        //=> Init
        init: function() {
            lineChart();
            pieChart();
            areaChart();
            realTimeCart();
            barChart();
            stackBarChart();
        },
    };
}();

//=> Class Initialization
$(document).ready(function() {
    FlotDemo.init();
});