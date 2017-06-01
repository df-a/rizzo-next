"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mark = function mark(name) {
  if (window.performance && window.performance.mark) {
    window.performance.mark(name);
  }
};

var measure = function measure(name, start, end) {
  if (window.performance && window.performance.measure) {
    window.performance.measure(name, start, end);
    var entries = void 0;
    return (entries = window.performance.getEntriesByName(name))[entries.length - 1];
  }
};

exports.mark = mark;
exports.measure = measure;