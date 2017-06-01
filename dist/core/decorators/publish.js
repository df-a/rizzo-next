"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = publish;

var _postal = require("postal/lib/postal.lodash");

var _postal2 = _interopRequireDefault(_postal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Decorator for publishing on an event bus (postal).
 * Whatever the decorated function returns gets published as the data.
 * Will search the class for a `channel`, or use `/` by default.
 * @function
 * @param  {String} topic Topic to publish on
 * @param  {String} channel Channel to publish on
 * @example
 * import "publish" from "path/to/core/decorators/publish"
 * 
 * class FooComponent () {
 *   @publish("foo.some.message")
 *   someMethod() {
 *     return {
 *       my: "data"
 *     };
 *   }
 *   @publish("foo.some.other")
 *   anotherMethod() {
 *     // ...
 *   }
 * }
 */
function publish(topic, channel) {
  return function (target, name, descriptor) {
    var fn = descriptor.value;

    descriptor.value = function () {
      var value = fn.apply(this, arguments);
      _postal2.default.channel(channel || this.channel || "/").publish(topic, value);
      return value;
    };
  };
}