"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _postal = require("postal/lib/postal.lodash");

var _postal2 = _interopRequireDefault(_postal);

var _rizzo_events = require("./rizzo_events");

var _rizzo_events2 = _interopRequireDefault(_rizzo_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Rizzo thing
 */
var Rizzo = function () {
  function Rizzo(_ref) {
    var registry = _ref.registry,
        logger = _ref.logger,
        perf = _ref.perf;

    _classCallCheck(this, Rizzo);

    this.registry = registry;
    this.logger = logger;
    this.perf = perf;
    this.events = _rizzo_events2.default;
  }
  /**
   * Render a component
   * @param  {Component} Component The component to register
   * @param  {Object} options Options to pass into instance creation
   * @return {Object} Instance of the component
   * @example
   * rizzo.renderComponent(MastheadComponent, {});
   * 
   */


  _createClass(Rizzo, [{
    key: "renderComponent",
    value: function renderComponent(Component) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof options === "string") {
        options = {
          el: options
        };
      }

      var instance = this.registry.createInstanceOf(Component, options);

      return instance;
    }
    /**
     * Mark a rizzo event
     */

  }, {
    key: "event",
    value: function event(name, data) {
      _postal2.default.channel("events").publish(name, data);
    }
  }]);

  return Rizzo;
}();

exports.default = Rizzo;