/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function($) {
  $(function() {
    $('#button').click(function() {
      // 根据uniqueId删除元素
      $('#table').bootstrapTable('removeByUniqueId', 1);
    });
  });
})(jQuery);
