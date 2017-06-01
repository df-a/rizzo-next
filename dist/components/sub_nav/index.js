"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _desc, _value, _class;

var _bane = require("../../core/bane");

var _rizzo_events = require("../../core/rizzo_events");

var _rizzo_events2 = _interopRequireDefault(_rizzo_events);

var _subscribe = require("../../core/decorators/subscribe");

var _subscribe2 = _interopRequireDefault(_subscribe);

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

require("./_sub_nav.scss");

var SubNav = (_dec = (0, _subscribe2.default)(_rizzo_events2.default.LOAD_BELOW, "events"), _dec2 = (0, _subscribe2.default)("*.removed", "components"), _dec3 = (0, _subscribe2.default)("experiences.removed", "components"), (_class = function (_Component) {
  _inherits(SubNav, _Component);

  function SubNav() {
    _classCallCheck(this, SubNav);

    return _possibleConstructorReturn(this, (SubNav.__proto__ || Object.getPrototypeOf(SubNav)).apply(this, arguments));
  }

  _createClass(SubNav, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      var $subNav = $(".js-sub-nav"),
          $subNavPlaceholder = $(".js-sub-nav-placeholder"),
          $window = $(window);

      this.contentHeight = 0;
      this.$subNavList = this.$el.find(".js-sub-nav-list");

      this.subNavItem = require("./sub_nav_item.hbs");

      /**
       * Checks to see if a given element has been scrolled into view
       * @param  {Object}  element Element to check
       * @return {Boolean}         Is the element in view or not?
       */
      var isScrolledIntoView = function isScrolledIntoView(element) {
        var $element = $(element),
            windowTop = $window.scrollTop(),
            elementTop = $element.offset().top,
            viewportTop = windowTop + $subNav.height() * 2;

        return elementTop <= viewportTop;
      };

      if ($subNav.length) {
        (function () {
          var subNavTop = $subNav.offset().top,
              firstTrigger = true;

          _this2.subscribe();
          _this2.addClientSideComponents();

          $(document).on("click", ".js-sub-nav-link", function (e) {
            var target = this.hash;
            var $target = $(target);
            var navHeight = $subNav.height();

            e.preventDefault();

            if ($target.parents(".segment").length > 0) {
              $target = $target.parents(".segment");
            }

            $("html, body").stop().animate({
              scrollTop: $target.offset().top - navHeight
            }, 500, "swing", function () {
              window.location.hash = target;
            });
          });

          if (window.location.hash) {
            $subNav.find("[href=\"" + window.location.hash + "\"]").trigger("click");
          }

          var $links = $(".js-sub-nav-link"),
              $components = $links.map(function (i, el) {
            return document.getElementById(el.href.split("#")[1]);
          });

          $window.on("scroll", (0, _debounce2.default)(function () {
            if (firstTrigger) {
              firstTrigger = false;
            }

            var isFixed = $window.scrollTop() >= subNavTop && $window.scrollTop() <= _this2.contentHeight,
                isBottom = $window.scrollTop() >= subNavTop && $window.scrollTop() >= _this2.contentHeight;

            if (isFixed) {
              $subNav.addClass("is-fixed").removeClass("is-bottom");

              $subNavPlaceholder.addClass("is-fixed");
            } else if (isBottom) {
              $subNav.addClass("is-bottom");

              $subNavPlaceholder.addClass("is-fixed");
            } else {
              $subNav.removeClass("is-fixed is-bottom");

              $subNavPlaceholder.removeClass("is-fixed");
            }

            var $current = $components.map(function (i, el) {
              if (isScrolledIntoView(el)) {
                return el;
              }
            });

            if ($current.length) {
              $subNav.find("a").removeClass("sub-nav__link--active");

              $subNav.find("a[href*=\"#" + $current[$current.length - 1].id + "\"]").addClass("sub-nav__link--active");
            } else {
              $subNav.find("a").removeClass("sub-nav__link--active");
            }
          }, 10));

          $window.on("resize", (0, _debounce2.default)(function () {
            _this2.updateContentHeight();
          }, 10));
        })();
      }
    }
  }, {
    key: "addClientSideComponents",
    value: function addClientSideComponents() {
      $(this.subNavItem({
        id: "experiences",
        title: "Experiences"
      })).prependTo(this.$subNavList);
    }
  }, {
    key: "updateContentHeight",
    value: function updateContentHeight() {
      this.contentHeight = $(".navigation-wrapper").outerHeight();
    }
    /**
     * If a component is removed from the DOM, this will remove its subnav element
     */

  }, {
    key: "removeSubNav",
    value: function removeSubNav(data, envelope) {
      var component = envelope.topic.split(".")[0];

      this.$el.find(".sub-nav__item--" + component).remove();
    }
  }, {
    key: "addSights",
    value: function addSights() {
      if ($(".sights").length) {
        $(this.subNavItem({
          id: "sights",
          title: "Sights"
        })).prependTo(this.$subNavList);
      } else {
        $("#sights").closest(".segment").remove();
      }
    }
  }]);

  return SubNav;
}(_bane.Component), (_applyDecoratedDescriptor(_class.prototype, "updateContentHeight", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "updateContentHeight"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "removeSubNav", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "removeSubNav"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addSights", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "addSights"), _class.prototype)), _class));
exports.default = SubNav;