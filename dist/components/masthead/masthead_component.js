"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class;

var _bane = require("../../core/bane");

var _slideshow = require("../slideshow");

var _slideshow2 = _interopRequireDefault(_slideshow);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

require("./masthead_nav.js");

var _covervid = require("../../core/utils/covervid");

var _covervid2 = _interopRequireDefault(_covervid);

var _mobile_util = require("../../core/mobile_util");

var _mobile_util2 = _interopRequireDefault(_mobile_util);

var _fitText = require("../../core/utils/fitText");

var _fitText2 = _interopRequireDefault(_fitText);

var _subscribe = require("../../core/decorators/subscribe");

var _subscribe2 = _interopRequireDefault(_subscribe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * Masthead Component
*/
var MastheadComponent = (_dec = (0, _subscribe2.default)("ad.loaded", "ads"), (_class = function (_Component) {
  _inherits(MastheadComponent, _Component);

  function MastheadComponent() {
    _classCallCheck(this, MastheadComponent);

    return _possibleConstructorReturn(this, (MastheadComponent.__proto__ || Object.getPrototypeOf(MastheadComponent)).apply(this, arguments));
  }

  _createClass(MastheadComponent, [{
    key: "initialize",
    value: function initialize(options) {

      $.each(this.$straplines, function (index, strapline) {
        if (!$(strapline).html()) {
          $(strapline).parent().addClass("has-empty");
        }
      });

      this.$video = this.$el.find(".js-video").on("playing", function (event) {
        $(event.target).addClass("is-playing");
      });

      if (this.$video.length && !_mobile_util2.default.isMobile()) {
        this.$el.find(".slideshow").remove();
        (0, _covervid2.default)(this.$video[0], 1440, 680);
        return;
      } else if (this.$video.length && _mobile_util2.default.isMobile()) {
        this.$video.closest(".js-video-container").remove();
      }

      this.slideshow = new _slideshow2.default((0, _assign2.default)({
        el: this.$el.find(".slideshow")
      }, options.slideshow));

      this.listenTo(this.slideshow, "image.changed", this.updateStrapline);

      var mastheadTitle = this.$el.find(".js-masthead-title");
      if (mastheadTitle.length) {
        (0, _fitText2.default)(mastheadTitle, {
          fontSizes: [56, 60, 80, 120],
          minFontSize: 56
        });
      }

      this.subscribe();
    }
  }, {
    key: "mastheadAdLoaded",
    value: function mastheadAdLoaded(data) {
      if (data.id === "sponsor-logo-masthead" || data.id === "best-in-badge-masthead") {
        var $mastheadAd = this.$el.find("#" + data.id);

        if ($mastheadAd.hasClass("display-block")) {
          this.$el.find(".masthead__text-wrap").removeClass("masthead__text-wrap--pull-up").addClass("masthead__text-wrap--pull-up");
        }
      }
    }
  }, {
    key: "updateStrapline",
    value: function updateStrapline(data) {
      this.$straplines.removeClass("masthead__strapline--visible");
      this.$straplines.eq(data.index).addClass("masthead__strapline--visible");
    }
  }, {
    key: "$straplines",
    get: function get() {
      return this.$el.find(".masthead__strapline");
    }
  }]);

  return MastheadComponent;
}(_bane.Component), (_applyDecoratedDescriptor(_class.prototype, "mastheadAdLoaded", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "mastheadAdLoaded"), _class.prototype)), _class));
exports.default = MastheadComponent;