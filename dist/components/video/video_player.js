"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoPlayer = function (_Component) {
  _inherits(VideoPlayer, _Component);

  function VideoPlayer() {
    _classCallCheck(this, VideoPlayer);

    return _possibleConstructorReturn(this, (VideoPlayer.__proto__ || Object.getPrototypeOf(VideoPlayer)).apply(this, arguments));
  }

  _createClass(VideoPlayer, [{
    key: "initialize",
    value: function initialize(_ref) {
      var playerId = _ref.playerId;

      this.playerId = playerId;
      this.defaultAspectRatio = 1.77777778;
      this.events = {};
      this.setup();
    }

    /**
     * Run any setup to load the player (ex. videojs player).
     * Make sure this.trigger("ready") is called within this function.
     */

  }, {
    key: "setup",
    value: function setup() {
      this.trigger("ready");
    }

    /**
     * Override to actually play the underlying player
     */

  }, {
    key: "play",
    value: function play() {}

    /**
     * Override to actually pause the underlying player
     */

  }, {
    key: "pause",
    value: function pause() {}
  }]);

  return VideoPlayer;
}(_bane.Component);

exports.default = VideoPlayer;