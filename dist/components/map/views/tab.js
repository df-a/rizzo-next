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

var _sidebarDropdown = require("./sidebar-dropdown.jsx");

var _sidebarDropdown2 = _interopRequireDefault(_sidebarDropdown);

var _tab_titles = require("../tab_titles");

var _tab_titles2 = _interopRequireDefault(_tab_titles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Tabs for the sidebar view
 */
var TabView = function (_React$Component) {
  _inherits(TabView, _React$Component);

  function TabView(props) {
    _classCallCheck(this, TabView);

    var _this = _possibleConstructorReturn(this, (TabView.__proto__ || Object.getPrototypeOf(TabView)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TabView, [{
    key: "render",
    value: function render() {
      var title = _tab_titles2.default[this.props.name.toLowerCase()] || this.props.name,
          sidebarDropdown = "",
          isActive = this.props.active ? "tab active" : "tab",
          classString = "" + isActive,
          iconAfter = "";

      if (this.props.showDropdown) {
        classString += " experiences";
        sidebarDropdown = _react2.default.createElement(_sidebarDropdown2.default, { tabDropdownOpen: this.state.openDropdown });
        iconAfter = "tab__icon icon--chevron-down icon--white";
      }

      return _react2.default.createElement(
        "li",
        { className: classString, onClick: this.tabClick.bind(this), onMouseEnter: this.showSubmenu.bind(this), onMouseLeave: this.hideSubmenu.bind(this) },
        title,
        _react2.default.createElement("i", { className: iconAfter, "aria-hidden": "true" }),
        sidebarDropdown
      );
    }
  }, {
    key: "tabClick",
    value: function tabClick() {
      var props = this.props;
      if (props.customPanel) {
        _actions2.default.customPanel({ panel: props.customPanel, view: props.i });
      } else {
        _actions2.default.viewChange({ view: props.i });
      }
    }
  }, {
    key: "showSubmenu",
    value: function showSubmenu() {
      var _this2 = this;

      clearTimeout(this.hideTimer);

      this.showTimer = setTimeout(function () {
        _this2.setState({ openDropdown: true });
      }, 0);
    }
  }, {
    key: "hideSubmenu",
    value: function hideSubmenu() {
      var _this3 = this;

      clearTimeout(this.showTimer);

      this.hideTimer = setTimeout(function () {
        _this3.setState({ openDropdown: false });
      }, 250);
    }
  }]);

  return TabView;
}(_react2.default.Component);

exports.default = TabView;


module.exports = TabView;