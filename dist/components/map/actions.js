"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arkham = require("../../core/arkham");

var _arkham2 = _interopRequireDefault(_arkham);

var _times = require("lodash/times");

var _times2 = _interopRequireDefault(_times);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _each = require("lodash/each");

var _each2 = _interopRequireDefault(_each);

var _uniq = require("lodash/uniq");

var _uniq2 = _interopRequireDefault(_uniq);

var _map_api = require("./map_api");

var _map_api2 = _interopRequireDefault(_map_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var generatePlacements = function generatePlacements() {
  var placement = {
    divName: "sponsored",
    networkId: 9807,
    siteId: 316543,
    adTypes: [43],
    eventIds: [31, 32],
    properties: {
      "place": window.lp.place.name.toLowerCase()
    }
  };

  var placements = [];

  (0, _times2.default)(20, function (i) {
    placements.push((0, _assign2.default)({}, placement, {
      divName: "sponsored" + (i + 1)
    }));
  });

  return placements;
};

var MapActions = function () {
  function MapActions() {
    _classCallCheck(this, MapActions);
  }

  _createClass(MapActions, [{
    key: "viewChange",
    value: function viewChange(data) {
      _arkham2.default.trigger("view.changed", data);
    }
  }, {
    key: "gotoPlace",
    value: function gotoPlace(_ref) {
      var placeTitle = _ref.placeTitle,
          place = _ref.place,
          breadcrumb = _ref.breadcrumb,
          _ref$topic = _ref.topic,
          topic = _ref$topic === undefined ? "" : _ref$topic;

      var query = topic ? "?topic=" + topic.toLowerCase() : "",
          url = "/" + place + "/map.json" + query;

      _arkham2.default.trigger("place.fetching", { placeTitle: placeTitle, breadcrumb: breadcrumb, topic: topic });

      _map_api2.default.fetch(url).done(function (results) {
        _arkham2.default.trigger("place.fetched", results);
      });

      return {
        category: "Destinations Next",
        label: placeTitle
      };
    }
  }, {
    key: "poiOpen",
    value: function poiOpen(data) {
      _arkham2.default.trigger("poi.opened", data);
    }
  }, {
    key: "poiClose",
    value: function poiClose() {
      _arkham2.default.trigger("poi.closed");
    }
  }, {
    key: "pinHover",
    value: function pinHover(data) {
      _arkham2.default.trigger("map.poihover", data);
    }
  }, {
    key: "itemHighlight",
    value: function itemHighlight(data) {
      _arkham2.default.trigger("item.hovered", data);
    }
  }, {
    key: "mapOpen",
    value: function mapOpen() {
      _arkham2.default.trigger("map.opened");
    }
  }, {
    key: "mapClose",
    value: function mapClose() {
      _arkham2.default.trigger("map.closed");
    }
  }, {
    key: "setState",
    value: function setState(state) {
      _arkham2.default.trigger("state.setinitial", state);
    }
  }, {
    key: "initMap",
    value: function initMap() {
      _arkham2.default.trigger("map.init");
      return { label: "/" + window.lp.place.slug + "/map", category: "Page View" };
    }
  }, {
    key: "customPanel",
    value: function customPanel(data) {
      _arkham2.default.trigger("custompanel.opened", data);
    }
  }, {
    key: "fetchSponsors",
    value: function fetchSponsors() {
      var x = JSON.stringify({
        placements: generatePlacements()
      });

      $.ajax({
        url: "http://engine.adzerk.net/api/v2",
        method: "POST",
        contentType: "application/json",
        data: x,
        success: function success(response) {
          var set = { title: "Sponsored", items: [] },
              decisions = (0, _uniq2.default)((0, _filter2.default)(response.decisions, function (d) {
            return d;
          }), "creativeId");

          (0, _each2.default)(decisions, function (decision) {
            var poi = JSON.parse(decision.contents[0].body);
            set.items.push(poi);
          });

          if (set.items.length) {
            _arkham2.default.trigger("sponsor.fetched", set);
          }
        },
        error: function error() {
          console.log("fail");
        }
      });
    }
  }]);

  return MapActions;
}();

exports.default = new MapActions();