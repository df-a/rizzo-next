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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopPlaces = function (_Component) {
  _inherits(TopPlaces, _Component);

  function TopPlaces() {
    _classCallCheck(this, TopPlaces);

    return _possibleConstructorReturn(this, (TopPlaces.__proto__ || Object.getPrototypeOf(TopPlaces)).apply(this, arguments));
  }

  _createClass(TopPlaces, [{
    key: "initialize",
    value: function initialize() {
      this.events = {
        "touchend a": "goTo"
      };

      this.$html = $("html");
      this.$body = $("body");

      // Remove from dom
      this.$el.detach();

      // New overlay instance
      this.overlay = new _overlay2.default();

      // Events
      this.$body.on("click", ".js-top-places", this.show.bind(this));
      this.$body.on("keyup", this.onKeyup.bind(this));
      this.$el.on("click", "[class*='__close']", this.hide.bind(this));
      this.listenTo(this.overlay, "click", this.hide);
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

      // wait a few ticks so transition triggers
      setTimeout(function () {
        _this2.$el.addClass("top_places--visible");
      }, 10);

      this.isOpen = true;
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

      this.$el.removeClass("top_places--visible");

      (0, _waitForTransition2.default)(this.$el).then(function () {
        _this3.$el.detach();
      });
    }
  }, {
    key: "onKeyup",
    value: function onKeyup(e) {
      // ESC
      if (e.keyCode === 27 && this.isOpen) {
        this.hide();
      }
    }
  }]);

  return TopPlaces;
}(_bane.Component);

exports.default = TopPlaces;