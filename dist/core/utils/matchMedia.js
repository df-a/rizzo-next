"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (query, callback) {
  var media = window.matchMedia(query);

  if (typeof callback === "function") {
    media.addListener(callback);

    callback(media);
  }
};