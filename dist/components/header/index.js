"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _header_component = require("./header_component");

var _header_component2 = _interopRequireDefault(_header_component);

require("./_header.scss");

require("../logo/logo.scss");

require("../navigation/_navigation.scss");

require("../navigation/_mobile-navigation.scss");

require("../navigation/_user-panel.scss");

require("../avatar/avatar.scss");

require("../search/search.scss");

require("../search/search_item/index.scss");

require("../overlay/index.scss");

require("../notification/_notification.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _header_component2.default;