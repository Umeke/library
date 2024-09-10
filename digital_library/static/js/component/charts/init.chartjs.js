"use strict";

//=> Class definition
var ChartjsDemo = function () {

    //=> Charts
    var initCharts = function () {
        if ($('#line-chart').length) {
            var ctx = document.getElementById('line-chart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Google',
                        data: [13, 20, 4, 18, 7, 4, 8],
                        backgroundColor: "rgba(235,59,90, 0.5)",
                        borderColor: "rgba(235,59,90)",
                        borderWidth: 1
                    }, {
                        label: 'Facebook',
                        data: [3, 30, 6, 6, 3, 4, 11],
                        backgroundColor: "rgba(23,162,184, 0.5)",
                        borderColor: "rgba(23,162,184)",
                        borderWidth: 1
                    }]
                }
            });
        }

        if ($('#bar-chart').length) {
            var ctx = document.getElementById("bar-chart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Google',
                        data: [13, 20, 4, 18, 29, 25, 8],
                        backgroundColor: "#6900ff"
                    }, {
                        label: 'Facebook',
                        data: [31, 30, 6, 6, 21, 4, 11],
                        backgroundColor: "#20bf6b"
                    }]
                }
            });
        }

        if ($('#radar-chart').length) {
            var ctx = document.getElementById("radar-chart");
            var myChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                    datasets: [{
                        label: 'Twitter',
                        backgroundColor: "rgba(34, 48, 53, 0.5)",
                        borderColor: "#4b6584",
                        data: [13, 20, 4, 18, 29, 25, 8]
                    }, {
                        label: 'Linkedin',
                        backgroundColor: "rgba(255, 151, 0, 0.5)",
                        borderColor: "#ff8840",
                        data: [31, 30, 6, 6, 21, 4, 11]
                    }]
                }
            });
        }

        if ($('#polar-chart').length) {
            var ctx = document.getElementById("polar-chart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: ["Primary", "Success", "Danger", "Warning"],
                    datasets: [{
                        backgroundColor: [
                            "#4b7bec",
                            "#20bf6b",
                            "#eb3b5a",
                            "#ff8840"
                        ],
                        data: [13, 20, 11, 18]
                    }]
                }
            });
        }

        if ($('#pie-chart').length) {
            var ctx = document.getElementById("pie-chart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Info", "Dark", "Danger", "Secondary"],
                    datasets: [{
                        backgroundColor: [
                            "#17a2b8",
                            "#4b6584",
                            "#fed330",
                            "#8854d0"
                        ],
                        data: [13, 20, 11, 18]
                    }]
                }
            });
        }

        if ($('#doughnut-chart').length) {
            var ctx = document.getElementById("doughnut-chart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Info", "Success", "Danger", "Dark"],
                    datasets: [{
                        backgroundColor: [
                            "#8854d0",
                            "#20bf6b",
                            "#eb3b5a",
                            "#4b6584"
                        ],
                        data: [13, 20, 11, 18]
                    }]
                }
            });
        }
    };

    return {
        //=> Init
        init: function() {
            initCharts();
        },
    };
}();

//=> Class Initialization
$(document).ready(function() {
    ChartjsDemo.init();
});