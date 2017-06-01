"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _actions = require("../actions");

var _actions2 = _interopRequireDefault(_actions);

var _clamp = require("clamp-js/clamp.js");

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SidebarDetailsView = function (_React$Component) {
  _inherits(SidebarDetailsView, _React$Component);

  function SidebarDetailsView() {
    _classCallCheck(this, SidebarDetailsView);

    return _possibleConstructorReturn(this, (SidebarDetailsView.__proto__ || Object.getPrototypeOf(SidebarDetailsView)).apply(this, arguments));
  }

  _createClass(SidebarDetailsView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var el = this.refs.poiTitle.getDOMNode();

      (0, _clamp2.default)(el, { clamp: 2 });
    }
  }, {
    key: "render",
    value: function render() {
      var poi = this.props.poi,
          image = "",

      // TODO Switch back to just ${poi.slug} once this is live
      slug = "https://www.lonelyplanet.com/" + poi.slug;

      if (poi.geo.properties.image) {
        var imgSrc = poi.geo.properties.image;
        image = _react2.default.createElement(
          "div",
          { className: "details__image" },
          _react2.default.createElement("img", { src: imgSrc, ref: "img" })
        );
      }

      var footer = _react2.default.createElement(
        "div",
        { className: "panel__footer dooda" },
        _react2.default.createElement(
          "a",
          { className: "panel__close", href: slug },
          "Close map and explore this destination",
          _react2.default.createElement("span", { className: "icon-chevron-right" })
        )
      );

      return _react2.default.createElement(
        "div",
        { className: "sidebar details" },
        _react2.default.createElement(
          "header",
          { className: "sidebar__header" },
          _react2.default.createElement(
            "a",
            { href: "#", className: "close-poi location-subtitle", onClick: this.closePOI },
            _react2.default.createElement("i", { className: "icon icon-chevron-left", "aria-hidden": "true" }),
            "Back"
          ),
          _react2.default.createElement(
            "h1",
            { ref: "poiTitle", className: "sidebar__title" },
            poi.title
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "panel" },
          image,
          _react2.default.createElement("div", { className: "panel__content", dangerouslySetInnerHTML: { __html: poi.description } })
        ),
        footer
      );
    }
  }, {
    key: "closePOI",
    value: function closePOI(e) {
      e.preventDefault();
      _actions2.default.poiClose();
    }
  }]);

  return SidebarDetailsView;
}(_react2.default.Component);

exports.default = SidebarDetailsView;