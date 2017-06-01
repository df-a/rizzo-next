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

var _state = require("../state");

var _state2 = _interopRequireDefault(_state);

var _tab_titles = require("../tab_titles");

var _tab_titles2 = _interopRequireDefault(_tab_titles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SidebarDropdown = function (_React$Component) {
  _inherits(SidebarDropdown, _React$Component);

  function SidebarDropdown(data) {
    _classCallCheck(this, SidebarDropdown);

    var _this = _possibleConstructorReturn(this, (SidebarDropdown.__proto__ || Object.getPrototypeOf(SidebarDropdown)).call(this, data));

    _this.state = _state2.default.getState();
    return _this;
  }

  _createClass(SidebarDropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!$(".is-selected").length) $(".tab__sub-nav__list--item:first-child").addClass("is-selected");
    }
  }, {
    key: "changeTopic",
    value: function changeTopic(event) {
      var topic = $(event.currentTarget).data("item");
      $(".tab__sub-nav__list--item").removeClass("is-selected");

      _actions2.default.gotoPlace({
        place: this.state.currentLocation.slug,
        topic: topic,
        breadcrumb: this.state.currentLocation.parent
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var menuClassString = "tab__sub-nav";

      var topics = this.state.topics.map(function (item) {
        var itemClassString = "tab__sub-nav__list--item";

        if (_this2.state.topicClicked === item) {
          itemClassString += " is-selected";
        }

        var title = _tab_titles2.default[item.toLowerCase()] || item;

        return _react2.default.createElement(
          "li",
          { className: itemClassString, "data-item": item, onClick: _this2.changeTopic.bind(_this2) },
          title
        );
      });

      if (this.props.tabDropdownOpen) {
        menuClassString += " is-visible";
      }

      return _react2.default.createElement(
        "div",
        { className: menuClassString },
        _react2.default.createElement(
          "ul",
          { className: "tab__sub-nav__list" },
          topics
        )
      );
    }
  }]);

  return SidebarDropdown;
}(_react2.default.Component);

exports.default = SidebarDropdown;