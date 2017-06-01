"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subscribe;

var _postal = require("postal/lib/postal.lodash");

var _postal2 = _interopRequireDefault(_postal);

var _each = require("lodash/each");

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = { each: _each2.default };

function addSubscribeMethod(target) {
  var subscriptions = void 0;
  if (!(subscriptions = target.constructor.subscriptions)) {
    return;
  }

  target.subscribe = function () {
    var _this = this;

    var subscriptionInstances = [];

    _.each(subscriptions, function (topic) {
      _.each(topic, function (sub) {
        var subDef = void 0;
        subscriptionInstances.push(subDef = _postal2.default.channel(sub.channel).subscribe(sub.topic, function (data, env) {
          // Call the callback and also pass the sub definition
          this[sub.callback].apply(this, [data, env, subDef]);
        }).context(_this));
      });
    });

    this["_subscriptions"] = subscriptionInstances;
  };

  return;
}

/**
 * Decorator for listening on an event bus (postal).
 * Will search the class for a `channel`, or use `/` by default.
 * **NOTE:** You have to call `this.subscribe()` in the constructor in order to have postal actually attatch the listeners correctly.
 * @function
 * @param  {String} topic Topic to listen for
 * @param  {String} channel The channel to listen on
 * @example <caption>Default Channel</caption>
 * import publish from "path/to/core/decorators/publish"
 *
 * class FooComponent () {
 *   constructor() {
 *     // This is required
 *     this.subscribe();
 *   }
 *   @subscribe("foo.some.message")
 *   someMethod(data, evnelope, subscription) {
 *
 *   }
 *   @subscribe("foo.some.other")
 *   anotherMethod(data, evnelope, subscription) {
 *     // ...
 *   }
 * }
 * @example <caption>Custom Channel</caption>
 * import publish from "path/to/core/decorators/publish"
 *
 * class FooComponent () {
 *   constructor() {
 *     // This is required
 *     this.subscribe();
 *   }
 *   @subscribe("foo.some.message", "custom")
 *   someMethod(data, envelope, subscription) {
 *     // ...
 *   }
 * }
 * @example <caption>Channel decorator</caption>
 * import publish from "path/to/core/decorators/publish";
 * import channel from "path/to/core/decorators/channel"
 *
 * class FooComponent () {
 *   constructor() {
 *     // This is required
 *     this.subscribe();
 *   }
 *   @subscribe("foo.some.message")
 *   @channel("custom")
 *   someMethod(data, envelope, subscription) {
 *     // ...
 *   }
 * }
 */
function subscribe(topic, channel) {
  return function (target, name) {
    var ctor = target.constructor;
    ctor.subscriptions = ctor.subscriptions || {};
    var subs = ctor.subscriptions[topic] = ctor.subscriptions[topic] || [];

    subs.push({ topic: topic, channel: channel || target.channel || "/", callback: name });

    if (!target.subscribe) {
      addSubscribeMethod(target);
    }
  };
}