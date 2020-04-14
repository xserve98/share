/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function($) {
  $(function() {
    var $table = $('#table');

    $('#button').click(function() {
      // 销毁表格
      $table.bootstrapTable('destroy');
    });
    $('#button2').click(function() {
      // 初始化表格
      $table.bootstrapTable();
    });
  });
})(jQuery);
