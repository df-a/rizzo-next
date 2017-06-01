"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _desc, _value, _class;

var _subscribe = require("./decorators/subscribe");

var _subscribe2 = _interopRequireDefault(_subscribe);

var _channel = require("./decorators/channel");

var _channel2 = _interopRequireDefault(_channel);

var _rizzo_events = require("./rizzo_events");

var _rizzo_events2 = _interopRequireDefault(_rizzo_events);

var _perf = require("./utils/perf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * Records some performance data about our component rendering.
 */
var PerfMonitor = (_dec = (0, _subscribe2.default)(_rizzo_events2.default.LOAD_CRITICAL), _dec2 = (0, _channel2.default)("events"), _dec3 = (0, _subscribe2.default)(_rizzo_events2.default.LOAD_BELOW), (_class = function () {
  _createClass(PerfMonitor, [{
    key: "loadCritical",
    get: function get() {
      return "mark_" + _rizzo_events2.default.LOAD_CRITICAL;
    }
  }, {
    key: "loadBelow",
    get: function get() {
      return "mark_" + _rizzo_events2.default.LOAD_BELOW;
    }
  }]);

  function PerfMonitor() {
    _classCallCheck(this, PerfMonitor);
  }
  // Disabling for now to see if webpagetest works without them
  // this.subscribe();

  /**
   * Listens for when our critical code is loaded and creates a perf mark
   */


  _createClass(PerfMonitor, [{
    key: "loadCritical",
    value: function loadCritical() {
      (0, _perf.mark)(this.loadCritical);
    }
    /**
     * Listens for when our below the fold code is loaded and creates a perf mark
     */

  }, {
    key: "loadBelow",
    value: function loadBelow() {
      (0, _perf.mark)(this.loadBelow);

      (0, _perf.measure)("mark_critical_to_below", this.loadCritical, this.loadBelow);
      (0, _perf.measure)("mark_critical", "domContentLoadedEventEnd", this.loadCritical);
    }
  }]);

  return PerfMonitor;
}(), (_applyDecoratedDescriptor(_class.prototype, "loadCritical", [_dec, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "loadCritical"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loadBelow", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "loadBelow"), _class.prototype)), _class));
exports.default = PerfMonitor;