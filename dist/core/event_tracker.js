"use strict";

var _postal = require("postal/lib/postal.lodash");

var _postal2 = _interopRequireDefault(_postal);

var _hotels = require("../components/hotels/hotels.events");

var _hotels2 = _interopRequireDefault(_hotels);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = {
  assign: _assign2.default, map: _map2.default
};

var componentChannel = _postal2.default.channel("components");

/**
 * Track an event with our analytics library
 * @param {Object} options An object with event data
 *
 */
var trackEvent = function trackEvent(name, details) {
  if (window.lp.analytics.send) {
    window.lp.analytics.send("event", {
      category: name,
      action: details
    });
  }
};

/**
 * Log an event with Flamsteed
 * @param  {Object|String} data An object containing data to log, or a string description of an event
 */
var flamsteedLog = function flamsteedLog(description) {
  if (window.lp.fs) {
    window.lp.fs.log(typeof description === "string" ? {
      d: description
    } : description);
  }
};

var getPlace = function getPlace() {
  return window.lp.place;
};

componentChannel.subscribe(_hotels2.default.SEARCH, function (data) {
  var place = getPlace();

  _.assign(data.booking, {
    city: place.continentName + ":" + place.countryName + ":" + place.cityName
  });

  var serialized = _.map(data.booking, function (val, key) {
    return key + "=" + val;
  }).join("&");

  trackEvent("Partner Search", "partner=booking&" + serialized);
});

componentChannel.subscribe("ttd.loadmore", function () {
  flamsteedLog("thing to do load more clicked");
});