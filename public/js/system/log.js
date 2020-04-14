/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function(document, window, $) {
  'use strict';

  /* global moment, toastr */

  $(function() {
    var oTable;
    var $filterDate = $('#filter-date');
    var $filterForm = $('#logForm');

    // 表格初始化
    oTable = $('.dataTable').DataTable(
      $.concatCpt('dataTable', {
        autoWidth: false,
        processing: true,
        serverSide: true,
        searching: false,
        pagingType: 'simple_numbers',
        columns: [
          {data: 'url'},
          {data: 'type'},
          {data: 'params'},
          {data: 'createUserName'},
          {data: 'operateIp'},
          {data: 'createDate'}
        ],
        ajax: function(data, callback) {
          $.ajax({
            url: $.configs.ctx + '/public/data/system/log/logs.json',
            cache: false,
            dataType: 'JSON',
            data: $.extend(
              {},
              {data: $filterForm.serializeObject()},
              {
                pageIndex: data.start + 1,
                sortField: data.order[0].column,
                sortType: data.order[0].dir,
                pageSize: data.length
              }
            ),
            success: function(res) {
              callback({
                recordsTotal: res.total,
                recordsFiltered: res.total,
                data: res.pageList
              });
            },
            error: function(err) {
              toastr.error(err);
            }
          });
        }
      })
    );

    // 有日期筛选按钮时 --- 日志信息页面
    if ($filterDate.length > 0) {
      // 日期范围选择器初始化
      $filterDate.daterangepicker(
        $.concatCpt('daterangepicker', {
          maxDate: new Date(),
          ranges: {
            今天: [moment(), moment()],
            昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            最近7天: [moment().subtract(6, 'days'), moment()],
            最近30天: [moment().subtract(29, 'days'), moment()],
            本月: [moment().startOf('month'), moment().endOf('month')],
            上月: [
              moment()
                .subtract(1, 'month')
                .startOf('month'),
              moment()
                .subtract(1, 'month')
                .endOf('month')
            ]
          }
        }),
        function(start, end) {
          $('[name="startDate"]').val(start.format('YYYY-MM-DD'));
          $('[name="endDate"]').val(end.format('YYYY-MM-DD'));
        }
      );

      // 提交日志筛选表单
      $filterForm.on('submit', function() {
        // 重载表格数据
        oTable.ajax.reload();

        return false;
      });

      // 删除选择时间
      $('.date-clear').on('click', function() {
        $filterForm.find('input').val('');
      });
    } else {
      // 切换到日志选项卡时重绘表格 --- 账户信息页面
      $('[href="#log"]').on('shown.bs.tab', function() {
        oTable.draw();
      });
    }
  });
})(document, window, jQuery);
