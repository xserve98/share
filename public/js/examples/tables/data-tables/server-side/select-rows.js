/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function (window, document, $) {
    "use strict";

    var selected = [0, 2, 4, 7, 9, 12, 13, 15, 19, 26, 34, 37, 44, 47];

    $("#dataTableExample").DataTable($.concatCpt('dataTable', {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "http://demo.admui.com/employee/all/get",
            "dataType": "jsonp"
        },
        "columns": [
            {"data": "name"},
            {"data": "title"},
            {"data": "base"},
            {"data": "age"},
            {"data": "hireDate"},
            {"data": "salary"}
        ],
        "rowCallback": function (row, data) {
            if ($.inArray(data.DT_RowId, selected) !== -1) {
                $(row).addClass('selected');
            }
        }
    }));

    $(document).on('click', '#dataTableExample tbody tr', function () {
        var id = this.id;
        var index = $.inArray(id, selected);

        if (index === -1) {
            selected.push(id);
        } else {
            selected.splice(index, 1);
        }

        $(this).toggleClass('selected');
    });

})(window, document, jQuery);

