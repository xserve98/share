/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function (window, document, $) {
    "use strict";

    $('#dataTableExample').dataTable($.concatCpt('dataTable', {
        "aoColumns": [
            null,
            null,
            {"orderSequence": ["asc"]},
            {"orderSequence": ["desc", "asc", "asc"]},
            {"orderSequence": ["desc"]},
            null
        ]
    }));

})(window, document, jQuery);

