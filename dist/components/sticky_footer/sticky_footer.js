"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class;

var _bane = require("../../core/bane");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

var _subscribe = require("../../core/decorators/subscribe");

var _subscribe2 = _interopRequireDefault(_subscribe);

var _progress = require("../progress");

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var StickyFooterComponent = (_dec = (0, _subscribe2.default)("loaded", "articles"), (_class = function (_Component) {
  _inherits(StickyFooterComponent, _Component);

  function StickyFooterComponent() {
    _classCallCheck(this, StickyFooterComponent);

    return _possibleConstructorReturn(this, (StickyFooterComponent.__proto__ || Object.getPrototypeOf(StickyFooterComponent)).apply(this, arguments));
  }

  _createClass(StickyFooterComponent, [{
    key: "initialize",
    value: function initialize(options) {
      this.options = options;
      this.articleOffsetTop = this.options.articleOffsetTop;
      this.amountNeededToScroll = this.options.amountNeededToScroll;
      this.state = this.options.state;

      this.$document = (0, _jquery2.default)(document);
      this.$window = (0, _jquery2.default)(window);
      this.$progress = this.$el.find(".js-lp-progress");

      this.transitionSpeed = 400;
      this.scrollEventName = "scroll.stickyFooter";
      this.offScreenClassName = "off-screen";
      this.currentItem = ".js-lp-sticky-footer-current-item";
      this.nextItem = ".js-lp-sticky-footer-next-item";
      this.nextItemClicked = false;
      this.lastScrollTop = 0;
      this.isHidden = true;

      this.events = _defineProperty({}, "click " + this.nextItem, "_goToNextItem");

      this.progressComponent = new _progress2.default({
        el: this.$progress,
        width: 0
      });

      this.subscribe();
    }
  }, {
    key: "scroll",
    value: function scroll() {
      var _this2 = this;

      this.$window.on(this.scrollEventName, (0, _debounce2.default)(function () {
        _this2.scrollDirection = _this2.$window.scrollTop() > _this2.lastScrollTop ? "down" : "up";
        _this2.lastScrollTop = _this2.$window.scrollTop();

        if (_this2.$window.scrollTop() >= _this2.amountNeededToScroll) {
          if (_this2.scrollDirection === "down") {
            _this2.progressComponent.fill();
          }

          if (!_this2.isHidden) {
            _this2.hide();
          }

          return (0, _waitForTransition2.default)(_this2.$el, { fallbackTime: _this2.transitionSpeed }).then(function () {
            _this2.progressComponent.reset();
          });
        } else if (_this2.$window.scrollTop() >= _this2.articleOffsetTop) {
          if (_this2.isHidden) {
            _this2.show();
          }
        } else {
          if (!_this2.isHidden) {
            _this2.hide();
          }
        }

        _this2.progressComponent.update((_this2.$window.scrollTop() - _this2.articleOffsetTop) / (_this2.amountNeededToScroll - _this2.articleOffsetTop) * 100);
      }, 10));
    }
  }, {
    key: "update",
    value: function update(articleOffsetTop, amountNeededToScroll, state) {
      var _this3 = this;

      this.articleOffsetTop = articleOffsetTop;
      this.amountNeededToScroll = amountNeededToScroll;
      this.state = state;

      if (this.scrollDirection === "up") {
        return (0, _waitForTransition2.default)(this.$el, { fallbackTime: this.transitionSpeed }).then(function () {
          _this3.progressComponent.fill();
          _this3._setContent(state);
        });
      }

      this._setContent(state);
    }
  }, {
    key: "recalculate",
    value: function recalculate(amountNeededToScroll) {
      this.amountNeededToScroll = amountNeededToScroll;
    }
  }, {
    key: "show",
    value: function show() {
      this.isHidden = false;

      this.$el.removeClass(this.offScreenClassName);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.isHidden = true;

      this.$el.addClass(this.offScreenClassName);
    }
  }, {
    key: "detach",
    value: function detach() {
      this.$el.detach();
      this.$window.off(this.scrollEventName);
    }
  }, {
    key: "attach",
    value: function attach() {
      this.$el.appendTo("body");
    }
  }, {
    key: "_setContent",
    value: function _setContent(state) {
      this.nextTitle = state.next.title;
      this.nextSlug = state.next.slug;
      this.nextId = this.nextSlug.split("/")[this.nextSlug.split("/").length - 1];

      this.$el.find(this.currentItem).html(state.current.title);

      this.$el.find(this.nextItem).html(this.nextTitle).attr({
        "href": "/" + this.nextSlug,
        "data-article-id": this.nextId
      });
    }
  }, {
    key: "_goToNextItem",
    value: function _goToNextItem(event) {
      event.preventDefault();

      if ((0, _jquery2.default)("#" + this.nextId).length) {
        this.$window.scrollTop((0, _jquery2.default)("#" + this.nextId).offset().top + 1);
      } else {
        this.nextItemClicked = true;
        this.$window.scrollTop(this.$document.height());
      }
    }
  }, {
    key: "_scrollToNextItem",
    value: function _scrollToNextItem(data) {
      if (this.nextItemClicked) {
        this.$window.scrollTop((0, _jquery2.default)("#" + data.id).offset().top - 120);
        this.nextItemClicked = false;
      }
    }
  }]);

  return StickyFooterComponent;
}(_bane.Component), (_applyDecoratedDescriptor(_class.prototype, "_scrollToNextItem", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "_scrollToNextItem"), _class.prototype)), _class));
exports.default = StickyFooterComponent;