"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _main = require("./views/main.jsx");

var _main2 = _interopRequireDefault(_main);

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _arkham = require("../../core/arkham");

var _arkham2 = _interopRequireDefault(_arkham);

var _history = require("history");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _map_api = require("./map_api");

var _map_api2 = _interopRequireDefault(_map_api);

var _mapboxGl = require("mapbox-gl/dist/mapbox-gl.js");

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _rizzo = require("../../rizzo");

var _rizzo2 = _interopRequireDefault(_rizzo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var history = (0, _history.createHistory)();

var MapComponent = function (_Component) {
  _inherits(MapComponent, _Component);

  function MapComponent() {
    _classCallCheck(this, MapComponent);

    return _possibleConstructorReturn(this, (MapComponent.__proto__ || Object.getPrototypeOf(MapComponent)).apply(this, arguments));
  }

  _createClass(MapComponent, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      _rizzo2.default.logger.log("Creating map");

      if (!MapComponent.supported) {
        return false;
      }

      this.fetchMap();

      _arkham2.default.on("map.closed", function () {
        _this2.close();
      });

      (0, _jquery2.default)("body").on("keyup", this.onKeyup.bind(this));

      this.updateMapHistory();
    }
  }, {
    key: "fetchMap",
    value: function fetchMap() {
      var _this3 = this;

      _map_api2.default.fetch("/" + window.lp.place.slug + "/map.json").done(function (results) {
        _actions2.default.setState(results);
        (0, _reactDom.render)(_react2.default.createElement(_main2.default, null), _this3.$el[0]);
        _this3.open();
      });
    }
  }, {
    key: "updateMapHistory",
    value: function updateMapHistory() {
      var _this4 = this;

      window.onpopstate = function (event) {
        var hasState = event.state && event.state.isOnMap,
            isOnMap = _this4.isOnMap();

        if (hasState || !hasState && isOnMap) {
          _this4.createMap();
        } else {
          _this4.destroyMap();
        }
      };
    }
  }, {
    key: "createMap",
    value: function createMap() {
      (0, _jquery2.default)("html, body").addClass("noscroll");
      this.$el.addClass("open");
      _actions2.default.mapOpen();
    }
  }, {
    key: "destroyMap",
    value: function destroyMap() {
      (0, _jquery2.default)("html, body").removeClass("noscroll");
      this.$el.removeClass("open");
    }
  }, {
    key: "open",
    value: function open() {
      this.createMap();

      if (!this.isOnMap()) {
        var pathname = this.getMapPath();

        history.push({
          pathname: pathname + "map",
          state: { isOnMap: true }
        });
      }
    }
  }, {
    key: "isOnMap",
    value: function isOnMap() {
      return (/map\/?$/.test(window.location.pathname)
      );
    }
  }, {
    key: "getMapPath",
    value: function getMapPath() {
      var pathname = window.location.pathname;
      var lastChar = window.location.pathname.substr(-1); // Selects the last character

      if (lastChar !== "/") {
        // If the last character is not a slash
        pathname = pathname + "/"; // Append a slash to it.
      }

      return pathname;
    }
  }, {
    key: "close",
    value: function close() {
      this.destroyMap();

      var path = window.location.pathname.replace(/\/map\/?$/, "");

      history.push({
        pathname: "" + path,
        state: { isOnMap: false }
      });
    }
  }, {
    key: "onKeyup",
    value: function onKeyup(e) {
      if (e.keyCode === 27) {
        this.close();
      }
    }
  }]);

  return MapComponent;
}(_bane.Component);

exports.default = MapComponent;


MapComponent.supported = _mapboxGl2.default.supported();