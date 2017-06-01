"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: "initialize",
    value: function initialize() {
      this.events = {
        mouseenter: "_enter",
        mouseleave: "_leave"
      };

      this.template = require("./_tooltip.html.hbs");
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.$el.addClass("tooltip is-hidden").prepend(this.template());

      return this;
    }
  }, {
    key: "toggle",
    value: function toggle(state) {
      var _this2 = this;

      if (state === "close") {
        this.timer = setTimeout(function () {
          _this2.$el.addClass("is-hidden");
        }, 200);
      } else {
        this.$el.removeClass("is-hidden");
      }
    }
  }, {
    key: "_enter",
    value: function _enter() {
      clearTimeout(this.timer);
    }
  }, {
    key: "_leave",
    value: function _leave() {
      this.toggle("close");
    }
  }]);

  return Tooltip;
}(_bane.Component);

exports.default = Tooltip;