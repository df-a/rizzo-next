"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arkham = require("../../core/arkham");

var _arkham2 = _interopRequireDefault(_arkham);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationActions = {
  clickNav: function clickNav(data) {
    _arkham2.default.trigger("navigation.click", data);
  }
};

exports.default = NavigationActions;