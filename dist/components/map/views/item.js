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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Items on the map, or in the sidebar
 * @type {*|Function}x
 */
var ItemView = function (_React$Component) {
  _inherits(ItemView, _React$Component);

  function ItemView() {
    _classCallCheck(this, ItemView);

    return _possibleConstructorReturn(this, (ItemView.__proto__ || Object.getPrototypeOf(ItemView)).apply(this, arguments));
  }

  _createClass(ItemView, [{
    key: "render",
    value: function render() {
      var item = this.props.item,
          title = item.title,
          classString = "place ",
          picClass = "place__pic",
          imgStyle = void 0;

      if (item.onMap) {
        classString += "pin";
        if (title.length > 23) {
          title = title.substr(0, 22) + "…";
        }
      } else {
        classString += "list";
        if (item.highlighted) {
          classString += " is-hovered";
        }
        if (title.length > 36) {
          title = title.substr(0, 35) + "…";
        }
      }
      if (item.geo.properties.thumbnail) {
        var imgSrc = item.geo.properties.thumbnail;
        imgStyle = { backgroundImage: "url(" + imgSrc + ")" };
      } else {
        // TODO: This will have to change when topics are correct
        var type = this.props.item.item_type === "Place" ? "sight" : "activity";
        picClass += " topic__image topic__image--" + type;
      }

      var subtitle = void 0;
      if (item.subtitle) {
        subtitle = _react2.default.createElement(
          "div",
          { className: "subtitle" },
          item.subtitle
        );
      }

      return _react2.default.createElement(
        "div",
        { className: classString, onMouseEnter: this.hoverItem.bind(this), onClick: this.clickItem.bind(this) },
        _react2.default.createElement("div", { className: "place__pointer" }),
        _react2.default.createElement("div", { className: picClass, style: imgStyle }),
        _react2.default.createElement(
          "div",
          { className: "place__marker" },
          item.i + 1
        ),
        _react2.default.createElement(
          "div",
          { className: "place__text" },
          _react2.default.createElement(
            "div",
            { className: "title" },
            title
          ),
          subtitle
        ),
        _react2.default.createElement(
          "div",
          { className: "place__icon" },
          _react2.default.createElement("i", { className: "icon icon-chevron-right", "aria-hidden": "true" })
        )
      );
    }
  }, {
    key: "clickItem",
    value: function clickItem() {
      var props = this.props;
      if (props.item.item_type === "Place") {
        _actions2.default.gotoPlace({ place: props.item.slug, placeTitle: props.item.title, breadcrumb: props.item.subtitle });
      } else {
        _actions2.default.poiOpen({ index: props.item.i, poi: props.item });
        _actions2.default.pinHover({ poiIndex: props.item.i });
      }
    }
  }, {
    key: "hoverItem",
    value: function hoverItem() {
      var props = this.props;
      _actions2.default.pinHover({ poiIndex: props.item.i });
    }
  }]);

  return ItemView;
}(_react2.default.Component);

exports.default = ItemView;