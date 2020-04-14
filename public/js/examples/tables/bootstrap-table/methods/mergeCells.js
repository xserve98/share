/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function($) {
  $(function() {
    $('#button').click(function() {
      // 合并单元格
      $('#table').bootstrapTable('mergeCells', {
        index: 1,
        field: 'name',
        colspan: 2,
        rowspan: 3
      });
    });
  });
})(jQuery);
