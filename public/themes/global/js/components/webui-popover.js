/**
 * Admui-iframe v2.1.0 (http://www.admui.com/)
 * Copyright 2015-2019 Admui Team
 * Licensed under the Admui License 1.1 (http://www.admui.com/about/license)
 */
(function(window, document, $){
    "use strict";

    $.components.register("webuiPopover", {
        mode: "default",
        defaults: {
            trigger: "click",
            width: 320,
            multi: true,
            cloaseable: false,
            style: "",
            delay: 300,
            padding: true
        }
    });
})(window, document, jQuery);