"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapbox = require("./mapbox");

var _mapbox2 = _interopRequireDefault(_mapbox);

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapAPI = {
  /**
   * Setup the map on an element
   * @param el
   */
  launch: function launch(el) {
    this.mapProvider = new _mapbox2.default({
      el: el
    });
    var map = this.mapProvider.launch();
    map.on("load", function () {
      _actions2.default.initMap();
    });
  },
  /**
   * Destroy the map
   */
  kill: function kill() {
    this.mapProvider.kill();
  },
  /**
   * Redraw the map with a new list of POIS
   * @param {Array} pois
   */
  redraw: function redraw(pois) {
    this.plot(pois);
  },
  /**
   * Plots out an array of POIs
   * @param {Array} pois
   */
  plot: function plot(pois) {
    this.mapProvider.addMarkers(pois);
  }

};

exports.default = MapAPI;