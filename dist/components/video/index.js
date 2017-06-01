"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _brightcove = require("./brightcove");

var _brightcove2 = _interopRequireDefault(_brightcove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("./_video.scss");

var players = new Map();
players.set("brightcove", _brightcove2.default);

var Video = function () {
  function Video() {
    _classCallCheck(this, Video);
  }

  _createClass(Video, null, [{
    key: "addPlayer",
    value: function addPlayer(element) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "brightcove";

      if (typeof element === "string") {
        element = $(element)[0];
      }

      this.players = this.players || new Map();

      var PlayerConstructor = players.get(type),
          player = new PlayerConstructor({
        el: element,
        playerId: this.players.size + 1
      });

      this.players.set(element, player);

      // Take the return value and use .then() on it to ensure the 
      // player is ready before using it.
      return new Promise(function (resolve) {
        player.on("ready", function () {
          resolve(player);
        });
      });
    }
  }]);

  return Video;
}();

exports.default = Video;