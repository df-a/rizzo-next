"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trackEvent;

var _analytics = require("./trackers/analytics");

var _analytics2 = _interopRequireDefault(_analytics);

var _flamsteed = require("./trackers/flamsteed");

var _flamsteed2 = _interopRequireDefault(_flamsteed);

var _postal = require("postal/lib/postal.lodash");

var _postal2 = _interopRequireDefault(_postal);

var _rizzo = require("../../rizzo");

var _rizzo2 = _interopRequireDefault(_rizzo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TRACKERS = { analytics: _analytics2.default, flamsteed: _flamsteed2.default };
var TRACKING_CHANNEL = "tracking";

/**
 * Abstraction over tracking services such as Flamsteed and Google Analytics
 * @param  {Object} options
 * @param  {String} options.name The name of the event
 * @param  {String|Object} options.data Details of the event
 * @param  {Array} [options.trackers] An array of string names of trackers to use.
 */
function trackEvent() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      name = _ref.name,
      data = _ref.data,
      _ref$trackers = _ref.trackers,
      trackers = _ref$trackers === undefined ? ["flamsteed", "analytics"] : _ref$trackers;

  trackers.map(function (tracker) {
    try {
      return {
        result: TRACKERS[tracker]({
          name: name, data: data
        }),
        tracker: tracker
      };
    } catch (e) {
      _rizzo2.default.logger.log(e);
      return false;
    }
  }).forEach(function (_ref2) {
    var result = _ref2.result,
        tracker = _ref2.tracker;
    return result !== false && _postal2.default.channel(TRACKING_CHANNEL).publish("event." + tracker + ".tracked", {
      name: name, data: data
    });
  });
}