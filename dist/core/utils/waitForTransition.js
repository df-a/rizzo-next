"use strict";

var onTransitionEndEventNames = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";
// const onAnimationEndEventName = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

var waitForTransition = function waitForTransition($el) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$fallbackTime = _ref.fallbackTime,
      fallbackTime = _ref$fallbackTime === undefined ? 10000 : _ref$fallbackTime;

  return new Promise(function (resolve) {

    var done = function done(e) {
      /*eslint no-use-before-define:0*/
      if (e && e.target !== $el.get(0)) {
        return;
      }

      resolve();

      $el.off(onTransitionEndEventNames, done);
      clearTimeout(fallBackTimer);
    };
    var fallBackTimer = setTimeout(done, fallbackTime);

    $el.on(onTransitionEndEventNames, done);
  });
};

module.exports = waitForTransition;