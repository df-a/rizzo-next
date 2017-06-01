"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  window.lp.isAdblockActive = !!((0, _jquery2.default)(".ads.adpartner") && (0, _jquery2.default)(".ads.adpartner").is(":hidden"));

  window.lp.analytics.dataLayer = window.lp.analytics.dataLayer || {};
  window.lp.analytics.dataLayer.events = window.lp.analytics.dataLayer.events || [];

  if (window.lp.isAdblockActive) {
    window.lp.analytics.dataLayer.events.push({ category: "advertising", action: "loaded-with-adblock" });
  } else {
    window.lp.analytics.dataLayer.events.push({ category: "advertising", action: "loaded-without-adblock" });
  }
};

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }