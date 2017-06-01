"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      name = _ref.name,
      data = _ref.data;

  data = ((0, _is_json2.default)(data) ? JSON.parse(data) : data) || "";

  var mappedEvent = void 0,
      gaEventData = {
    category: data ? data.category : "Destinations Next",
    action: name,
    label: (0, _is_json2.default)(data) ? JSON.stringify(data) : data ? data.label : data
  };

  if (mappedEvent = _ga_event_map2.default[name]) {
    for (var _name in mappedEvent) {
      gaEventData[_name] = mappedEvent[_name];
    }
  } else {
    mappedEvent = gaEventData;
  }

  var utagEvent = Object.keys(gaEventData).reduce(function (memo, key) {
    memo[key] = mappedEvent[key] || gaEventData[key];
    return memo;
  }, {});

  if (typeof window.lp.analytics != "undefined" && typeof window.lp.analytics.send === "function") {
    window.lp.analytics.send(utagEvent.name || "event", utagEvent);
  } else {
    window.trackJs.console.log("analytics: not loaded yet");
  }
};

var _is_json = require("../../utils/is_json");

var _is_json2 = _interopRequireDefault(_is_json);

var _ga_event_map = require("./ga_event_map");

var _ga_event_map2 = _interopRequireDefault(_ga_event_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/**
 * Track an event with our analytics library
 * @param {Object} options An object with event data
 */