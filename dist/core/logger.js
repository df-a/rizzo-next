"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import airbrakeJs from "airbrake-js";

// let airbrake = new airbrakeJs({
//   projectId: 108616,
//   projectKey: "046ae0791af77310d8cfe001786fad6f"
// });

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: "error",

    /**
     * Log an error
     * @param {Error|Object|String} err Either string or object containing error details
     */
    value: function error(err) {
      if (ENV_PROD) {
        if (window.trackJs) {
          if (typeof err === "string") {
            this._send("error", err);
          } else if (err instanceof Error) {
            window.trackJs.track(err);
          }
        }
      } else {
        console.log(JSON.stringify(err));
      }
    }
  }, {
    key: "log",
    value: function log(message) {
      this._send("log", message);
    }
  }, {
    key: "debug",
    value: function debug(message) {
      this._send("debug", message);
    }
  }, {
    key: "_send",
    value: function _send(type, message) {
      if (window.trackJs) {
        window.trackJs.console[type](message);
      }
    }
  }]);

  return Logger;
}();

exports.default = Logger;