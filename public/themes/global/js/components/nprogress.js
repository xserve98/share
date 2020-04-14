/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function(window, document, $) {
  'use strict';

  $.components.register('nprogress', {
    mode: 'init',
    defaults: {
      minimum: 0.15,
      trickleRate: 0.07,
      trickleSpeed: 360,
      showSpinner: false,
      template:
        '<div class="bar" role="bar"></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    },
    init: function(context) {
      var NProgress = context && context.NProgress ? context.NProgress : window.NProgress;

      if (typeof NProgress === 'undefined') {
        return;
      }

      NProgress.configure(this.defaults);
    }
  });
})(window, document, jQuery);
