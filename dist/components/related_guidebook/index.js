"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _clamp = require("clamp-js/clamp.js");

var _clamp2 = _interopRequireDefault(_clamp);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

require("./related_guidebook.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RelatedGuidebookComponent = function (_Component) {
  _inherits(RelatedGuidebookComponent, _Component);

  function RelatedGuidebookComponent() {
    _classCallCheck(this, RelatedGuidebookComponent);

    return _possibleConstructorReturn(this, (RelatedGuidebookComponent.__proto__ || Object.getPrototypeOf(RelatedGuidebookComponent)).apply(this, arguments));
  }

  _createClass(RelatedGuidebookComponent, [{
    key: "initialize",
    value: function initialize() {
      if (!(0, _jquery2.default)("html").hasClass("ie9")) {
        this._clampText();

        (0, _jquery2.default)(window).resize((0, _debounce2.default)(this._reclamp.bind(this), 100));
      }
    }
  }, {
    key: "_reclamp",
    value: function _reclamp() {
      this._clampText();
    }
  }, {
    key: "_clampText",
    value: function _clampText() {
      this.$el.each(function (index, guidebook) {
        (0, _clamp2.default)((0, _jquery2.default)(guidebook).find(".js-related-guidebook-title").get(0), { clamp: 2 });
        (0, _clamp2.default)((0, _jquery2.default)(guidebook).find(".js-related-guidebook-content").get(0), { clamp: 2 });
      });
    }
  }]);

  return RelatedGuidebookComponent;
}(_bane.Component);

exports.default = RelatedGuidebookComponent;