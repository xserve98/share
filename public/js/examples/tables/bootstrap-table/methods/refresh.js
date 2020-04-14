/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function($) {
  $(function() {
    $('#button').click(function() {
      // 重载整个表格数据
      $('#table').bootstrapTable('refresh');
    });
  });
})(jQuery);
