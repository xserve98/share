/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function(window, document, $){
    "use strict";

    $.components.register("owlCarousel", {
        mode: "default",
        defaults: {
            loop: true,
            nav: true,
            dots: false,
            dotsClass: "owl-dots owl-dots-fall",
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                }
            }
        }
    });
})(window, document, jQuery);