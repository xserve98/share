/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function($) {
  $(function() {
    var $table = $('#table');

    // 设置滚动位置
    $('#button').click(function() {
      $table.bootstrapTable('scrollTo', 0);
    });

    $('#button2').click(function() {
      $table.bootstrapTable('scrollTo', 'bottom');
    });
  });
})(jQuery);
