"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressComponent = function (_Component) {
  _inherits(ProgressComponent, _Component);

  function ProgressComponent() {
    _classCallCheck(this, ProgressComponent);

    return _possibleConstructorReturn(this, (ProgressComponent.__proto__ || Object.getPrototypeOf(ProgressComponent)).apply(this, arguments));
  }

  _createClass(ProgressComponent, [{
    key: "initialize",
    value: function initialize(options) {
      this.options = options;
      this.$progessBar = this.$el.find(".js-lp-progress-bar");
      this.maxWidth = this.$el.data("max") ? this.$el.data("max") : 100;
    }
  }, {
    key: "update",
    value: function update() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.width;

      if (width < 0) width = 0;
      if (width > this.maxWidth) width = this.maxWidth;

      this.$el.data("value", width);
      this.$el.attr("aria-label", Math.ceil(width) + "%");
      this.$progessBar.css("width", width + "%");
    }
  }, {
    key: "reset",
    value: function reset() {
      this.update(0);
    }
  }, {
    key: "fill",
    value: function fill() {
      this.update(this.maxWidth);
    }
  }]);

  return ProgressComponent;
}(_bane.Component);

exports.default = ProgressComponent;