"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Alerts for the sidebar
 */
var AlertView = function (_React$Component) {
  _inherits(AlertView, _React$Component);

  function AlertView() {
    _classCallCheck(this, AlertView);

    return _possibleConstructorReturn(this, (AlertView.__proto__ || Object.getPrototypeOf(AlertView)).apply(this, arguments));
  }

  _createClass(AlertView, [{
    key: "render",
    value: function render() {
      var classString = "map-alert",
          message = "";

      if (this.props.error) {
        message = this.props.error.message;
        var type = this.props.error.type;
        classString += " active error" + type;
      }

      return _react2.default.createElement(
        "div",
        { className: classString },
        message
      );
    }
  }]);

  return AlertView;
}(_react2.default.Component);

exports.default = AlertView;