"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _arkham = require("../../core/arkham");

var _arkham2 = _interopRequireDefault(_arkham);

var _events = require("../../core/mixins/events");

var _events2 = _interopRequireDefault(_events);

var _delay = require("lodash/delay");

var _delay2 = _interopRequireDefault(_delay);

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Pull in only delay method
var _ = {
  find: _find2.default, delay: _delay2.default
};

var CHANGE_EVENT = "change";

var state = {
  isOpen: false,
  isFetching: true,
  fetchingPlace: "",
  isDetail: false,
  activeSetIndex: 0,
  poi: 2,
  currentLocation: {},
  sets: [],
  error: null,
  hoveredPin: 0,
  hoveredItem: null,
  customPanel: "",
  tabDropdownOpen: false,
  placeParent: "",
  topicClicked: ""
};

var MapState = (0, _assign2.default)({
  getState: function getState() {
    return state;
  },
  emitChange: function emitChange() {
    this.trigger(CHANGE_EVENT);
  },
  addChangeListener: function addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function removeChangeListener(cb) {
    this.stopListening(CHANGE_EVENT, cb);
  },


  sortSets: function sortSets(sets) {
    var headings = state.topics.concat(["Countries", "Cities", "Sponsored", "About"]);

    return headings.reduce(function (memo, heading) {
      var set = (0, _find2.default)(sets, function (set) {
        return set.title === heading;
      });
      if (set) {
        memo.push(set);
      }

      return memo;
    }, []);
  }
}, _events2.default);

_arkham2.default.on("map.opened", function () {
  state.isOpen = true;
  MapState.emitChange();
});

_arkham2.default.on("map.closed", function () {
  state.isOpen = false;
  MapState.emitChange();
});

_arkham2.default.on("view.changed", function (data) {
  state.hoveredItem = data;
  state.activeSetIndex = data.view;
  state.customPanel = "";
  MapState.emitChange();
});

_arkham2.default.on("poi.opened", function (data) {
  state.poiIndex = parseInt(data.index, 10);
  state.poi = data.poi;
  state.isDetail = true;
  MapState.emitChange();
});

_arkham2.default.on("poi.closed", function () {
  state.poi = null;
  state.isDetail = false;
  MapState.emitChange();
});

_arkham2.default.on("place.fetching", function (data) {
  state.isFetching = true;
  state.fetchingPlace = data.placeTitle;
  state.placeParent = data.breadcrumb;
  state.topicClicked = data.topic;
  MapState.emitChange();
});

_arkham2.default.on("place.fetched", function (data) {
  state.currentLocation = data.location;
  state.topics = data.topics;
  state.sets = MapState.sortSets(data.sets.filter(function (s) {
    return !!s.items.length;
  }));
  state.activeSetIndex = 0;
  state.fetchingPlace = "";
  state.isFetching = false;
  state.customPanel = "";
  MapState.emitChange();
});

_arkham2.default.on("place.errorfetching", function (data) {
  state.isFetching = false;
  state.fetchingPlace = "";
  state.error = data;
  MapState.emitChange();
  _.delay(function () {
    state.error = null;
    MapState.emitChange();
  }, 3000);
});

_arkham2.default.on("state.setinitial", function (data) {
  state.isFetching = false;
  state.topics = data.topics;
  state.sets = MapState.sortSets(data.sets.filter(function (s) {
    return !!s.items.length;
  }));
  state.currentLocation = data.location;
  MapState.emitChange();
});

_arkham2.default.on("poi.hover", function (data) {
  state.hoveredPin = data.pin;
  MapState.emitChange();
});

_arkham2.default.on("item.hovered", function (data) {
  state.hoveredItem = data;
  MapState.emitChange();
});

_arkham2.default.on("custompanel.opened", function (data) {
  state.lastActiveSetIndex = state.activeSetIndex;
  state.activeSetIndex = data.view;
  state.customPanel = data.panel;
  MapState.emitChange();
});

_arkham2.default.on("sponsor.fetched", function (data) {
  state.sets.push(data);
  MapState.emitChange();
});

exports.default = MapState;
;