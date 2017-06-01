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
 * Shows when items are being fetched
 */
var SidebarFetchingView = function (_React$Component) {
  _inherits(SidebarFetchingView, _React$Component);

  function SidebarFetchingView() {
    _classCallCheck(this, SidebarFetchingView);

    return _possibleConstructorReturn(this, (SidebarFetchingView.__proto__ || Object.getPrototypeOf(SidebarFetchingView)).apply(this, arguments));
  }

  _createClass(SidebarFetchingView, [{
    key: "render",
    value: function render() {
      var location = this.props.location,
          breadcrumb = this.props.breadcrumb,
          crumbText = breadcrumb || location.grandparent,
          placeText = this.props.place || location.title;

      var backElement = crumbText ? _react2.default.createElement(
        "div",
        { className: "location-subtitle" },
        _react2.default.createElement("i", { className: "icon icon-chevron-left", "aria-hidden": "true" }),
        crumbText
      ) : "";

      return _react2.default.createElement(
        "div",
        { className: "sidebar fetching" },
        _react2.default.createElement(
          "header",
          { className: "sidebar__header" },
          _react2.default.createElement(
            "div",
            { className: "location-subtitle" },
            backElement
          ),
          _react2.default.createElement(
            "h1",
            { className: "sidebar__title" },
            placeText
          ),
          _react2.default.createElement("div", { className: "sidebar__tabs" })
        ),
        _react2.default.createElement(
          "div",
          { className: "panel" },
          _react2.default.createElement("div", { className: "spinner" })
        )
      );
    }
  }]);

  return SidebarFetchingView;
}(_react2.default.Component);

exports.default = SidebarFetchingView;