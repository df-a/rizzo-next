"use strict";

require("./components/analytics");

var _rizzoNext = require("rizzo-next");

var _rizzoNext2 = _interopRequireDefault(_rizzoNext);

var _header = require("./components/header");

var _header2 = _interopRequireDefault(_header);

var _footer = require("./components/footer");

var _footer2 = _interopRequireDefault(_footer);

var _fastclick = require("fastclick");

var _fastclick2 = _interopRequireDefault(_fastclick);

require("./core/utils/preload");

require("./core/utils/detect_swipe");

require("./core/event_tracker");

require("./components/ads");

require("./components/svg_icons");

var _cookie_util = require("./core/cookie_util");

var _cookie_util2 = _interopRequireDefault(_cookie_util);

var _postal = require("postal/lib/postal.lodash");

var _postal2 = _interopRequireDefault(_postal);

var _login_manager = require("./components/login/login_manager");

var _login_manager2 = _interopRequireDefault(_login_manager);

var _ad_manager = require("./core/ads/ad_manager");

var _ad_manager2 = _interopRequireDefault(_ad_manager);

var _alert = require("./components/alert");

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _login_manager2.default();

// Create LP namespace if it isn't there already
window.lp = window.lp || {};
window.lp.ads = window.lp.ads || {};
window.lp.ads.manager = new _ad_manager2.default(window.lp.ads).initialize();

_rizzoNext2.default.renderComponent(_header2.default, ".lp-global-header");
_rizzoNext2.default.renderComponent(_footer2.default, ".lp-global-footer");

_fastclick2.default.attach(document.body);

if (typeof ENV_PROD !== "undefined" && ENV_PROD) {
  require("trackjs");
}

var cookie = new _cookie_util2.default();
cookie.setCookie("destinations-next-cookie", true, 14);

// Show cookie notification for EU users
if (cookie.getCookie("lpCurrency") && cookie.getCookie("lpCurrency").match(/GBP|EUR/)) {
  _rizzoNext2.default.renderComponent(_alert2.default, {
    el: "body",
    alert: {
      type: "default",
      text: "We use cookies to improve your experience on our website. You can update your settings",
      link_text: "here",
      link: "http://www.lonelyplanet.com/legal/cookies"
    }
  });
}

if (typeof ENV_PROD !== "undefined" && !ENV_PROD) {
  _postal2.default.addWireTap(function (data, envelope) {
    console.log(JSON.stringify(envelope));
  });
}

$.support.cors = true;

window.jQuery = $;
$.detectSwipe.preventDefault = false;