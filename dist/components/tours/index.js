"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _clamp = require("clamp-js/clamp.js");

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("./_tours.scss");

var ToursComponent = function (_Component) {
  _inherits(ToursComponent, _Component);

  function ToursComponent() {
    _classCallCheck(this, ToursComponent);

    return _possibleConstructorReturn(this, (ToursComponent.__proto__ || Object.getPrototypeOf(ToursComponent)).apply(this, arguments));
  }

  _createClass(ToursComponent, [{
    key: "initialize",
    value: function initialize(options) {
      var _this2 = this;

      if (this.$el[0]) {
        this.clampAt = options.clampAt || 3;
        this.blurbs = this.$el.find(".js-tour-blurb");
        this.mobileBreak = options.mobileBreak || 518;
        this.headingHeight = options.headingHeight || 18; // lovely magic numbers o_O
        this.nativeSupport = typeof this.$el[0].style.webkitLineClamp !== "undefined";

        if (!$("html").hasClass("ie9")) {
          this._clampText();

          $(window).on("resize", function () {
            _this2._clampText();
          });
        }
      }
    }
  }, {
    key: "_clampText",
    value: function _clampText() {
      var _this3 = this;

      this.blurbs.each(function (index, blurb) {
        var heading = $(blurb).prev(),
            headingEl = heading[0],
            headingLines = Math.floor(heading.height() / _this3.headingHeight),
            blurbClamp = _this3.clampAt - headingLines + 1,
            headingClamp = 3;

        try {
          if (headingLines >= 3) {
            blurbClamp = _this3.nativeSupport ? 1 : 2;
            (0, _clamp2.default)(headingEl, { clamp: headingClamp });
            (0, _clamp2.default)(blurb, { clamp: blurbClamp });
          } else {
            if (!_this3.nativeSupport) {
              blurbClamp++;
            }

            (0, _clamp2.default)(blurb, { clamp: blurbClamp });
          }
        } catch (e) {
          // Clamp broke, oh well...
        }
      });
    }
  }]);

  return ToursComponent;
}(_bane.Component);

exports.default = ToursComponent;