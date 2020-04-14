/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function(window, document, $) {
  'use strict';

  $.components.register('highlight', {
    mode: 'init',
    defaults: {},
    init: function(context) {
      var hljs = context && context.hljs ? context.hljs : window.hljs;

      if (typeof hljs === 'undefined') {
        return;
      }

      context.$('[data-plugin="highlight"]').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }
  });
})(window, document, jQuery);
