"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require("./mixins/events");

var _events2 = _interopRequireDefault(_events);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Arkham = {};

(0, _assign2.default)(Arkham, _events2.default);

exports.default = Arkham;