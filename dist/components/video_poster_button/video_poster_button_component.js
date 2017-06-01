"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _video = require("../video");

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Video Poster Button Component
*/
var VideoPosterButtonComponent = function (_Component) {
  _inherits(VideoPosterButtonComponent, _Component);

  function VideoPosterButtonComponent() {
    _classCallCheck(this, VideoPosterButtonComponent);

    return _possibleConstructorReturn(this, (VideoPosterButtonComponent.__proto__ || Object.getPrototypeOf(VideoPosterButtonComponent)).apply(this, arguments));
  }

  _createClass(VideoPosterButtonComponent, [{
    key: "initialize",
    value: function initialize() {

      this.playerVisible = false;

      this.events = {
        "click .video-poster-button__inner": "onClick"
      };

      _video2.default.addPlayer(this.el, "brightcove").then(this.playerReady.bind(this));
    }
  }, {
    key: "showVideo",
    value: function showVideo() {
      if (this.playerVisible) {
        return;
      }
      this.playerVisible = true;

      var buttonContainer = this.$el.find(".video-poster-button__inner");
      buttonContainer.removeClass("video-poster-button__inner--visible");

      var videoContainer = this.$el.find(".video-poster-button__video");
      videoContainer.addClass("video-poster-button__video--visible");

      this.player.start();
    }
  }, {
    key: "hideVideo",
    value: function hideVideo() {
      if (!this.playerVisible) {
        return;
      }
      this.playerVisible = false;

      this.player.pause();

      var buttonContainer = this.$el.find(".video-poster-button__inner");
      buttonContainer.addClass("video-poster-button__inner--visible");

      var videoContainer = this.$el.find(".video-poster-button__video");
      videoContainer.removeClass("video-poster-button__video--visible");
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var title = "";
      var image = null;
      var description = "";

      try {
        var mediainfo = this.player.player.mediainfo;
        title = mediainfo.name || "";
        image = mediainfo.poster;
        description = mediainfo.description || "";
      } catch (e) {}

      if (!image) {
        this.$el.removeClass("video-poster-button--visible");
      }

      var imageEl = this.$el.find(".video-poster-button__poster")[0];
      imageEl.onload = function () {

        // Reset the width and height of the player to be the same
        // dimensions as the poster image so that we have a nice
        // smooth transition (and to undo Brightcove.setInitialDimensions())
        $(_this2.player.videoEl).css({ width: "100%", height: "100%" });

        _this2.$el.addClass("video-poster-button--visible");
      };
      imageEl.src = image;

      this.$el.find(".video-poster-button__title").text(title);
      this.$el.find(".video-poster-button__description").text(description);

      return this;
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      e.preventDefault();
      this.showVideo();
    }

    /**
      * Callback from the player "ready" event
      * @param  {VideoPlayer} player - Instance of the VideoPlayer
      */

  }, {
    key: "playerReady",
    value: function playerReady(player) {
      this.player = player;
      this.listenTo(this.player, "ended", this.onPlayerEnded.bind(this));
      this.player.fetchVideos().then(this.fetchDone.bind(this));
    }

    /**
     * Callback from the player "ended" event / when a video or playlist finishes playing.
     */

  }, {
    key: "onPlayerEnded",
    value: function onPlayerEnded() {
      this.hideVideo();
    }

    /**
    * Callback from the player fetchVideos()
    * @param  {bool} success - depicting whether at least one video is available or not
    */

  }, {
    key: "fetchDone",
    value: function fetchDone(success) {
      if (!success) {
        return;
      }

      this.render();
    }
  }]);

  return VideoPosterButtonComponent;
}(_bane.Component);

exports.default = VideoPosterButtonComponent;