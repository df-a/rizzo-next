"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video_player = require("./video_player");

var _video_player2 = _interopRequireDefault(_video_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global videojs */

var Brightcove = function (_VideoPlayer) {
  _inherits(Brightcove, _VideoPlayer);

  function Brightcove() {
    _classCallCheck(this, Brightcove);

    return _possibleConstructorReturn(this, (Brightcove.__proto__ || Object.getPrototypeOf(Brightcove)).apply(this, arguments));
  }

  _createClass(Brightcove, [{
    key: "initialize",
    value: function initialize(options) {
      _get(Brightcove.prototype.__proto__ || Object.getPrototypeOf(Brightcove.prototype), "initialize", this).call(this, options);

      this.autoplay = false;
      this.videos = [];
      this.currentVideoIndex = null;

      this.events["click .video-js"] = "onClickVideo";
    }
  }, {
    key: "onClickVideo",
    value: function onClickVideo(event) {
      // Prevent event from bubbling into the UI
      // when the user interacts with the video.
      event.stopPropagation();
    }
  }, {
    key: "play",
    value: function play() {
      _get(Brightcove.prototype.__proto__ || Object.getPrototypeOf(Brightcove.prototype), "play", this).call(this);
      this.autoplay = true;
      this.player.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      _get(Brightcove.prototype.__proto__ || Object.getPrototypeOf(Brightcove.prototype), "pause", this).call(this);
      this.autoplay = false;
      this.player.pause();
    }
  }, {
    key: "start",
    value: function start() {
      this.currentVideoIndex = null;
      this.loadNextVideo();
      this.play();
    }
  }, {
    key: "setup",
    value: function setup() {
      var self = this;
      videojs(this.videoEl).ready(function () {
        self.player = this;
        self.player.on("loadstart", self.onPlayerLoadStart.bind(self));
        self.player.on("ended", self.onPlayerEnded.bind(self));
        self.trigger("ready");
      });
    }
  }, {
    key: "onPlayerLoadStart",
    value: function onPlayerLoadStart() {
      this.renderSEOMarkup();
      this.configureOverlays();

      if (this.autoplay) {
        this.player.play();
      }
    }
  }, {
    key: "onPlayerEnded",
    value: function onPlayerEnded() {
      if (this.currentVideoIndex >= this.videos.length - 1) {
        this.trigger("ended");
      } else {
        this.loadNextVideo();
      }
    }
  }, {
    key: "fetchVideos",
    value: function fetchVideos() {
      var _this2 = this;

      if (!this.player) {
        return Promise.resolve(false);
      }

      var query = null;
      try {
        query = "ref:dest_" + window.lp.place.atlasId;
      } catch (e) {
        return Promise.resolve(false);
      }

      return new Promise(function (resolve) {
        _this2.player.catalog.getPlaylist(query, function (error, playlist) {
          if (!error) {
            _this2.videos = playlist.length ? playlist : [];
          }
          if (_this2.videos.length) {
            _this2.loadNextVideo();
            resolve(true);
          } else {
            _this2.player.catalog.getVideo(query, function (error, video) {
              if (!error) {
                _this2.videos = [video];
                _this2.loadNextVideo();
              }
              resolve(!error);
            });
          }
        });
      });
    }
  }, {
    key: "loadNextVideo",
    value: function loadNextVideo() {
      if (!this.player || !this.videos.length) {
        return;
      }

      this.currentVideoIndex = this.currentVideoIndex === null ? 0 : this.currentVideoIndex + 1;
      this.currentVideoIndex = this.currentVideoIndex > this.videos.length - 1 ? 0 : this.currentVideoIndex;

      this.player.catalog.load(this.videos[this.currentVideoIndex]);
    }

    /**
     * Gets the ideal dimensions of the video, considering it's aspect ratio.
     * @param {number} maxw - (required) Maximum width to return (pixels)
     * @param {number} maxh - (optional) Maximum height to return (pixels)
     * @return {Object} object with 'width' and 'height' attributes
     */

  }, {
    key: "getIdealDimensions",
    value: function getIdealDimensions(maxw, maxh) {
      var ratio = this.defaultAspectRatio;

      // If we have video data, use the aspect ratio of the
      // video as the width-height ratio value
      try {
        var source = this.player.mediainfo.rawSources[0];
        ratio = source.width / source.height;
      } catch (e) {}

      var width = maxw;
      var height = maxw / ratio;

      if (typeof maxh != "undefined" && height > maxh) {
        height = maxh;
        width = height * ratio;
      }

      return { width: width, height: height };
    }
  }, {
    key: "configureOverlays",
    value: function configureOverlays() {
      if (!this.player) {
        return;
      }

      var overlays = [{
        content: "<div class=\"video__ad-overlay\">Advertisement</div>",
        align: "top-left",
        start: "ads-ad-started",
        end: "playing"
      }];

      this.player.overlay({
        content: "",
        overlays: overlays,
        showBackground: false,
        attachToControlBar: true,
        debug: false
      });
    }

    /**
     * Retrieves metadata from the currently loaded video
     * @param {string} name - The metadata attribute to retrieve a value for
     * @returns The metadata value, or undefined if unable to retrieve the value
     */

  }, {
    key: "getVideoProperty",
    value: function getVideoProperty(name) {
      if (!this.player || !this.player.mediainfo) {
        return;
      }

      return this.player.mediainfo[name];
    }

    /**
     * Uses the currently loaded video data to build a block of
     * LD-JSON Schema.org markup and appends it to the "head" tag
     *
     * This is run automatically when any video is loaded.
     */

  }, {
    key: "renderSEOMarkup",
    value: function renderSEOMarkup() {
      if (!this.player || !this.player.mediainfo) {
        return;
      }

      var videoId = this.getVideoProperty("id");
      var scriptId = "ldjson-video-" + videoId;
      var script = document.getElementById(scriptId);
      if (script) {
        return;
      }

      var defaultDescription = "";
      try {
        defaultDescription = window.lp.place.name;
      } catch (e) {}

      // Duration must be in ISO 8601 format
      // https://en.wikipedia.org/wiki/ISO_8601#Durations
      // Brightcove returns the number of seconds (ex. 161.685)
      var seconds = Math.ceil(this.getVideoProperty("duration"));
      var duration = "PT" + seconds + "S";

      var embedUrl = "https://players.brightcove.net/5104226627001/default_default/index.html?videoId=" + videoId;

      var data = {
        "@context": "http://schema.org",
        "@type": "VideoObject",
        "name": this.getVideoProperty("name") || defaultDescription,
        "description": this.getVideoProperty("description") || defaultDescription,
        "thumbnailURL": this.getVideoProperty("thumbnail"),
        "embedURL": embedUrl,
        "duration": duration,
        "uploadDate": this.getVideoProperty("createdAt")
      };

      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(data);
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }, {
    key: "videoEl",
    get: function get() {
      if (this.$el.hasClass("video-js")) {
        return this.el;
      }
      return this.$el.find(".video-js")[0];
    }
  }]);

  return Brightcove;
}(_video_player2.default);

exports.default = Brightcove;