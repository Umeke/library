"use strict";

//=> Class definition
var advanceCalendar = function () {

    //=> Init Calendar
    var initCalendar = function() {
        var $calendar = $('#calendar');
        if($calendar.length === 0) {
            return;
        }
        $calendar.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            events: [
                {
                    title: 'Meeting',
                    start: '2018-10-01',
                    className: 'fc-event-cyan'
                },
                {
                    title: 'Music concert',
                    start: '2018-10-05',
                    end: '2018-10-07',
                    className: 'fc-event-blue'
                },
                {
                    title: 'New technology learning seminar',
                    start: '2018-10-10T08:30:00.0',
                    end: '2018-10-14T08:30:00.0',
                    className: 'fc-event-green'
                },
                {
                    title: 'Beauty contest',
                    start: '2018-10-20',
                    end: '2018-10-22T08:30:00.0',
                    className: 'fc-event-indigo'
                },
                {
                    title: 'One day picnic at new garden',
                    start: '2018-10-29T08:30:00.0',
                    end: '2018-10-30T08:30:00.0',
                    className: 'fc-event-green'
                }
            ]
        });
    };

    return {
        //=> Init
        init: function () {
            initCalendar();
        },
    };
}();

//=> Class Initialization
$(document).ready(function () {
    advanceCalendar.init();
});