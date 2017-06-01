"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require("./mixins/events");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  function Model(_ref) {
    var url = _ref.url;

    _classCallCheck(this, Model);

    this.url = url;
  }

  _createClass(Model, [{
    key: "set",
    value: function set(key, value) {
      if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
        this.props = key;
      } else {
        var old = this.props[key];

        this.props[key] = value;

        this.trigger("change:" + key, value, {
          old: old,
          value: value
        });
      }

      this.trigger("change");
    }
  }, {
    key: "get",
    value: function get(key) {
      if (typeof key === "undefined") {
        return this.props;
      } else {
        return this.props[key];
      }
    }
  }, {
    key: "parse",
    value: function parse(response) {
      return response;
    }
  }, {
    key: "fetch",
    value: function fetch() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        $.ajax(_this.url, {
          success: function success(response) {
            _this.set(_this.parse(response));
            resolve(_this);
          },
          error: function error(xhrObj, textStatus, _error) {
            reject(Error(_error));
          }
        });
      });
    }
  }]);

  return Model;
}();

exports.default = Model;


Object.assign(Model.prototype, _events2.default);