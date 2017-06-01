"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getScrollbarWidth = function () {
  var html = document.getElementsByTagName("html")[0];
  var body = document.body;

  var withScroll = body.offsetWidth;
  var scrollWidth = void 0;

  var getWidth = function getWidth() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        html.style.overflowY = "scroll";
      }, 1);

      setTimeout(function () {
        html.style.overflowY = "hidden";

        scrollWidth = body.offsetWidth - withScroll;

        resolve(scrollWidth);
      }, 2);

      setTimeout(function () {
        html.style.overflowY = "";
      }, 3);
    });
  };

  return function () {
    return new Promise(function (resolve) {
      withScroll = body.offsetWidth;

      if (scrollWidth) {
        setTimeout(function () {
          resolve(scrollWidth);
        }, 1);
      } else {
        getWidth().then(function (width) {
          resolve(width);
        });
      }
    });
  };
}();

exports.default = getScrollbarWidth;