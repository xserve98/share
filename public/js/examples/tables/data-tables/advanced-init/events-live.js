/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function (window, document, $) {
    "use strict";

    var table = $('#dataTableExample').DataTable($.concatCpt('dataTable'));

    App.run();

    $(document).on('click', '#dataTableExample tbody tr', function () {
        var data = table.row(this).data();
        toastr.info('您单击了"' + data[0] + '"的行');
    });

})(window, document, jQuery);

