"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _overlay = require("../overlay");

var _overlay2 = _interopRequireDefault(_overlay);

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

var _video = require("../video");

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Video Overlay Component
*/
var VideoOverlay = function (_Overlay) {
  _inherits(VideoOverlay, _Overlay);

  function VideoOverlay() {
    _classCallCheck(this, VideoOverlay);

    return _possibleConstructorReturn(this, (VideoOverlay.__proto__ || Object.getPrototypeOf(VideoOverlay)).apply(this, arguments));
  }

  _createClass(VideoOverlay, [{
    key: "initialize",
    value: function initialize(options) {
      _get(VideoOverlay.prototype.__proto__ || Object.getPrototypeOf(VideoOverlay.prototype), "initialize", this).call(this, options);

      this.resizeBound = false;

      _video2.default.addPlayer(this.el, "brightcove").then(this.playerReady.bind(this));
    }
  }, {
    key: "show",
    value: function show() {
      var _this2 = this;

      _get(VideoOverlay.prototype.__proto__ || Object.getPrototypeOf(VideoOverlay.prototype), "show", this).call(this);
      this.calculateDimensions();
      if (!this.resizeBound) {
        this.resizeBound = true;
        $(window).resize(this.calculateDimensions.bind(this));
      }
      this.$el.addClass("video-overlay--visible");
      return (0, _waitForTransition2.default)(this.$el).then(function () {
        _this2.player.start();
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      return _get(VideoOverlay.prototype.__proto__ || Object.getPrototypeOf(VideoOverlay.prototype), "hide", this).call(this).then(function () {
        _this3.$el.removeClass("video-overlay--visible");
      });
    }
  }, {
    key: "onClick",
    value: function onClick() {
      _get(VideoOverlay.prototype.__proto__ || Object.getPrototypeOf(VideoOverlay.prototype), "onClick", this).call(this);

      if (this.player) {
        this.player.pause();
      }

      this.hide();
    }
  }, {
    key: "calculateDimensions",
    value: function calculateDimensions() {
      if (!this.player) {
        return;
      }

      var maxHeight = $(window).innerHeight() - this.$el.find(".video-overlay__close").outerHeight();
      var maxWidth = $(".lp-global-header__container").innerWidth();
      var containerWidth = this.$el.find(".video-overlay__video__container").innerWidth();
      if (maxWidth > containerWidth) {
        maxWidth = containerWidth;
      }

      var ideal = this.player.getIdealDimensions(maxWidth, maxHeight);

      $(this.player.videoEl).css({ width: ideal.width, height: ideal.height });
    }

    /**
    * Callback from the player "ready" event
    * @param  {VideoPlayer} player - Instance of the VideoPlayer
    */

  }, {
    key: "playerReady",
    value: function playerReady(player) {
      this.player = player;
      this.player.fetchVideos().then(this.fetchDone.bind(this));
    }

    /**
    * Callback from the player loadVideo()
    * @param  {bool} success - depicting whether at least one video is available or not
    */

  }, {
    key: "fetchDone",
    value: function fetchDone(success) {
      if (!success) {
        return;
      }

      this.trigger("video.loaded");
    }
  }]);

  return VideoOverlay;
}(_overlay2.default);

exports.default = VideoOverlay;