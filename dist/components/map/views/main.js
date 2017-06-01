"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _sidebar = require("./sidebar.jsx");

var _sidebar2 = _interopRequireDefault(_sidebar);

var _sidebarFetching = require("./sidebar-fetching.jsx");

var _sidebarFetching2 = _interopRequireDefault(_sidebarFetching);

var _sidebarDetails = require("./sidebar-details.jsx");

var _sidebarDetails2 = _interopRequireDefault(_sidebarDetails);

var _map = require("./map.jsx");

var _map2 = _interopRequireDefault(_map);

var _alert = require("./alert.jsx");

var _alert2 = _interopRequireDefault(_alert);

var _state = require("../state");

var _state2 = _interopRequireDefault(_state);

var _actions = require("../actions");

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getMapState = function getMapState() {
  return _state2.default.getState();
};

/**
 * Controls the sidebar views, and the map
 */

var MainView = function (_React$Component) {
  _inherits(MainView, _React$Component);

  function MainView(props) {
    _classCallCheck(this, MainView);

    var _this = _possibleConstructorReturn(this, (MainView.__proto__ || Object.getPrototypeOf(MainView)).call(this, props));

    _this.state = getMapState();
    return _this;
  }

  _createClass(MainView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _state2.default.addChangeListener(this._onChange.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _state2.default.removeChangeListener(this._onChange.bind(this));
    }
  }, {
    key: "_onChange",
    value: function _onChange() {
      this.setState(getMapState());
    }
  }, {
    key: "render",
    value: function render() {
      var sidebar = void 0;
      var classString = "map";

      if (this.state.isOpen) {
        classString += " open";
      }

      if (this.state.isFetching) {
        sidebar = _react2.default.createElement(_sidebarFetching2.default, { location: this.state.currentLocation, place: this.state.fetchingPlace, breadcrumb: this.state.placeParent });
      } else {
        if (this.state.isDetail) {
          sidebar = _react2.default.createElement(_sidebarDetails2.default, { poi: this.state.poi });
        } else {
          sidebar = _react2.default.createElement(_sidebar2.default, { location: this.state.currentLocation, sets: this.state.sets, highlightedPoi: this.state.hoveredItem, activeSetIndex: this.state.activeSetIndex, customPanel: this.state.customPanel, tabDropdownOpen: this.state.tabDropdownOpen });
        }
      }

      var activeSet = this.state.sets[this.state.activeSetIndex];

      return _react2.default.createElement(
        "div",
        { className: classString },
        _react2.default.createElement(
          "div",
          { id: "close-map--wrapper", onClick: this.closeMap },
          _react2.default.createElement(
            "div",
            { className: "close-map icon-close-small" },
            "Close"
          )
        ),
        _react2.default.createElement(_map2.default, { pins: activeSet, location: this.state.currentLocation, index: this.state.activeIndex }),
        sidebar,
        _react2.default.createElement(_alert2.default, { error: this.state.error })
      );
    }

    // TODO: Trigger an action here, try not to call dispatcher directly

  }, {
    key: "closeMap",
    value: function closeMap() {
      _actions2.default.mapClose();
    }
  }]);

  return MainView;
}(_react2.default.Component);

exports.default = MainView;