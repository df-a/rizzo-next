"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global escape, unescape  */

/**
 * A utility for managing cookies
 */
var CookieUtil = function () {
  function CookieUtil() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$cookies = _ref.cookies,
        cookies = _ref$cookies === undefined ? null : _ref$cookies;

    _classCallCheck(this, CookieUtil);

    this.cookies = cookies;
  }
  /**
   * Retrievew a cookie by it's name
   * @param  {String} cookieName Name of the cookie to retrieve
   * @param  {String} format Whether or not the cookie should be parsed with JSON
   * @return {String|Object} The cookie
   */


  _createClass(CookieUtil, [{
    key: "getCookie",
    value: function getCookie() {
      var cookieName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      var contents = unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

      return format.toUpperCase() === "JSON" ? JSON.parse(contents) : contents;
    }
    /**
     * Set a cookie
     * @param {String} k Cookie name
     * @param {String} v Cookie value
     * @param {[Number]} days Expiration in days
     * @param {[String]} domain Domain of the cookie
     * @param {[String]} path Path of the cookie
     */

  }, {
    key: "setCookie",
    value: function setCookie(k, v, days, domain, path) {
      var exp = "";

      if (days && days !== 0) {
        exp = new Date();
        exp.setTime(exp.getTime() + days * 86400000);
        exp = ";expires=" + exp.toGMTString();
      }

      domain = domain ? ";domain=" + domain : "";
      path = ";path=" + (path || "/");

      var cookie = k + "=" + v + exp + domain + path;

      // Explicit test for null here because of default argument above
      return this.cookies !== null ? this.cookies = cookie : document.cookie = cookie;
    }
  }, {
    key: "removeCookie",
    value: function removeCookie(name) {
      var cookieString = name + "=";
      cookieString += ";max-age=0";
      cookieString += ";expires=jan 1 1973";
      document.cookie = cookieString;
    }
  }]);

  return CookieUtil;
}();

exports.default = CookieUtil;