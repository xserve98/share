/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').DataTable($.concatCpt('dataTable', {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "http://demo.admui.com/employee/all",
            "dataType": "jsonp",
            "data": function (d) {
                d.myKey = "myValue";
                // d.custom = $('#myInput').val();
                // ……
            }
        }
    }));

})(window, document, jQuery);

