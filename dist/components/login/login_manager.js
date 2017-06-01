"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class;

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _publish = require("../../core/decorators/publish");

var _publish2 = _interopRequireDefault(_publish);

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var LoginManager = (_dec = (0, _publish2.default)("user.status.update"), (_class = function () {
  function LoginManager() {
    _classCallCheck(this, LoginManager);

    this.statusUrl = "https://auth.lonelyplanet.com/users/status.json";
    this.feedUrl = "https://www.lonelyplanet.com/thorntree/users/feed";

    this.checkStatus();
  }
  /**
   * Check to see if the user is currently logged in.
   * @return {jQuery.Deferred}
   */


  _createClass(LoginManager, [{
    key: "checkStatus",
    value: function checkStatus() {
      return _jquery2.default.ajax({
        url: this.statusUrl,
        dataType: "jsonp",
        success: this.statusFetched.bind(this),
        error: this.error.bind(this)
      });
    }
    /**
     * Callback from checking the user's login status.
     * If the user is not logged in, it will publish a user with a null id.
     * Will check for user notifications if the user is logged in.
     * @param  {Object} user User login information
     */

  }, {
    key: "statusFetched",
    value: function statusFetched(user) {
      this.user = user.username ? new _user2.default(user) : new _user2.default();

      if (!user.id) {
        return this._updateStatus();
      }

      this._updateStatus();
    }
  }, {
    key: "_updateStatus",
    value: function _updateStatus() {
      return this.user.toJSON();
    }
  }, {
    key: "error",
    value: function error() {
      throw "Error retrieving luna login information";
    }
  }]);

  return LoginManager;
}(), (_applyDecoratedDescriptor(_class.prototype, "_updateStatus", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "_updateStatus"), _class.prototype)), _class));
exports.default = LoginManager;