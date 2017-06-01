"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../../core/bane");

var _arkham = require("../../../core/arkham");

var _arkham2 = _interopRequireDefault(_arkham);

var _actions = require("../actions");

var _actions2 = _interopRequireDefault(_actions);

var _state = require("../state");

var _state2 = _interopRequireDefault(_state);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pin = require("../views/pin.jsx");

var _pin2 = _interopRequireDefault(_pin);

var _server = require("react-dom/server");

require("mapbox.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var L = window.L;

var MarkerSet = function (_Component) {
  _inherits(MarkerSet, _Component);

  function MarkerSet() {
    _classCallCheck(this, MarkerSet);

    return _possibleConstructorReturn(this, (MarkerSet.__proto__ || Object.getPrototypeOf(MarkerSet)).apply(this, arguments));
  }

  _createClass(MarkerSet, [{
    key: "initialize",
    value: function initialize(_ref) {
      var pois = _ref.pois,
          map = _ref.map,
          layer = _ref.layer;

      this.events = {
        // "click.marker .poi": "_poiClick", doesn't work, because marker is z-indexed lower than popup-pane?
        "click.marker .pin": "_poiClick"
      };

      this.pois = pois;
      this.map = map;
      this.layer = layer;

      this.listen();

      this._createLayer();
      this._clearMarkers();
      this._createGeoJSON();
      this._addIcons();

      this.layer.addTo(this.map);
      this.map.fitBounds(this.layer.getBounds(), { padding: [50, 50], maxZoom: 14 });
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this = this;

      _arkham2.default.off("map.poihover");
      _arkham2.default.on("map.poihover", function (data) {
        var layer = _this._findLayerByIndex(data.poiIndex);
        _this._poiHover(layer);
      });

      _arkham2.default.off("map.poiunhover");
      _arkham2.default.on("map.poiunhover", function (data) {
        var layer = _this._findLayerByIndex(data.poiIndex);
        _this._poiUnhover(layer);
      });
    }
  }, {
    key: "_findLayerByIndex",
    value: function _findLayerByIndex(i) {
      var l = void 0;

      this.layer.eachLayer(function (layer) {
        if (layer.feature.properties.index === i) {
          l = layer;
        }
      });

      return l;
    }
  }, {
    key: "_createGeoJSON",
    value: function _createGeoJSON() {
      var geojson = {
        type: "FeatureCollection",
        features: []
      };

      for (var i = 0, l = this.pois.length; i < l; i++) {
        var geo = this.pois[i].geo;

        if (geo.geometry.coordinates[0] === null || geo.geometry.coordinates[1] === null) {
          continue;
        } else {
          geo.properties.index = i;
          geojson.features.push(geo);
        }
      }

      this.layer.setGeoJSON(geojson);
    }
  }, {
    key: "_addIcons",
    value: function _addIcons() {
      this.layer.eachLayer(function (l) {
        var myIcon = L.divIcon({
          className: "poi js-poi",
          iconSize: [14, 14]
        });

        l.setIcon(myIcon);
      });
    }
  }, {
    key: "_createIcon",
    value: function _createIcon(layer) {
      var state = _state2.default.getState();
      // If there's no active set for the current view, use the first set
      var index = state.sets[state.activeSetIndex] ? state.activeSetIndex : state.lastActiveSetIndex;

      var set = state.sets[index || 0];

      if (!set) {
        return;
      }

      var pin = set.items[layer.feature.properties.index];
      var poi = { pin: pin };
      var markup = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_pin2.default, poi));
      // let pin = PinTemplate(layer.feature.properties);
      return markup;
    }
  }, {
    key: "_clearMarkers",
    value: function _clearMarkers() {
      this.layer.setGeoJSON([]);
    }
  }, {
    key: "_createLayer",
    value: function _createLayer() {
      var _this3 = this;

      this.layer.off("mouseover").off("mouseout");

      this.layer.on("mouseover", function (e) {
        _this3._poiHover(e.layer);
      }).on("mouseout", function (e) {
        _this3._poiUnhover(e.layer);
      });

      this.layer.off("click");
      this.layer.on("click", function (e) {
        _this3._poiClick(e);
      });
    }
  }, {
    key: "_poiHover",
    value: function _poiHover(layer) {
      // this._fixzIndex(layer); Not needed since pop-ups moved off the markers?
      var template = this._createIcon(layer),
          lat = layer._latlng.lat,
          lng = layer._latlng.lng;

      this.activeLayer = layer;
      this.popup = L.popup({
        closeButton: false,
        keepInView: true,
        offset: L.point(0, -25)
      }).setLatLng(L.latLng(lat, lng)).setContent(template).openOn(this.map);

      var poiIndex = layer.feature.properties.index;
      _actions2.default.itemHighlight(poiIndex);
    }

    // A layer argument is passed in, but it is not used
    // The defined argument has been removed to pass ESLint

  }, {
    key: "_poiUnhover",
    value: function _poiUnhover(layer) {
      // Use if needed
      this.activeLayer = layer;
    }
  }, {
    key: "_poiClick",
    value: function _poiClick(event) {
      var poiIndex = (event.layer || this.activeLayer).feature.properties.index,
          poi = this.pois[poiIndex];
      if (poi.item_type === "Place") {
        _actions2.default.gotoPlace({ place: poi.slug, placeTitle: poi.title, breadcrumb: poi.subtitle });
      } else {
        _actions2.default.poiOpen({ index: poiIndex, poi: poi });
      }
    }
  }, {
    key: "_fixzIndex",
    value: function _fixzIndex(currentLayer) {
      this.layer.eachLayer(function (layer) {
        layer._icon.style.zIndex = layer._icon._leaflet_pos.y;
      });
      currentLayer._icon.style.zIndex = currentLayer._icon._leaflet_pos.y + currentLayer.options.zIndexOffset + 60;
    }
  }]);

  return MarkerSet;
}(_bane.Component);

exports.default = MarkerSet;