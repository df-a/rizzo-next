"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _search_server_actions = require("./search_server_actions");

var _search_server_actions2 = _interopRequireDefault(_search_server_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeResults = function mergeResults(query, searchResults, videoResults) {

  var bestVideoResults = [];
  if (query.length > 1) {
    bestVideoResults = videoResults.filter(function (v) {
      return v.name.toLowerCase().startsWith(query.toLowerCase());
    });
  }

  var bestVideoResultCount = bestVideoResults.length;

  // Merge results by alternating between the best video results and the search results
  var results = [];

  while (bestVideoResults.length || searchResults.length) {
    if (bestVideoResults.length) {
      results.push(bestVideoResults.shift());
    }
    if (searchResults.length) {
      results.push(searchResults.shift());
    }
  }

  // Make sure at least 1 video result appears in the top 5
  if (!bestVideoResultCount && videoResults.length) {
    results.splice(4, 0, videoResults.shift());
  }

  return results;
};

var SearchApi = {
  search: function search(query) {
    var searchResults = null;
    var videoResults = null;

    _jquery2.default.ajax({
      url: "https://www.lonelyplanet.com/search.json?q=" + query
    }).done(function (results) {
      searchResults = results;
      if (videoResults) {
        _search_server_actions2.default.fetched(mergeResults(query, searchResults, videoResults));
      }
    });

    _jquery2.default.ajax({
      url: "https://www.lonelyplanet.com/video/search.json?q=" + query
    }).done(function (results) {
      videoResults = results;
      if (searchResults) {
        _search_server_actions2.default.fetched(mergeResults(query, searchResults, videoResults));
      }
    });
  }
};

exports.default = SearchApi;