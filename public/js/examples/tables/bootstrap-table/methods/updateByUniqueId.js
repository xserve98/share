/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function($) {
  /* eslint no-bitwise: ["error", { "allow": ["~"] }] */

  $(function() {
    $('#button').click(function() {
      var randomId = 100 + ~~(Math.random() * 100);
      // 根据uniqueId更新表格信息
      $('#table').bootstrapTable('updateByUniqueId', {
        id: 3,
        row: {
          name: '条目 ' + randomId,
          price: '￥' + randomId
        }
      });
    });
  });
})(jQuery);
