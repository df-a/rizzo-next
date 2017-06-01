"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = { map: _map2.default };

/**
 * Must return an object w/ name and date, and optional trackers []
 */
exports.default = {
  search: function search(data) {
    var place = window.lp.place;

    data.booking.city = place.continentName + ":" + place.countryName + ":" + place.cityName;

    var serialized = _.map(data.booking, function (val, key) {
      return key + "=" + val;
    }).join("&");

    return {
      name: "Partner Search",
      data: "partner=booking&" + serialized
    };
  }
};