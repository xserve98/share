/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function($) {
  /* global toastr */

  $(function() {
    $('#button').click(function() {
      // 获取表格渲染数据
      toastr.info('详细信息请在控制台console打印信息中查看');
      console.log('getData: ', $('#table').bootstrapTable('getData'));
    });
  });
})(jQuery);
