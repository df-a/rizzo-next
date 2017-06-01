"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PoiCalloutComponent = function (_Component) {
  _inherits(PoiCalloutComponent, _Component);

  function PoiCalloutComponent() {
    _classCallCheck(this, PoiCalloutComponent);

    return _possibleConstructorReturn(this, (PoiCalloutComponent.__proto__ || Object.getPrototypeOf(PoiCalloutComponent)).apply(this, arguments));
  }

  _createClass(PoiCalloutComponent, [{
    key: "initialize",
    value: function initialize(options) {
      var _events,
          _this2 = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$poiLinkSelector = _ref.poiLinkSelector,
          poiLinkSelector = _ref$poiLinkSelector === undefined ? "a[data-callout-slug]" : _ref$poiLinkSelector;

      this.contentTemplate = require("./poi_callout_content.hbs");
      this.calloutTemplate = require("./poi_callout.hbs");

      this.$links = this.$el.find(poiLinkSelector);

      this.poiLinkSelector = poiLinkSelector;

      this.pois = options.pois;

      this.events = (_events = {}, _defineProperty(_events, "mouseenter.poi " + poiLinkSelector, "_createPoiCallout"), _defineProperty(_events, "mouseleave.poi " + poiLinkSelector, "_destroyPoiCallout"), _events);

      this.$callout = (0, _jquery2.default)(this.calloutTemplate({})).appendTo("body");

      this.$callout.html(this.contentTemplate({}));

      this.$window = (0, _jquery2.default)(window);
      this.calloutWidth = this.$callout.outerWidth();
      this.left = this.$el.offset().left - this.calloutWidth - 35;
      this.top = 0;
      this.articleOffsetHeight = this.$el.height() + this.$el.offset().top;
      this.mouseoutTimeout;
      this.$activeLink;

      var updateArticleOffsetHeight = false;

      this.$window.on("resize.poi", (0, _debounce2.default)(function () {
        _this2.left = _this2.$window.width() >= 1370 ? _this2.$el.offset().left - _this2.calloutWidth - 35 : _this2.$el.offset().left - _this2.calloutWidth;

        _this2._windowEvents();
      }, 100));

      this.$window.on("scroll.poi", (0, _debounce2.default)(function () {
        _this2._windowEvents();

        if (!updateArticleOffsetHeight) {
          updateArticleOffsetHeight = true;
          _this2.articleOffsetHeight = _this2.$el.height() + _this2.$el.offset().top;
        }
      }, 100));

      this.$callout.on("mouseenter.poi", function () {
        clearTimeout(_this2.mouseoutTimeout);
      }).on("mouseleave.poi", function (event) {
        _this2._destroyPoiCallout(event);
      });
    }

    /**
     * Resets and detaches callout, removes all event handlers
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this._resetPoiCallout();
      this.$callout.detach();
      this.$el.off("mouseenter.poi mouseleave.poi");
      this.$callout.off("mouseenter.poi mouseleave.poi");
      this.$window.off("resize.poi scroll.poi");
    }

    /**
     * Creates the POI callout and positions it
     * @param  {Object} event
     * @return false
     */

  }, {
    key: "_createPoiCallout",
    value: function _createPoiCallout(event) {
      event.preventDefault();

      if (this.$callout.hasClass("is-invisible")) {
        this.top = 0;
        this.$callout.removeAttr("style");
      }

      this.$activeLink = (0, _jquery2.default)(event.currentTarget);

      this.$activeLink.addClass("is-active");

      this._resetSiblingLinks();
      this._setTopOffsetForPoiCallout();
      this._updatePoiCallout();

      clearTimeout(this.mouseoutTimeout);

      return false;
    }

    /**
     * Hides the POI callout
     * @param  {Object} event
     * @return false
     */

  }, {
    key: "_destroyPoiCallout",
    value: function _destroyPoiCallout(event) {
      var _this3 = this;

      event.preventDefault();

      this.mouseoutTimeout = setTimeout(function () {
        _this3.$activeLink.removeClass("is-active");

        _this3.$callout.attr("aria-hidden", "true").removeClass("is-visible").addClass("is-invisible");
      }, 250);

      return false;
    }

    /**
     * Removes the active class from sibling links
     */

  }, {
    key: "_resetSiblingLinks",
    value: function _resetSiblingLinks() {
      // Remove the active class from siblings in the same paragraph
      this.$activeLink.siblings(this.poiLinkSelector).removeClass("is-active");

      // Remove the active class from siblings in different paragraphs
      this.$activeLink.closest(".lp-js-poi-callout-excerpt").siblings().find(this.poiLinkSelector).removeClass("is-active");
    }

    /**
     * Updates the callout content, makes it visible and positions it
     */

  }, {
    key: "_updatePoiCallout",
    value: function _updatePoiCallout() {
      var poiData = this.pois[this.$activeLink.data("calloutSlug")];

      this.$callout.addClass("is-visible").removeClass("is-invisible").attr({
        "aria-hidden": "false",
        "href": this.$activeLink.attr("href")
      }).css({
        "top": this.top + "px",
        "left": this.left + "px"
      }).html(this.contentTemplate({
        name: poiData.name,
        topic: poiData.topic,
        excerpt: poiData.excerpt,
        image: poiData.image
      }));
    }

    /**
     * Returns the callout to its "default" state
     */

  }, {
    key: "_resetPoiCallout",
    value: function _resetPoiCallout() {
      this.top = 0;

      this.$callout.attr("aria-hidden", "true").removeClass("is-visible").addClass("is-invisible").removeAttr("style");
    }

    /**
     * Sets the top offset of the callout
     */

  }, {
    key: "_setTopOffsetForPoiCallout",
    value: function _setTopOffsetForPoiCallout() {
      var _this4 = this;

      var bottomOffset = this.$callout.height() + this.$activeLink.offset().top,
          topOffset = this.$activeLink.offset().top,
          calloutPosition = topOffset - this.$window.scrollTop() + this.$callout.outerHeight() + 30,
          stickyFooterOffset = 76;

      var isCalloutBelowBottom = this.articleOffsetHeight - bottomOffset < 0,
          isCalloutOffscreen = calloutPosition > this.$window.height();

      this.$window.scroll((0, _debounce2.default)(function () {
        calloutPosition = topOffset - _this4.$window.scrollTop() + _this4.$callout.outerHeight() + 30;
      }, 100));

      if (isCalloutBelowBottom) {
        this.top = topOffset + (this.articleOffsetHeight - bottomOffset) - stickyFooterOffset;
      } else if (isCalloutOffscreen) {
        this.top = topOffset - (calloutPosition - this.$window.height()) - stickyFooterOffset;
      } else {
        this.top = topOffset;
      }
    }

    /**
     * Methods for window events, such as resize and scroll
     */

  }, {
    key: "_windowEvents",
    value: function _windowEvents() {
      if (typeof this.$activeLink !== "undefined") {
        this.$activeLink.removeClass("is-active");

        this._resetPoiCallout();
      }
    }
  }]);

  return PoiCalloutComponent;
}(_bane.Component);

exports.default = PoiCalloutComponent;