"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

var _slide_component = require("./slide_component");

var _slide_component2 = _interopRequireDefault(_slide_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * slideshow Component
*/
var Slideshow = function (_Component) {
  _inherits(Slideshow, _Component);

  function Slideshow() {
    _classCallCheck(this, Slideshow);

    return _possibleConstructorReturn(this, (Slideshow.__proto__ || Object.getPrototypeOf(Slideshow)).apply(this, arguments));
  }

  _createClass(Slideshow, [{
    key: "initialize",
    value: function initialize(options) {
      this.options = options;
      this.$el.addClass("slideshow--" + this.type);
      this.currentSlideIndex = 0;

      this.events = {
        "click [class*=\"--num_-1\"]": "goLeft",
        "click [class*=\"--num_1\"]": "goRight"
      };

      var state = this.getInitialState();

      if (!state.images && !this.options.images) {
        return;
      }

      this.createBaseSlides(state);
      this.initSlideShow();

      if (this.slides.length > 1) {
        this.setCssClasses();
        this.startLoop();
      }
    }
  }, {
    key: "createBaseSlides",
    value: function createBaseSlides(state) {
      var _this2 = this;

      var images = state.images || this.options.images || [];

      var hasStraplines = false;

      images.forEach(function (imageData) {
        var slide = new _slide_component2.default({
          model: imageData
        });

        if (imageData.strapline) {
          hasStraplines = true;
        }

        _this2.slides.push(slide);
      });

      if (!hasStraplines) {
        this.$el.find(".slideshow__straplines").remove();
      }

      if (this.options.showProgress && images.length > 1) {
        this.makeProgress();
      }
    }
  }, {
    key: "initSlideShow",
    value: function initSlideShow() {
      var _this3 = this;

      var state = this.getNewState();

      this.showStraplineByIndex(this.currentSlideIndex);

      this.$firstImage = this.$images.find(".slideshow__slide");

      state.forEach(function (index) {
        var $el = _this3.slides[index].getElement();

        _this3.stack.push($el);

        $el.appendTo(_this3.$images);

        // This removes the original first image to stop a flash when the new ones are added
        if (index === 0) {
          _this3.$firstImage.remove();
        }
      });

      if (this.options.height) {
        this.$el.height(this.options.height);
      }
    }
  }, {
    key: "startLoop",
    value: function startLoop() {
      var _this4 = this;

      return new Promise(function (resolve) {
        _this4.loopTimer = setTimeout(resolve, Slideshow.loopSpeed);
      }).then(function () {
        return _this4.showNext();
      }).then(this.startLoop.bind(this));
    }
  }, {
    key: "goRight",
    value: function goRight() {
      if (this.isAnimating) {
        return Promise.all([]);
      }

      clearTimeout(this.loopTimer);

      return this.showNext().then(this.startLoop.bind(this));
    }
  }, {
    key: "goLeft",
    value: function goLeft() {
      if (this.isAnimating) {
        return Promise.all([]);
      }

      clearTimeout(this.loopTimer);

      return this.showNext({ reverse: true }).then(this.startLoop.bind(this));
    }
  }, {
    key: "getNewState",
    value: function getNewState() {
      if (this.slides.length === 1) {
        return [0];
      }

      var arr = [];

      for (var i = -this.padding; i <= this.padding; i++) {
        arr.push(this.getSlideFromIndex(i));
      }

      // E.G., make sure if the array has [0,0,0], it only returns [0]
      return arr;
    }

    // TODO: Fix double overflow (more then one circle)

  }, {
    key: "getSlideFromIndex",
    value: function getSlideFromIndex(index) {
      var currentIndex = this.currentSlideIndex;
      var nextIndex = currentIndex + index;
      var output = nextIndex;

      if (nextIndex < 0) {
        output = this.slides.length + currentIndex + index;
      }

      if (nextIndex > this.slides.length - 1) {
        output = nextIndex - this.slides.length;
      }

      if (output < 0 || output >= this.slides.length) {
        return 0;
      }

      return output;
    }
  }, {
    key: "setCssClasses",
    value: function setCssClasses() {
      var i = -this.padding;

      this.stack.forEach(function ($el) {
        $el.attr("class", "slideshow__slide slideshow__slide--num_" + i++);
      });

      if (this.options.showProgress) {
        this.updateProgress();
      }
    }
  }, {
    key: "showNext",
    value: function showNext() {
      var _this5 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$reverse = _ref.reverse,
          reverse = _ref$reverse === undefined ? false : _ref$reverse;

      var currentIndex = this.currentSlideIndex = reverse ? this.getPrevIndex(this.currentSlideIndex) : this.getNextIndex(this.currentSlideIndex);

      var state = this.getNewState();

      this.isAnimating = true;

      // remove first/last element of stack, [0,1,2,3] -> [1,2,3]
      var toBeRemoved = reverse ? this.stack.pop() : this.stack.shift();

      // add new item to stack, [1,2,3] -> [1,2,3,4]
      var nextIndexIn = reverse ? state[0] : state[state.length - 1];
      var nextSlide = this.slides[nextIndexIn];
      var nextEl = nextSlide.getElement();

      if (reverse) {
        this.stack.unshift(nextEl);
      } else {
        this.stack.push(nextEl);
      }

      // preLoad new image before animating
      return nextSlide.preload().then(function () {
        // remove old element
        $(toBeRemoved[0]).remove();

        // insert new element
        nextEl.addClass("slideshow__slide--next").appendTo(_this5.$images);

        // reset all css classes on stack for positioning / animation
        _this5.setCssClasses();
      }).then(function () {
        _this5.showStraplineByIndex(currentIndex);
      }).then(function () {
        // 5. wait for slide animation on primary slide
        return (0, _waitForTransition2.default)(_this5.stack[_this5.padding]);
      }).then(function () {
        _this5.isAnimating = false;
      });
    }
  }, {
    key: "getPrevIndex",
    value: function getPrevIndex(index) {
      var prevIndex = index - 1;

      if (prevIndex < 0) {
        prevIndex = this.slides.length - 1;
      }

      return prevIndex;
    }
  }, {
    key: "getNextIndex",
    value: function getNextIndex(index) {
      var nextIndex = index + 1;

      if (nextIndex > this.slides.length - 1) {
        nextIndex = 0;
      }

      return nextIndex;
    }
  }, {
    key: "showStraplineByIndex",
    value: function showStraplineByIndex(index) {
      this.trigger("image.changed", {
        index: index
      });
    }
  }, {
    key: "makeProgress",
    value: function makeProgress() {
      var _this6 = this;

      this.$progress = $("<div />", {
        "class": "slideshow__progress"
      });

      this.slides.forEach(function () {
        _this6.$progress.append($("<span />", {
          "class": "slideshow__progress__dot"
        }));
      });

      this.$images.append(this.$progress);
    }
  }, {
    key: "updateProgress",
    value: function updateProgress() {
      var $dots = this.$progress.find(".slideshow__progress__dot");

      $dots.removeClass("slideshow__progress__dot--active");

      $dots.eq(this.currentSlideIndex).addClass("slideshow__progress__dot--active");
    }
  }, {
    key: "padding",
    get: function get() {
      return this.type === "slide" ? 2 : 1;
    }
  }, {
    key: "slides",
    get: function get() {
      return this._slides || (this._slides = []);
    }
  }, {
    key: "stack",
    get: function get() {
      return this._stack || (this._stack = []);
    }
  }, {
    key: "$images",
    get: function get() {
      if (!this._$images) {
        this._$images = this.$el.find(".slideshow__images");

        if (!this._$images.length) {
          this._$images = $("<div />", {
            "class": "slideshow__images"
          }).appendTo(this.$el);
        }
      }

      return this._$images;
    }
  }, {
    key: "type",
    get: function get() {
      return this.options.type || "fade";
    }
  }], [{
    key: "loopSpeed",
    get: function get() {
      return 6000;
    }
  }]);

  return Slideshow;
}(_bane.Component);

exports.default = Slideshow;