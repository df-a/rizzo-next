"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Preload images with jQuery
 * @example
 *   <img data-preload src="foo.jpg" />
 * @example
 *   <div data-preload="foo.jpg" style="background-image: url(foo.jpg)"></div>
 */
var $ImagePreloader = function $ImagePreloader(_ref) {
  var el = _ref.el;

  _classCallCheck(this, $ImagePreloader);

  var url = $(el).data("preload") || el.src;

  if (url) {
    new Image().src = url;
  }
};

$("[data-preload]").each(function (i, el) {
  return new $ImagePreloader({ el: el });
});