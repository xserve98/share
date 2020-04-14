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

      // 新增行
      $('#table').bootstrapTable('insertRow', {
        index: 1,
        row: {
          id: randomId,
          name: '条目 ' + randomId,
          price: '$' + randomId
        }
      });
    });
  });
})(jQuery);
