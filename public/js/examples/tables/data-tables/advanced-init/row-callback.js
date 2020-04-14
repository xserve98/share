/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').dataTable($.concatCpt('dataTable', {
        "createdRow": function (row, data) {
            if (data[5].replace(/[\¥,]/g, '') * 1 > 400000) {
                $('td', row).eq(5).css('font-weight', "bold").css("color", "red");
            }
        }
    }));

})(window, document, jQuery);

