"use strict";

//=> Class definition
var advanceCalendar = function () {

    //=> Init Calendar
    var initCalendar = function() {
        var $calendar = $('#calendar');
        var $calendarEvent = $('#fc-list .fc-event');
        var $removeEvent = $('#remove-event');
        if($calendar.length === 0) {
            return;
        }

        $calendarEvent.each(function () {
            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).text()), // use the element's text as the event title
                stick: true, // maintain when user navigates (see docs on the renderEvent method)
                className: $(this).data('color')
            });

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });

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
            ],
            editable: true,
            droppable: true,
            drop: function () {
                // is the "remove after drop" checkbox checked?
                if ($removeEvent.is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            }
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