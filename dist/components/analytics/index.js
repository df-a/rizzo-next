"use strict";

var _flamsteed = require("flamsteed");

var _flamsteed2 = _interopRequireDefault(_flamsteed);

var _cookie_util = require("../../core/cookie_util");

var _cookie_util2 = _interopRequireDefault(_cookie_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.lp = window.lp || {};

window.lp.fs = {
  buffer: [],
  now: function now() {
    return Date.now ? Date.now() : new Date().getTime();
  },
  log: function log(x) {
    this.buffer.push({ e: x, t: this.now() });
  },
  time: function time(x) {
    !!window.performance && !!window.performance.now && this.buffer.push({ e: x, t: this.now() });
  }
};

window.lp.fs = new _flamsteed2.default({
  events: window.lp.fs.buffer,
  u: new _cookie_util2.default().getCookie("lpUid") || "",
  schema: "0.3"
});