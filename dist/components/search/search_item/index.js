"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../../core/bane");

var _highlight = require("../../../core/utils/highlight");

var _highlight2 = _interopRequireDefault(_highlight);

var _indexHtml = require("./index.html.hbs");

var _indexHtml2 = _interopRequireDefault(_indexHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchItemComponent = function (_Component) {
  _inherits(SearchItemComponent, _Component);

  function SearchItemComponent() {
    _classCallCheck(this, SearchItemComponent);

    return _possibleConstructorReturn(this, (SearchItemComponent.__proto__ || Object.getPrototypeOf(SearchItemComponent)).apply(this, arguments));
  }

  _createClass(SearchItemComponent, [{
    key: "initialize",
    value: function initialize(options) {
      this.model = options.model;
      this.model.isVideo = this.model.type === "video";
      this.searchString = options.searchString;
      this.$el = $("<li />", {
        "class": "lp-search-item"
      });
    }
  }, {
    key: "render",
    value: function render() {
      this.$el.html((0, _indexHtml2.default)(this.model));

      (0, _highlight2.default)(this.$el.find("[class*='__name']"), this.searchString);

      return this;
    }
  }, {
    key: "select",
    value: function select() {
      this.$el.addClass("lp-search-item--selected");
    }
  }, {
    key: "unselect",
    value: function unselect() {
      this.$el.removeClass("lp-search-item--selected");
    }
  }, {
    key: "navigate",
    value: function navigate() {
      window.location = "/" + this.model.slug;
    }
  }]);

  return SearchItemComponent;
}(_bane.Component);

exports.default = SearchItemComponent;