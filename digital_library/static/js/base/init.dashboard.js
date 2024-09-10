"use strict";

//=> Class definition
var Dashboard = function () {

    var lineChartData = [[100, 110, 90, 130, 160, 150, 120, 70, 90, 90, 110, 150],
        [20, 80, 110, 90, 130, 150, 140, 90, 60, 70, 100, 120],
        [200, 180, 220, 160, 130, 100, 120, 90, 110, 150, 120, 140]];

    //=> User Statistics
    var userStatistics = function (data) {
        var $chart = $("#userStatistics");
        if ($chart.length === 0) {
            return;
        }

        var config = {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nev", "Dec"],
                datasets: [
                    {
                        data: data[0],
                        backgroundColor: 'rgba(254,211,48, 0.2)',
                        borderColor: 'rgba(254,211,48, 1)',
                        borderWidth: 1,
                        radius: 0,
                        hoverRadius: 1
                    },
                    {
                        data: data[1],
                        backgroundColor: 'rgba(235,59,90, 0.2)',
                        borderColor: 'rgba(235,59,90, 1)',
                        borderWidth: 1,
                        radius: 0,
                        hoverRadius: 1
                    },
                    {
                        data: data[2],
                        backgroundColor: 'rgba(75,123,236, 0.2)',
                        borderColor: 'rgba(75,123,236, 1)',
                        borderWidth: 1,
                        radius: 0,
                        hoverRadius: 1
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 60,
                            min: 0,
                            max: 300
                        }
                    }]
                }
            }
        };
        var chart = new Chart($chart, config);
    };

    //=> Change User Statistics Data
    var changeUserStatisticsData = function () {
        var $selectboxLineChartId = $("#user-stat");
        if ($selectboxLineChartId.length === 0) {
            return;
        }

        $selectboxLineChartId.on('change', function () {
            if ($(this).is(':checked')) {
                lineChartData = [[10, 60, 100, 140, 110, 80, 120, 60, 40, 20, 60, 100],
                    [120, 40, 60, 80, 130, 90, 50, 60, 90, 110, 70, 50],
                    [100, 80, 50, 70, 90, 110, 130, 150, 120, 80, 60, 40]];
                userStatistics(lineChartData);
            } else {
                lineChartData = [[100, 110, 90, 130, 160, 150, 120, 70, 90, 90, 110, 150],
                    [20, 80, 110, 90, 130, 150, 140, 90, 60, 70, 100, 120],
                    [200, 180, 220, 160, 130, 100, 120, 90, 110, 150, 120, 140]];
                userStatistics(lineChartData);
            }
        });
    };

    //=> Visit Traffic
    var visitTraffic = function () {
        var $chart = $("#chartjs-doughnut");
        if ($chart.length === 0) {
            return;
        }

        var config = {
            type: 'doughnut',
            data: {
                labels: ["Organic", "Refrral", "Other"],
                datasets: [
                    {
                        data: [35.64, 24.36, 40],
                        backgroundColor: ['#8854d0', '#ff8840', '#20bf6b'],
                        borderWidth: 0,
                        radius: 0,
                        hoverRadius: 0
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                }
            }
        };
        var chart = new Chart($chart, config);
    };

    //=> Advertising
    var advertising = function () {
        var $chart = $("#chartjs-horbar");
        if ($chart.length === 0) {
            return;
        }

        var config = {
            type: 'horizontalBar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    {
                        data: [100, 110, 90, 130, 160, 150],
                        backgroundColor: '#17a2b8',
                        borderWidth: 0,
                        radius: 0,
                        hoverRadius: 0
                    },
                    {
                        data: [20, 80, 110, 90, 130, 150],
                        backgroundColor: '#8854d0',
                        borderWidth: 0,
                        radius: 0,
                        hoverRadius: 0
                    },
                    {
                        data: [200, 180, 220, 160, 130, 100],
                        backgroundColor: '#4b6584',
                        borderWidth: 0,
                        radius: 0,
                        hoverRadius: 0
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 100,
                            min: 0,
                            max: 500
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
        };
        var chart = new Chart($chart, config);
    };

    //=> Init Sparkline
    var initSparkline = function () {
        var $sparkjsBar = $('.sparkjs-bar');
        var $sparkjsLine = $('.sparkjs-line');
        var $countryLine = $('.country-line');
        var $sparkjsOI = $('.sparkjs-oi');
        var $sparkjsPI = $('.sparkjs-pi');
        var $sparkjsHE = $('.sparkjs-he');
        var $sparkjsRevenue = $('#revenue');
        var $sparkjsOrder = $('#order');
        var $sparkjsProduct = $('#sparkjs-product');

        if ($sparkjsBar.length) {
            $sparkjsBar.sparkline('html', {type: 'bar', barColor: '#6c757d', barSpacing: 2});
        }
        if ($sparkjsLine.length) {
            $sparkjsLine.sparkline('html', {type: 'line', width: '85px', height: '25px'});
        }
        if ($countryLine.length) {
            $countryLine.sparkline('html', {type: 'bar', barColor: '#fff', barSpacing: 4});
        }
        if ($sparkjsOI.length) {
            $sparkjsOI.sparkline([4,5,7,8,6,11,19,10,8,13,12,14,7,5], {type: 'bar', barColor: '#8854d0', barSpacing: 6, height:'40px'});
        }
        if ($sparkjsPI.length) {
            $sparkjsPI.sparkline([6,7,5,9,10,11,7,4,6,3,2,4,9,7], {type: 'bar', barColor: '#20bf6b', barSpacing: 6, height:'40px'});
        }
        if ($sparkjsHE.length) {
            $sparkjsHE.sparkline([3,2,5,6,4,7,7,5,3,1,2,4,7,9], {type: 'bar', barColor: '#eb3b5a', barSpacing: 6, height:'40px'});
        }
        if ($sparkjsOrder.length) {
            $sparkjsOrder.sparkline('html', {type: 'bar', barColor: '#17a2b8', barSpacing: 3, height: '30px'});
        }
        if ($sparkjsRevenue.length) {
            $sparkjsRevenue.sparkline('html', {type: 'bar', barColor: '#20bf6b', barSpacing: 3, height: '30px'});
        }
        if ($sparkjsProduct.length) {
            $sparkjsProduct.sparkline('html', {type: 'bar', barColor: '#fff', barSpacing: 4, barWidth: 6, height: '30px'});
        }
    };

    //=> Top Country
    var topCountry = function () {
        var topCountryId = '#top-country';
        if ($(topCountryId).length === 0) {
            return;
        }

        var data = {
            series: [{value: 60, className: 'ct-line'}, {value: 40}]
        };
        var options = {
            donut: true,
            donutWidth: 10,
            donutSolid: true,
            startAngle: 180,
            showLabel: false
        };
        new Chartist.Pie(topCountryId, data, options);
    };

    //=> Country Data
    var countryData = function () {
        var $countryDataId = $('#country-data');
        if ($countryDataId.length === 0) {
            return;
        }

        $countryDataId.owlCarousel({
            autoplay: true,
            loop: true,
            margin: 10,
            nav: false,
            responsive: {
                0: {items: 1},
                600: {items: 2},
                1000: {items: 2}
            }
        });
    };

    //=> Gender Split
    var genderSplit = function () {
        var $chart = $('#genderSplit');
        if($chart.length === 0) {
            return;
        }

        var config = {
            type: 'bar',
            data: {
                labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
                datasets: [
                    {
                        data: [100, 110, 90, 130, 160, 150, 120, 70],
                        backgroundColor: 'rgba(136,84,208, .2)',
                        borderColor: 'rgba(136,84,208, 1)',
                        borderWidth: 1,
                        radius: 0,
                        hoverRadius: 1
                    },
                    {
                        data: [20, 80, 110, 90, 130, 150, 140, 90],
                        backgroundColor: 'rgba(32,191,107, .2)',
                        borderColor: 'rgba(32,191,107, 1)',
                        borderWidth: 1,
                        radius: 0,
                        hoverRadius: 1
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 60,
                            min: 0,
                            max: 300,
                            stack: true
                        }
                    }]
                }
            }
        };
        var chart = new Chart($chart, config);
    };

    //=> Live Flot Chart
    var liveFlotChart = function () {
        var liveFlotChartId = '#live-flot';
        if($(liveFlotChartId).length === 0) {
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

        var plot = $.plot("#live-flot", [ getRandomData() ], {
            series: {
                shadowSize: 0,
                lines: {
                    fill: false
                }
            },
            yaxis: {
                min: 0,
                max: 100,
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

    //=> Inline Date Picker
    var inlineDatePicker = function () {
        var $datePickerCalendar = $('#inline-calendar'),
            $datePickerInput = $('#inline-calendar-input');
        if($datePickerCalendar.length === 0) {
            return;
        }

        $datePickerCalendar.datepicker({
            templates: {
                leftArrow: '<i class="mi mi-keyboard-arrow-left"></i>',
                rightArrow: '<i class="mi mi-keyboard-arrow-right"></i>'
            }
        });
        $datePickerCalendar.on('changeDate', function () {
            $datePickerInput.val(
                $datePickerCalendar.datepicker('getFormattedDate')
            );
        });
    };

    //=> Top Revenue Chart
    var topRevenueChart = function () {
        var topRevenueChartId = '#total-revenue-chart';
        if($(topRevenueChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [201, 680, 350, 302, 410, 405, 570, 400, 505, 620, 350, 900],
                [101, 580, 380, 322, 210, 405, 430, 480, 545, 720, 550, 728],
                [58, 89, 102, 201, 210, 310, 258, 268, 349, 120, 98, 105]
            ]
        };
        var options = {
            low: 0,
            showPoint: true,
            fullWidth: true,
            lineSmooth: true,
            chartPadding: {
                right: 30
            },
            axisX: {
                showGrid: false
            },
            axisY: {
                labelInterpolationFnc: function(value) {
                    return (value / 100) + 'K';
                },
                showGrid: false
            }
        };
        var chart = new Chartist.Line(topRevenueChartId, data, options);
    };

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

    var callSlimScroll = function () {
        if($("#doctor-list").length) {
            initSlimScroll("#doctor-list", '420px');
        }
        if($(".chat-widget").length) {
            initSlimScroll(".chat-widget", '290px');
        }
        if($("#activity-scroll").length) {
            initSlimScroll("#activity-scroll", '340px');
        }
        if($("#customer-feed").length) {
            initSlimScroll("#customer-feed", '220px');
        }
        if($(".menu-order-scroll").length) {
            initSlimScroll(".menu-order-scroll", '282px');
        }
        if($("#todo-list").length) {
            initSlimScroll("#todo-list", '220px');
        }
        if ($("#adv-todo-list").length) {
            initSlimScroll("#adv-todo-list", '520px');
        }
    };

    //=> Rating Chart
    var ratingChart = function () {
        var ratingChartId = '#rating-chart';
        if($(ratingChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['5', '4', '3', '2', '1'],
            series: [160, 180, 140, 164, 120]
        };
        var options = {
            distributeSeries: true,
            axisX: {
                showGrid: false,
                showLabel: true
            },
            axisY: {
                offset: 0,
                showGrid: false,
                showLabel: false
            }
        };
        new Chartist.Bar(ratingChartId, data, options);
    };

    //=> Revenue Chart
    var revenueChart = function () {
        var revenueChartId = "#revenue-chart";
        if($(revenueChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['8', '7', '6', '5', '4', '3', '2', '1'],
            series: [[100, 140, 120, 160, 100, 140, 120, 80]]
        };
        var options = {
            fullWidth: true,
            low: 0,
            showArea: true,
            chartPadding: 0,
            showPoint: false,
            axisX: {
                offset: 0,
                showGrid: false,
                showLabel: false
            },
            axisY: {
                offset: 0,
                showGrid: false,
                showLabel: false
            }
        };
        new Chartist.Line(revenueChartId, data, options);
    };

    //=> Earning Graph Chart
    var earningGraph = function () {
        var $chart = $("#earning-graph");
        if($chart.length === 0) {
            return;
        }

        var config = {
            type: 'line',
            data: {
                labels: ["2013", "2014", "2015", "2016", "2017"],
                datasets: [
                    {
                        data: [120, 180, 140, 160, 120],
                        backgroundColor: 'rgba(243,104,224, 0.3)',
                        borderColor: 'rgba(243,104,224, 1)',
                        borderWidth: 1,
                        radius: 0,
                        hoverRadius: 1
                    },
                    {
                        data: [80, 220, 120, 200, 240],
                        backgroundColor: 'rgba(235,59,90, 0.3)',
                        borderColor: 'rgba(235,59,90, 1)',
                        borderWidth: 1,
                        radius: 0,
                        hoverRadius: 1
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 60,
                            min: 0,
                            max: 300
                        }
                    }]
                }
            }
        };
        var chart = new Chart($chart, config);
    };

    //=> To do List
    var todoList = function () {
        var $todoList = $("#todo-list"),
            $todoInput = $("#todo-input"),
            todoItem = '.todo-item';
        var count = $todoList.length;

        $todoInput.on('keyup', function (e) {
            if(e.which === 13) {
                var html = '<li class="todo-item">',
                    text = $(this).val();
                html += '<div class="cf-checkbox">';
                html += '<input type="checkbox" id="cki' +count+ '">';
                html += '<label for="cki' +count+ '">' +text+ '</label>';
                html += '</div>';
                html += '<a href="javascript:void(0);" class="tl-close"><i class="mi mi-close"></i></a>';
                html += '</li>';
                $todoList.append(html);
                $(this).val('');
                count++;
            }
        });
        $todoList.on('click', '.tl-close', function (e) {
            e.stopPropagation();
            $(this).closest('.todo-item').hide();
        });
    };

    //=> Weekly Chart
    var weeklyChart = function () {
        var weeklyChartId = '#weekly-chart';
        if($(weeklyChartId).length === 0) {
            return;
        }

        var data = {
            labels: ['', 'S', 'M', 'T', 'W', 'T', 'F', 'S', ''],
            series: [[90,100, 140, 120, 160, 100, 140, 120, 110]]
        };
        var options = {
            fullWidth: true,
            low: 0,
            showArea: true,
            chartPadding: 0,
            showPoint: false,
            showLabel: true,
            axisX: {
                labelOffset: {
                    x: -20,
                    y: -40
                },
                showGrid: false
            },
            axisY: {
                offset: 0,
                showGrid: false,
                showLabel: false
            }
        };
        new Chartist.Line(weeklyChartId, data, options);
    };

    //=> Sale Chart
    var saleChart = function () {
        var $chart = $("#sale-chart");
        if($chart.length === 0) {
            return;
        }

        var config = {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        data: [58, 89, 102, 201, 210, 310, 258, 268, 349, 120, 98, 105],
                        backgroundColor: 'rgba(75,123,236, 0.4)',
                        borderColor: 'rgba(75,123,236, 1)',
                        borderWidth: 2,
                        radius: 0,
                        hoverRadius: 1
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 80,
                            min: 0,
                            max: 400
                        }
                    }]
                }
            }
        };
        var chart = new Chart($chart, config);
    };

    //=> Product Chart
    var productChart = function () {
        var $chart = $("#product-chart");
        if($chart.length === 0) {
            return;
        }

        var config = {
            type: 'doughnut',
            data: {
                labels: ["iPhone", "Sony", "HTC", "Samsung"],
                datasets: [
                    {
                        data: [38, 26, 12, 34],
                        backgroundColor: ['#8854d0', '#ff8840', '#20bf6b', '#17a2b8'],
                        borderWidth: 0,
                        radius: 0,
                        hoverRadius: 0
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio:false,
                percentageInnerCutout: 50,
                cutoutPercentage: 80,
                segmentShowStroke: false
            }
        };
        var chart = new Chart($chart, config);
    };

    //=> Conversion Chart
    var conversionChart = function () {
        var conversionChartId = '#conversion-chart';
        if($(conversionChartId).length === 0) {
            return;
        }

        var data = {
            series: [{value: 60, className: 'ct-line'}, {value: 40}]
        };
        var options = {
            donut: true,
            donutWidth: 10,
            donutSolid: true,
            startAngle: 180,
            showLabel: false
        };
        new Chartist.Pie(conversionChartId, data, options);
    };

    //=> Testimonials
    var testimonials = function () {
        var $testimonialsId = $('#testimonials');
        if($testimonialsId.length === 0) {
            return;
        }

        $testimonialsId.owlCarousel({
            autoplay: true,
            items: 1,
            loop: true,
            margin: 10,
            nav: false
        });
    };

    return {
        //=> Welcome Message
        welcomeMessage: function () {
            window.setTimeout(function () {
                $.toast({
                    heading: 'Welcome to Dashto admin',
                    text: 'Use the predefined ones, or specify a custom position object.',
                    position: 'top-right',
                    bgColor: '#20bf6b',
                    loaderBg: '#6900ff',
                    hideAfter: 3500,
                    stack: 1
                });
            }, 1000);
        },

        //=> Init
        init: function () {
            userStatistics(lineChartData);
            changeUserStatisticsData();
            visitTraffic();
            advertising();
            topCountry();
            countryData();
            initSparkline();
            genderSplit();
            liveFlotChart();
            inlineDatePicker();
            topRevenueChart();
            callSlimScroll();
            ratingChart();
            revenueChart();
            earningGraph();
            todoList();
            weeklyChart();
            saleChart();
            productChart();
            conversionChart();
            testimonials();
        }
    };
}();

//=> Class Initialization
$(document).ready(function () {
    Dashboard.init();
});

//=> Load Welcome Message
$(window).on('load', function () {
    Dashboard.welcomeMessage();
});