/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function(window, document, $) {
  'use strict';

  /* global toastr */

  var ctx = $.configs.ctx;

  $(function() {
    // 验证密码是否有效
    $.validator.addMethod(
      'validPwd',
      function(value) {
        var result = false;

        $.ajax({
          url: ctx + '/user/checkpassword',
          type: 'POST',
          data: JSON.stringify({oldPassword: value}),
          dataType: 'JSON',
          contentType: 'application/json',
          async: false,
          success: function(res) {
            result = res.success;
          },
          error: function() {
            toastr.error('服务器异常，请配合后端程序使用');
          }
        });

        return result;
      },
      '请填写正确的密码'
    );

    // 密码修改表单验证等相关操作
    $('#accountMsg').validate({
      rules: {
        oldPwd: {
          required: true,
          validPwd: true
        },
        newPwd: {
          required: true,
          minlength: 6,
          maxlength: 30
        },
        confirm: {
          required: true,
          equalTo: '#newPwd'
        }
      },
      messages: {
        oldPwd: {
          required: '密码不能为空'
        },
        newPwd: {
          required: '密码不能为空',
          minlength: '密码必须大于等于6个字符',
          maxlength: '密码必须小于等于30个字符'
        },
        confirm: {
          required: '确认密码不能为空',
          equalTo: '确认密码必须和密码保持一致'
        }
      },
      submitHandler: function(form) {
        var oldPwd = $(form)
          .find('[name="oldPwd"]')
          .val();
        var newPwd = $(form)
          .find('[name="newPwd"]')
          .val();
        var confirmPwd = $(form)
          .find('[name="confirm"]')
          .val();
        $.ajax({
          url: ctx + '/user/changepassword',
          type: 'POST',
          data: JSON.stringify({oldPassword: oldPwd, newPassword: newPwd, repPassword: confirmPwd}),
          dataType: 'JSON',
          contentType: 'application/json',
          success: function(res) {
            var time = 5;
            var timer;

            if (res.success) {
              window.top.layer.alert(
                '<p id="modifyPwd"><span>' + time + '</span>秒后将自动跳转到登录页面</p>'
              );

              timer = setInterval(function() {
                time -= 1;
                $('#modifyPwd span').text(time);
                if (time === 0) {
                  clearTimeout(timer);
                  window.parent.location.href = '/logout';
                }
              }, 1000);
            } else {
              toastr.error(res.msg);
            }
          },
          error: function() {
            toastr.error('服务器异常，请稍后再试！');
          }
        });
      }
    });
  });
})(window, document, jQuery);
