"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      name = _ref.name,
      data = _ref.data;

  if (window.lp.fs) {
    window.lp.fs.log({ name: name, data: data });
  }
};

; /**
   * Log an event with Flamsteed
   * @param  {Object|String} data An object containing data to log, or a string description of an event
   */