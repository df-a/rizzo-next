"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _article_component = require("./article_component");

var _article_component2 = _interopRequireDefault(_article_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("./article.scss");
require("./article-loading.scss");
require("./article-error.scss");
require("./article-header.scss");
require("./article-pagination.scss");

exports.default = _article_component2.default;