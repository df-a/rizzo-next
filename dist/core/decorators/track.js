"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _track_event = require("../events/track_event");

var _track_event2 = _interopRequireDefault(_track_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use when you need to track a method call w/ the `trackEvent` utility.
 * The value returned will be passed as `data` to `trackEvent`.
 * If a function is used for the `trackingFn`, it must return an object w/ a `name`, and optional `data`
 * @param  {Function|String} trackingFn Either a function to build up the event data or a string event name.
 * @param  {Object} [options] An opject of options
 * @param  {Boolean} [options.sendReturnValue] Whether or not to send the return value as data
 * @return {Function} The decorator function
 * @example <caption>String Tracking</caption>
 *
 * class Foo {
 *   @track("Button Clicked")
 *   buttonClicked() {
 *     // ...
 *     return { some: "data" };
 *   }
 * }
 * @example <caption>Function</caption>
 *
 * import FooTracker from "./foo.tracker";
 * 
 * class Foo {
 *   @track(FooTracker.clicked)
 *   buttonClicked() {
 *     // ...
 *     return { some: "data" };
 *   }
 * }
 *
 * // foo.tracker.js
 *
 * export default function clicked(data) {
 *   // data = { some: "data" } 
 *   data.otherData = "other data";
 *   
 *   return { 
 *     name: "Button Clicked",
 *     data
 *   };
 * }
 * @example <caption>String Tracking w/ sendReturnValue false</caption>
 *
 * class Foo {
 *   @track("Button Clicked").sendReturnValue(false)
 *   buttonClicked() {
 *     // ...
 *     return { some: "data" };
 *   }
 * }
 */
function track(trackingFn) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { sendReturnValue: true };

  var decorator = function decorator(target, name, descriptor) {
    var hasDescriptor = typeof descriptor.value !== "undefined";
    var fn = hasDescriptor ? descriptor.value : target;

    function trackDecorator() {
      var fnReturnValue = fn.apply(this, arguments),
          value = null;

      if (options.sendReturnValue) {
        value = fnReturnValue;
      }

      (0, _track_event2.default)(typeof trackingFn === "string" ? Object.assign({ name: trackingFn, data: value }, options) : trackingFn.apply(this, [value]));

      return fnReturnValue;
    };

    if (hasDescriptor) {
      descriptor.value = trackDecorator;
    } else {
      target = trackDecorator;
    }
  };

  decorator.sendReturnValue = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    options.sendReturnValue = !!value;
    return this;
  };

  return decorator;
}

exports.default = track;