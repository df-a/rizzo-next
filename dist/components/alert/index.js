"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../../core/component");

var _component2 = _interopRequireDefault(_component);

var _cookie_util = require("../../core/cookie_util");

var _cookie_util2 = _interopRequireDefault(_cookie_util);

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("./_alert.scss");

var Alert = function (_Component) {
  _inherits(Alert, _Component);

  function Alert() {
    _classCallCheck(this, Alert);

    return _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));
  }

  _createClass(Alert, [{
    key: "initialize",

    /**
     * Create a new alert for the top of the page
     * @param  {[object]} options.alert An alert object
     * @param  {[string]} options.alert.type Type of alert
     * @param  {[string]} options.alert.text Text of the alert
     * @param  {[string]} options.alert.link_text String of the link
     * @return {[type]}               [description]
     */
    value: function initialize(_ref) {
      var alert = _ref.alert,
          callback = _ref.callback;

      this.cookieUtil = new _cookie_util2.default();
      if (this.cookieUtil.getCookie(this.cookieName)) {
        return;
      }

      this.alert = alert;
      this.callback = callback;

      this.template = require("./alert.hbs");
      var html = this.template({ alert: this.alert });

      this.$el.prepend(html);
      this.$alert = this.$el.find(".alert");
      this.$alert.find(".alert__inner").addClass("is-visible");

      this.events = {
        "click .js-close": "hideAlert",
        "click .js-alert-link": "linkClicked"
      };
    }
  }, {
    key: "hideAlert",
    value: function hideAlert() {
      var _this2 = this;

      this.cookieUtil.setCookie(this.cookieName, "true", 30);
      this.$alert.removeClass("is-visible");
      return (0, _waitForTransition2.default)(this.$alert, { fallbackTime: 1000 }).then(function () {
        _this2.$alert.detach();
      });
    }
  }, {
    key: "linkClicked",
    value: function linkClicked() {
      this.callback && this.callback();
    }
  }, {
    key: "cookieName",
    get: function get() {
      return "dn-hide-banner";
    }
  }]);

  return Alert;
}(_component2.default);

exports.default = Alert;