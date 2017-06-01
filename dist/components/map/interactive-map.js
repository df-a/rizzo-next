"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _arkham = require("../../core/arkham");

var _arkham2 = _interopRequireDefault(_arkham);

var _bane = require("../../core/bane");

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

var _api = require("./api");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper around the map element
 */
var InteractiveMap = function (_Component) {
  _inherits(InteractiveMap, _Component);

  function InteractiveMap() {
    _classCallCheck(this, InteractiveMap);

    return _possibleConstructorReturn(this, (InteractiveMap.__proto__ || Object.getPrototypeOf(InteractiveMap)).apply(this, arguments));
  }

  _createClass(InteractiveMap, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.launch();

      _arkham2.default.on("map.init", function () {
        _this2.changeView();
      });

      _arkham2.default.on("view.changed", function () {
        _this2.changeView();
      });

      _arkham2.default.on("place.fetched", function () {
        _this2.changeView();
      });
    }
  }, {
    key: "launch",
    value: function launch() {
      _api2.default.launch(this.$el);
    }
  }, {
    key: "kill",
    value: function kill() {
      _api2.default.kill();
    }
  }, {
    key: "changeView",
    value: function changeView() {
      var state = _state2.default.getState();
      var pois = [];

      if (!state.sets[state.activeSetIndex]) {
        pois.push(state.currentLocation);
      } else {
        pois = state.sets[state.activeSetIndex].items;
      }

      _api2.default.redraw(pois);
    }
  }, {
    key: "hasFetched",
    value: function hasFetched() {
      var state = _state2.default.getState();
      var pois = state.sets[state.activeSetIndex].items;

      _api2.default.plot(pois);
    }
  }, {
    key: "pinClick",
    value: function pinClick(e) {
      var pinType = (0, _jquery2.default)(e.currentTarget).data("pintype");

      if (pinType === "poi") {
        var data = {
          poi: (0, _jquery2.default)(e.currentTarget).data("poi")
        };
        _actions2.default.poiOpen(data);
      } else {
        var _data = {
          place: (0, _jquery2.default)(e.currentTarget).data("place")
        };
        _actions2.default.gotoPlace(_data);
      }
    }
  }]);

  return InteractiveMap;
}(_bane.Component);

exports.default = InteractiveMap;