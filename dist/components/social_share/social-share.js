"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _urlencode = require("urlencode");

var _urlencode2 = _interopRequireDefault(_urlencode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocialShareComponent = function (_Component) {
  _inherits(SocialShareComponent, _Component);

  function SocialShareComponent() {
    _classCallCheck(this, SocialShareComponent);

    return _possibleConstructorReturn(this, (SocialShareComponent.__proto__ || Object.getPrototypeOf(SocialShareComponent)).apply(this, arguments));
  }

  _createClass(SocialShareComponent, [{
    key: "initialize",
    value: function initialize() {
      this.isSocialShareMenuHidden = false;

      this.events = {
        "click .js-action-sheet-menu-control": "socialShareMenuControlClicked",
        "click .js-action-sheet-share-control": "socialShareControlClicked"
      };
    }
  }, {
    key: "socialShareMenuControlClicked",
    value: function socialShareMenuControlClicked(event) {
      var $el = (0, _jquery2.default)(event.currentTarget);
      var id = "#" + $el.attr("aria-owns"),
          $menu = $el.siblings(id);

      if (this.isSocialShareMenuHidden) {
        this.makeSocialShareMenuVisible($menu);
      } else {
        this.makeSocialShareMenuHidden($menu);
      }

      event.preventDefault();
    }
  }, {
    key: "makeSocialShareMenuVisible",
    value: function makeSocialShareMenuVisible($menu) {
      this._hideSocialShareMenu($menu);
      this.isSocialShareMenuHidden = false;
    }
  }, {
    key: "makeSocialShareMenuHidden",
    value: function makeSocialShareMenuHidden($menu) {
      this._showSocialShareMenu($menu);
      this.isSocialShareMenuHidden = true;

      return window.location.pathname;
    }
  }, {
    key: "socialShareControlClicked",
    value: function socialShareControlClicked(event) {
      var $el = (0, _jquery2.default)(event.currentTarget);

      var width = 550,
          height = 420,
          winHeight = (0, _jquery2.default)(window).height(),
          winWidth = (0, _jquery2.default)(window).width(),
          left = void 0,
          top = void 0;

      var $title = $el.closest(".article").find("meta[itemprop=\"headline\"]"),
          title = void 0,
          tweet = void 0,
          msg = $el.data("msg"),
          url = $el.data("url") || window.location.href,
          network = $el.data("network");

      if ($title.length) {
        title = $title[0].content;
        tweet = (0, _urlencode2.default)(title) + " " + (0, _urlencode2.default)(url) + " @lonelyplanet";
      } else if (msg) {
        tweet = "" + (0, _urlencode2.default)(msg);
      }

      left = Math.round(winWidth / 2 - width / 2);
      top = winHeight > height ? Math.round(winHeight / 2 - height / 2) : 0;

      if (winHeight > height) {
        top = Math.round(winHeight / 2 - height / 2);
      }

      var windowOptions = "toolbar=no,menubar=no,location=yes,resizable=no,scrollbars=yes",
          windowSize = "width=" + width + ",height=" + height + ",left=" + left + ",left=" + top;

      if (network === "twitter") {
        window.open("https://twitter.com/intent/tweet?text=" + tweet, "share", windowOptions + "," + windowSize);

        return "twitter";
      }

      if (network === "facebook") {
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + url, "share", windowOptions + "," + windowSize);

        return "facebook";
      }

      if (network === "email") {
        window.location = "mailto:?body=" + msg;

        return "email";
      }
    }
  }, {
    key: "_showSocialShareMenu",
    value: function _showSocialShareMenu($menu) {
      $menu.addClass("is-open").prop("hidden", false).attr("aria-hidden", "false");
    }
  }, {
    key: "_hideSocialShareMenu",
    value: function _hideSocialShareMenu($menu) {
      $menu.removeClass("is-open").prop("hidden", true).attr("aria-hidden", "true");
    }
  }]);

  return SocialShareComponent;
}(_bane.Component);

exports.default = SocialShareComponent;