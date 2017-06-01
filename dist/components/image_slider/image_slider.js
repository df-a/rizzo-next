"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

require("owlcarousel-pre/owl-carousel/owl.carousel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component for creating an Image Slider
 */
var ImageSliderComponent = function (_Component) {
  _inherits(ImageSliderComponent, _Component);

  function ImageSliderComponent() {
    _classCallCheck(this, ImageSliderComponent);

    return _possibleConstructorReturn(this, (ImageSliderComponent.__proto__ || Object.getPrototypeOf(ImageSliderComponent)).apply(this, arguments));
  }

  _createClass(ImageSliderComponent, [{
    key: "initialize",
    value: function initialize(options) {
      options.afterMove = options.afterInit = options.afterUpdate = this.onUpdate;

      this.events = {
        "click .owl-next": "onNextClick",
        "click .owl-prev": "onPrevClick"
      };

      var $owlSlider = (0, _jquery2.default)(options.el).find(".owl-carousel").owlCarousel(options);
      this.slider = $owlSlider.data("owlCarousel");
    }
  }, {
    key: "onPrevClick",
    value: function onPrevClick(event) {
      event.preventDefault();
      this.slider.prev();
    }
  }, {
    key: "onNextClick",
    value: function onNextClick(event) {
      event.preventDefault();
      this.slider.next();
    }
  }, {
    key: "onUpdate",
    value: function onUpdate() {
      var last = this.visibleItems.length + this.currentItem == this.itemsAmount,
          first = this.currentItem == 0;

      if (last) {
        (0, _jquery2.default)(this.options.el + " .owl-next").hide();
      } else {
        (0, _jquery2.default)(this.options.el + " .owl-next").show();
      }

      if (first) {
        (0, _jquery2.default)(this.options.el + " .owl-prev").hide();
      } else {
        (0, _jquery2.default)(this.options.el + " .owl-prev").show();
      }
    }
  }]);

  return ImageSliderComponent;
}(_bane.Component);

exports.default = ImageSliderComponent;