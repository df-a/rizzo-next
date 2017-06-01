"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _tab = require("./tab.jsx");

var _tab2 = _interopRequireDefault(_tab);

var _panel = require("./panel.jsx");

var _panel2 = _interopRequireDefault(_panel);

var _actions = require("../actions");

var _actions2 = _interopRequireDefault(_actions);

var _aboutPanel = require("./about-panel.jsx");

var _aboutPanel2 = _interopRequireDefault(_aboutPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sidebar view that sets up main tabs
 */
var SidebarView = function (_React$Component) {
  _inherits(SidebarView, _React$Component);

  function SidebarView() {
    _classCallCheck(this, SidebarView);

    return _possibleConstructorReturn(this, (SidebarView.__proto__ || Object.getPrototypeOf(SidebarView)).apply(this, arguments));
  }

  _createClass(SidebarView, [{
    key: "render",
    value: function render() {
      var location = this.props.location,
          activeSetIndex = this.props.activeSetIndex,
          panelContent = void 0,
          tabCount = 0,
          sets = this.props.sets,
          backSlug = "",
          backElement = "",
          h1Class = "sidebar__title __continent",
          footer = void 0,

      // TODO Switch back to just ${this.props.location.slug} once this is live
      slug = "https://www.lonelyplanet.com/" + this.props.location.slug;

      var tabs = sets.map(function (set, i) {
        tabCount++;
        var isActive = i === activeSetIndex ? true : false,
            isCity = location.type.toLowerCase() === "city",
            showDropdown = isCity && tabCount === 1;

        return _react2.default.createElement(_tab2.default, { sets: sets, showDropdown: showDropdown, name: set.title, active: isActive, i: i, type: set.type });
      });

      if (location.description && location.description.length > 0) {
        tabCount++;
        var dropdownOpen = this.props.tabDropdownOpen,
            isActive = tabCount === 1 || tabCount === activeSetIndex ? true : false,
            aboutTab = _react2.default.createElement(_tab2.default, { name: "About", active: isActive, i: tabCount, customPanel: "about", tabDropdownOpen: dropdownOpen });
        tabs.push(aboutTab);
      }

      if (this.props.sets.length < 1) {
        panelContent = _react2.default.createElement("div", { className: "no-content", dangerouslySetInnerHTML: { __html: location.description } });
      } else {
        if (this.props.customPanel === "about") {
          panelContent = _react2.default.createElement(_aboutPanel2.default, { location: location });
          footer = _react2.default.createElement(
            "footer",
            { className: "panel__footer monkey" },
            _react2.default.createElement(
              "a",
              { className: "panel__close", href: slug },
              "Close map and explore this destination",
              _react2.default.createElement("i", { className: "icon-chevron-right", "aria-hidden": "true" })
            )
          );
        } else {
          var activePanel = sets[this.props.activeSetIndex];
          panelContent = _react2.default.createElement(_panel2.default, { highlightedPoi: this.props.highlightedPoi, set: activePanel });
        }
      }

      if (location.parent_slug && location.parent_slug !== location.slug) {
        backSlug = "/" + location.parent_slug;
        backElement = _react2.default.createElement(
          "a",
          { href: backSlug, className: "location-subtitle", onClick: this.parentClick.bind(this) },
          _react2.default.createElement("i", { className: "icon icon-chevron-left", "aria-hidden": "true" }),
          location.parent
        );
        h1Class = "sidebar__title";
      }

      return _react2.default.createElement(
        "div",
        { className: "sidebar" },
        _react2.default.createElement(
          "header",
          { className: "sidebar__header" },
          backElement,
          _react2.default.createElement(
            "h1",
            { className: h1Class },
            location.title
          ),
          _react2.default.createElement(
            "ul",
            { className: "sidebar__tabs" },
            tabs
          )
        ),
        panelContent,
        footer
      );
    }
  }, {
    key: "parentClick",
    value: function parentClick(e) {
      e.preventDefault();
      var props = this.props;
      _actions2.default.gotoPlace({ place: props.location.parent_slug, placeTitle: props.location.parent });
    }
  }]);

  return SidebarView;
}(_react2.default.Component);

exports.default = SidebarView;