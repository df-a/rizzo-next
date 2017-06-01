"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rClass = /\sclass=\"[a-zA-Z_-\s]*\"/g;

var User = function () {
  function User() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref.id,
        email = _ref.email,
        username = _ref.username,
        facebookUid = _ref.facebookUid,
        profileSlug = _ref.profileSlug,
        _ref$avatar = _ref.avatar,
        avatar = _ref$avatar === undefined ? "http://dummyimage.com/80x80/4d494d/686a82.gif" : _ref$avatar,
        _ref$messages = _ref.messages,
        messages = _ref$messages === undefined ? [] : _ref$messages,
        _ref$activity = _ref.activity,
        activity = _ref$activity === undefined ? [] : _ref$activity;

    _classCallCheck(this, User);

    this.id = id;
    this.email = email;
    this.username = username;
    this.facebookUid = facebookUid;
    this.profileSlug = profileSlug;
    this.avatar = avatar.replace(/small/, "large");
    this.messages = messages;
    this.activity = activity;
  }

  _createClass(User, [{
    key: "toJSON",
    value: function toJSON() {
      var obj = {};
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          obj[key] = this[key];
        }
      }

      obj.messages = obj.messages.length ? obj.messages.map(function (msg) {
        return {
          text: msg.text.replace(rClass, ""),
          read: msg["read?"]
        };
      }) : null;

      obj.activity = obj.activity.length ? obj.activity : null;

      obj.activity_count = obj.activity ? obj.activity.length : null;
      obj.unread_message_count = obj.messages ? obj.messages.filter(function (msg) {
        return !msg.read;
      }).length : null;

      obj.notification_count = (obj.activity_count || 0) + (obj.unread_message_count || 0);

      return obj;
    }
  }]);

  return User;
}();

exports.default = User;