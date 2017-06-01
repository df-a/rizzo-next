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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  isActive: false,
  isTyping: false,
  isFocused: false,
  results: [],
  query: ""
};

var SearchState = {};

// Mixin Pattern
// merge { } with { on, off, trigger }
// SearchState.on, SearchState.off, SearchState.trigger etc.....
(0, _assign2.default)(SearchState, _events2.default);

//Arkham.on('overlay:click', () => {
//  state.isActive = false;
//
//  SearchState.trigger("change:isActive", state);
//});

_arkham2.default.on("search.start", function () {
  state.isActive = true;

  SearchState.trigger("change:isActive", state);
});

_arkham2.default.on("search.start", function () {
  state.isFocused = true;

  SearchState.trigger("change:isFocused", state);
});

_arkham2.default.on("search.end overlay:click", function () {
  state.isActive = false;
  state.results = [];

  SearchState.trigger("change:isActive", state);
});

_arkham2.default.on("search.fetch", function (data) {
  state.isTyping = true;
  state.query = data.query;

  SearchState.trigger("change:isTyping", state);
});

_arkham2.default.on("search.fetched", function (data) {
  state.results = data.results.slice(0, 5);
  state.isTyping = false;

  SearchState.trigger("change:results", state);
});

exports.default = SearchState;