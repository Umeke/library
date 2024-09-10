"use strict";

//=> Class definition
var DatePicker = function () {

    //=> Init Date Picker
    var initDatePicker = function () {
        $('.datepicker').datepicker({
            todayHighlight: true,
            templates: {
                leftArrow: '<i class="mi mi-keyboard-arrow-left"></i>',
                rightArrow: '<i class="mi mi-keyboard-arrow-right"></i>'
            }
        });
    };

    return {
        //=> Init
        init: function() {
            initDatePicker();
        }
    };
}();

//=> Class Initialization
$(document).ready(function() {
    DatePicker.init();
});