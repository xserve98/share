/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function(window, document, $) {
  'use strict';

  $.components.register('taskList', {
    mode: 'api',
    api: function(context) {
      var frame$ = context ? context.$ : $;

      frame$(context.document).on('change.site.task', '[data-role="task"]', function() {
        var $item = frame$(this);
        var $checkbox = $item.find('[type="checkbox"]');

        if ($checkbox.is(':checked')) {
          $item.addClass('task-done');
        } else {
          $item.removeClass('task-done');
        }
      });

      frame$('[data-role="task"]').trigger('change.site.task');
    }
  });
})(window, document, jQuery);
