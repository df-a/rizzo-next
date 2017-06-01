"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../../core/bane");

var _markerset = require("./markerset");

var _markerset2 = _interopRequireDefault(_markerset);

require("mapbox.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var L = window.L;
var mapID = "lonelyplanet.04cf7895";

L.mapbox.accessToken = "pk.eyJ1IjoibG9uZWx5cGxhbmV0IiwiYSI6ImNpajYyZW1iMjAwOG51bWx2YW50ejNmN2IifQ.neyeEEzBkaNKcKUzCe3s2Q";

var MapProvider = function (_Component) {
  _inherits(MapProvider, _Component);

  function MapProvider() {
    _classCallCheck(this, MapProvider);

    return _possibleConstructorReturn(this, (MapProvider.__proto__ || Object.getPrototypeOf(MapProvider)).apply(this, arguments));
  }

  _createClass(MapProvider, [{
    key: "initialize",
    value: function initialize() {
      this.layer = L.mapbox.featureLayer();
    }
  }, {
    key: "launch",
    value: function launch() {
      var options = {
        zoomControl: true,
        scrollWheelZoom: true
      };
      this.map = L.mapbox.map(this.$el[0], mapID, options);
      return this.map;
    }
  }, {
    key: "kill",
    value: function kill() {
      this.map.remove();
    }
  }, {
    key: "addMarkers",
    value: function addMarkers(pois) {
      this.markers = new _markerset2.default({
        el: this.el,
        map: this.map,
        layer: this.layer,
        pois: pois
      });
    }
  }, {
    key: "removeMarkers",
    value: function removeMarkers() {
      delete this.markers;
    }
  }, {
    key: "removePopup",
    value: function removePopup() {
      this.map.closePopup();
    }
  }]);

  return MapProvider;
}(_bane.Component);

exports.default = MapProvider;