"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _arkham = require("../../core/arkham");

var _arkham2 = _interopRequireDefault(_arkham);

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

var _getScrollbarWidth = require("../../core/utils/getScrollbarWidth");

var _getScrollbarWidth2 = _interopRequireDefault(_getScrollbarWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    return _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).apply(this, arguments));
  }

  _createClass(Overlay, [{
    key: "initialize",
    value: function initialize() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { preventScroll: false };

      this.options = options;

      this.$html = $("html");
      this.$el.addClass("lp-overlay");

      this.events = {
        "click": "onClick",
        "touchmove": function touchmove(e) {
          e.preventDefault();
        }
      };
    }
  }, {
    key: "toggle",
    value: function toggle() {
      var stateOverwrite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      var state = stateOverwrite !== undefined ? stateOverwrite : this.isVisible;

      if (state) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this2 = this;

      // Do nothing if visible
      if (this.isVisible) {
        return Promise.all([]);
      }

      if (this.$el.parent().length === 0) {
        this.$el.appendTo(document.body);
      }

      this.isVisible = true;

      (0, _getScrollbarWidth2.default)().then(function (scrollWidth) {
        setTimeout(function () {
          _this2.$el.addClass("lp-overlay--visible");
        }, 10);

        if (_this2.options.preventScroll) {
          _this2.$html.addClass("no-scroll");
        }
        _this2.$html.css({
          "margin-right": scrollWidth
        });
      });

      return (0, _waitForTransition2.default)(this.$el);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      // Do nothing if not visible
      if (!this.isVisible) {
        return Promise.all([]);
      }

      this.$el.removeClass("lp-overlay--visible");

      this.isVisible = false;

      return (0, _waitForTransition2.default)(this.$el).then(function () {
        _this3.$el.detach();

        if (_this3.options.preventScroll) {
          _this3.$html.removeClass("no-scroll");
        }

        _this3.$html.css({
          "margin-right": 0
        });
      });
    }
  }, {
    key: "onClick",
    value: function onClick() {
      _arkham2.default.trigger("overlay:click");
      this.trigger("click");
    }
  }]);

  return Overlay;
}(_bane.Component);

exports.default = Overlay;