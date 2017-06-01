"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

var _overlay = require("../overlay");

var _overlay2 = _interopRequireDefault(_overlay);

var _matchMedia = require("../../core/utils/matchMedia");

var _matchMedia2 = _interopRequireDefault(_matchMedia);

var _breakpoints = require("../../core/utils/breakpoints");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _social_share = require("../social_share");

var _social_share2 = _interopRequireDefault(_social_share);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: "initialize",
    value: function initialize(options) {
      this.events = {
        "touchend a": "goTo"
      };

      this.$html = $("html");
      this.$body = $("body");
      this.$strapline = $(".ebook__strapline");
      this.$title = $(".ebook__title");
      this.$copy = $(".ebook__copy");
      this.$form = $(".js-sailthru-form");
      this.$success = $(".js-success");
      this.$modalTrigger = $(".js-modal");

      // Remove from dom
      this.$el.detach();

      // New overlay instance
      this.overlay = new _overlay2.default();

      // Events
      this.$modalTrigger.on("click", this.show.bind(this));
      this.$body.on("keyup", this.onKeyup.bind(this));
      this.$el.on("click", "[class*='__close']", this.hide.bind(this));
      this.$el.on("submit", ".js-sailthru-form", this.submit.bind(this));
      this.listenTo(this.overlay, "click", this.hide);

      //fire modal on correct url hash

      if (options.hash === location.hash) {
        $(".js-modal").trigger("click");
      }
    }

    /**
     * Handle touch events on top places
     * @param  {[Event]} e
     */

  }, {
    key: "goTo",
    value: function goTo(e) {
      var el = $(e.currentTarget),
          link = el.attr("href");

      window.location = link;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isOpen) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this2 = this;

      if (this.isOpen) {
        return Promise.all([]);
      }
      if (this.$el.parent().length === 0) {
        this.$el.appendTo(document.body);
      }

      this.overlay.show();

      (0, _matchMedia2.default)("(max-width: " + _breakpoints2.default.max["720"] + ")", function (query) {
        if (query.matches) {
          $("html, body").animate({ scrollTop: 0 }, "slow");
        }
      });

      // wait a few ticks so transition triggers
      setTimeout(function () {
        _this2.$el.addClass("modal--visible");
      }, 10);

      this.isOpen = true;

      var hash = this.$modalTrigger.data("href");
      location.hash = hash;
      this.trackModalPageView();

      $(".js-action-sheet").each(function () {
        new _social_share2.default({
          el: this
        });
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      if (!this.isOpen) {
        return Promise.all([]);
      }

      this.isOpen = false;

      this.overlay.hide();

      this.$el.removeClass("modal--visible");

      (0, _waitForTransition2.default)(this.$el).then(function () {
        _this3.$el.detach();
      });

      location.hash = "";
      this.trackModalPageView(location.href);
    }
  }, {
    key: "onKeyup",
    value: function onKeyup(e) {
      // ESC
      if (e.keyCode === 27 && this.isOpen) {
        this.hide();
      }
    }
  }, {
    key: "handleSubmitSuccess",
    value: function handleSubmitSuccess(e) {
      this.$form.addClass("is-hidden");
      this.$strapline.addClass("is-hidden");
      this.$title.addClass("is-hidden");
      this.$copy.addClass("is-hidden");
      this.$success.removeClass("is-hidden");
      var dataLayer = {
        category: e.currentTarget.name,
        action: "newsletter",
        value: "sign up"
      };
      window.lp.analytics.send("event", dataLayer);
    }
  }, {
    key: "submit",
    value: function submit(e) {
      var _this4 = this;

      e.preventDefault();

      var formData = this.$form.serialize();

      if (e.currentTarget.name === "celebrate-rio-2016") {
        formData += "&" + $.param({ "sailthru[vars][LP_TRAVELNEWS_NEWSLETTER]": true });
      }

      $.post(this.$form.attr("action"), formData).done(function () {
        _this4.handleSubmitSuccess(e);
      }).fail(function (xhr) {
        if (xhr.status === 409) {
          _this4.handleSubmitSuccess(e);
        } else {
          console.log("error");
        }
      });
    }
  }, {
    key: "trackModalPageView",
    value: function trackModalPageView() {
      // Used to call a page view here, removing but keeping placeholder...
    }
  }]);

  return Modal;
}(_bane.Component);

exports.default = Modal;