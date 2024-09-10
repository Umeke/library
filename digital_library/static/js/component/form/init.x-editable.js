"use strict";

//=> Class definition
var XEditable = function () {

    //=> Init X-Editable
    var initXEditable = function() {
        // turn to inline mode
        $.fn.editable.defaults.mode = 'inline';

        // Default Editable Buttons
        $.fn.editableform.buttons =
            '<button type="submit" class="btn btn-primary editable-submit">'+
            '<i class="fa fa-fw fa-check"></i>'+
            '</button>'+
            '<button type="button" class="btn btn-default editable-cancel">'+
            '<i class="fa fa-fw fa-times"></i>'+
            '</button>';

        $('#username').editable({
            url: '/post',
            type: 'text',
            pk: 1,
            name: 'username',
            title: 'Enter username'
        });

        $('#firstname').editable({
            validate: function(value) {
                if($.trim(value) == '') return 'This field is required';
            }
        });

        $('#sex').editable({
            prepend: "not selected",
            source: [
                {value: 1, text: 'Male'},
                {value: 2, text: 'Female'}
            ],
            display: function(value, sourceData) {
                var colors = {"": "gray", 1: "green", 2: "blue"},
                    elem = $.grep(sourceData, function(o){return o.value == value;});

                if(elem.length) {
                    $(this).text(elem[0].text).css("color", colors[value]);
                } else {
                    $(this).empty();
                }
            }
        });

        $('#dob').editable();

        $('#event').editable({
            placement: 'right',
            combodate: {
                firstItem: 'name'
            }
        });

        $('#comments').editable({
            showbuttons: 'bottom'
        });

        $('#fruits').editable({
            pk: 1,
            limit: 3,
            source: [
                {value: 1, text: 'banana'},
                {value: 2, text: 'peach'},
                {value: 3, text: 'apple'},
                {value: 4, text: 'watermelon'},
                {value: 5, text: 'orange'}
            ]
        });
    };

    return {
        //=> Init
        init: function () {
            initXEditable();
        },
    };
}();

//=> Class Initialization
$(document).ready(function () {
    XEditable.init();
});