"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Takes a given string and turns it into a hyphenated slug
 * @param  {String} string String to replace
 * @return {String}
 */
var slugify = function slugify(string) {
  if (!string || typeof string !== "string") return "";

  return string.toLowerCase().replace(/\s/g, "-");
};

exports.slugify = slugify;