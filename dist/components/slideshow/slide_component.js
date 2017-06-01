"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlideComponent = function (_Component) {
  _inherits(SlideComponent, _Component);

  function SlideComponent() {
    _classCallCheck(this, SlideComponent);

    return _possibleConstructorReturn(this, (SlideComponent.__proto__ || Object.getPrototypeOf(SlideComponent)).apply(this, arguments));
  }

  _createClass(SlideComponent, [{
    key: "initialize",
    value: function initialize(options) {
      this.model = options.model;
      this.preloadPromise = {};
      if (!this.model) {
        throw new Error("Missing slide model");
      }
    }
  }, {
    key: "getElement",
    value: function getElement() {
      var $el = this.currentEl = $("<div />", {
        "class": "slideshow__slide"
      });

      $el.css({
        "background-image": "url(" + this.imageUrl + ")"
      }).attr("data-strapline", this.model.strapline);

      return $el;
    }
  }, {
    key: "preload",
    value: function preload() {
      var _this2 = this;

      // return if already preloaded
      if (this.preloadPromise[SlideComponent.imageSize]) {
        return this.preloadPromise[SlideComponent.imageSize];
      }

      var promise = this.preloadPromise[SlideComponent.imageSize] = new Promise(function (resolve) {
        var image = new Image();

        image.src = _this2.imageUrl;
        image.onload = function () {
          resolve();
        };
        image.onerror = function () {
          resolve();
        };
      });

      return promise;
    }
  }, {
    key: "show",
    value: function show() {
      var $el = this.currentEl;

      $el.addClass("slideshow__slide--visible");

      return (0, _waitForTransition2.default)($el);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.currentEl.remove();
    }
  }, {
    key: "imageUrl",
    get: function get() {
      return this.model[SlideComponent.imageSize];
    }
  }], [{
    key: "imageSize",
    get: function get() {
      if (Modernizr.mq("only screen and (min-width: 1200px)")) {
        return "large";
      }

      if (Modernizr.mq("only screen and (min-width: 720px)")) {
        return "medium";
      }

      return "small";
    }
  }]);

  return SlideComponent;
}(_bane.Component);

exports.default = SlideComponent;