"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arkham = require("../../core/arkham");

var _arkham2 = _interopRequireDefault(_arkham);

var _search_api = require("./search_api");

var _search_api2 = _interopRequireDefault(_search_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchActions = {
  openSearch: function openSearch() {
    _arkham2.default.trigger("search.start");
  },
  endSearch: function endSearch() {
    _arkham2.default.trigger("search.end");
  },
  typing: function typing(data) {
    _arkham2.default.trigger("search.fetch", data);

    _search_api2.default.search(data.query);
  }
};

exports.default = SearchActions;