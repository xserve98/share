/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function($) {
  /* eslint no-bitwise: ["error", { "allow": ["~"] }] */
  // 获取随机数据
  function randomData() {
    var startId = ~~(Math.random() * 100);
    var rows = [];
    var i = 0;

    for (; i < 10; i++) {
      rows.push({
        id: startId + i,
        name: 'test' + (startId + i),
        price: '$' + (startId + i)
      });
    }
    return rows;
  }

  $(function() {
    var $table = $('#table');

    $('#button').click(function() {
      // 给表格添加随便数据
      $table.bootstrapTable('append', randomData()).bootstrapTable('scrollTo', 'bottom');
    });
  });
})(jQuery);
