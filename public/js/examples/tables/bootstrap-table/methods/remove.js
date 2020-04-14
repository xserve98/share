/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function($) {
  $(function() {
    var $table = $('#table');

    $('#button').click(function() {
      var ids = $.map($table.bootstrapTable('getSelections'), function(row) {
        return row.id;
      });

      // 根据下列参数删除表格元素
      $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
      });
    });
  });
})(jQuery);
