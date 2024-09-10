"use strict";

//=> Class definition
var dataTableDemo = function () {

    //=> Init Data Table
    var initDataTable = function () {
        var $dataTableId = $("#datatable");
        if($dataTableId.length === 0) {
            return;
        }
        $dataTableId.DataTable({
            "order": [[3, "desc"]]
        })
    };

    return {
        //=> Init
        init: function () {
            initDataTable();
        },
    };
}();

//=> Class Initialization
$(document).ready(function () {
    dataTableDemo.init();
});