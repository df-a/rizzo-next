"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _slideshow = require("../../slideshow");

var _slideshow2 = _interopRequireDefault(_slideshow);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AboutPanel = function (_React$Component) {
  _inherits(AboutPanel, _React$Component);

  function AboutPanel() {
    _classCallCheck(this, AboutPanel);

    return _possibleConstructorReturn(this, (AboutPanel.__proto__ || Object.getPrototypeOf(AboutPanel)).apply(this, arguments));
  }

  _createClass(AboutPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.location.images.length) {
        this.slideshow = new _slideshow2.default({
          el: this.$slideshow,
          type: "fade",
          images: this.props.location.images,
          height: 270,
          showProgress: true
        });
      }

      this.$slideshow.remove();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var place = this.props.location.title;
      var description = this.props.location.description;

      return _react2.default.createElement(
        "div",
        { className: "panel" },
        _react2.default.createElement("div", { className: "slideshow js-panel-slideshow", ref: function ref(node) {
            return _this2.$slideshow = (0, _jquery2.default)(node);
          } }),
        _react2.default.createElement(
          "header",
          { className: "panel__header" },
          "Welcome to ",
          place
        ),
        _react2.default.createElement("div", { className: "panel__content", dangerouslySetInnerHTML: { __html: description } })
      );
    }
  }]);

  return AboutPanel;
}(_react2.default.Component);

exports.default = AboutPanel;