/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function(document, window, $) {
  'use strict';

  /* global bootbox */

  window.App.extend({
    handleSelective: function() {
      var members = [
        {
          id: 'uid_1',
          name: '孙继红',
          img: '/public/images/portraits/1.jpg'
        },
        {
          id: 'uid_2',
          name: '张倩',
          img: '/public/images/portraits/2.jpg'
        },
        {
          id: 'uid_3',
          name: '孙咏梅',
          img: '/public/images/portraits/3.jpg'
        },
        {
          id: 'uid_4',
          name: '冉佩利',
          img: '/public/images/portraits/4.jpg'
        }
      ];
      var selected = [
        {
          id: 'uid_1',
          name: '柳映秋',
          img: '/public/images/portraits/1.jpg'
        },
        {
          id: 'uid_2',
          name: '周伊娅',
          img: '/public/images/portraits/2.jpg'
        }
      ];

      // 人员选择初始化
      $('#jquery-selective').selective({
        namespace: 'addMember',
        local: members,
        selected: selected,
        buildFromHtml: false,
        tpl: {
          optionValue: function(data) {
            return data.id;
          },
          frame: function() {
            return (
              '<div class="' +
              this.namespace +
              '">' +
              this.options.tpl.items.call(this) +
              '<div class="' +
              this.namespace +
              '-trigger">' +
              this.options.tpl.triggerButton.call(this) +
              '<div class="' +
              this.namespace +
              '-trigger-dropdown">' +
              this.options.tpl.list.call(this) +
              '</div>' +
              '</div>' +
              '</div>'
            );
          },
          triggerButton: function() {
            return (
              '<div class="' + this.namespace + '-trigger-button"><i class="wb-plus"></i></div>'
            );
          },
          listItem: function(data) {
            return (
              '<li class="' +
              this.namespace +
              '-list-item"><img class="avatar" src="' +
              data.img +
              '">' +
              data.name +
              '</li>'
            );
          },
          item: function(data) {
            return (
              '<li class="' +
              this.namespace +
              '-item"><img class="avatar" src="' +
              data.img +
              '">' +
              this.options.tpl.itemRemove.call(this) +
              '</li>'
            );
          },
          itemRemove: function() {
            return (
              '<span class="' + this.namespace + '-remove"><i class="wb-minus-circle"></i></span>'
            );
          },
          option: function(data) {
            return (
              '<option value="' +
              this.options.tpl.optionValue.call(this, data) +
              '">' +
              data.name +
              '</option>'
            );
          }
        }
      });
    },

    handleProject: function() {
      // 删除当前项
      $(document).on('click', '[data-tag="project-delete"]', function() {
        bootbox.setDefaults($.concatCpt('bootbox'));
        bootbox.dialog({
          message: '您确定要删除这个项目吗？',
          buttons: {
            success: {
              label: '删除',
              className: 'btn-danger',
              callback: function() {
                // $(e.target).closest('.list-group-item').remove();
              }
            }
          }
        });
      });
    },

    run: function() {
      this.handleSelective();
      this.handleProject();
    }
  });

  $(function() {
    window.App.run();
  });
})(document, window, jQuery);
