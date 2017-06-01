"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _search = require("../search");

var _search2 = _interopRequireDefault(_search);

var _navigation = require("../navigation");

var _navigation2 = _interopRequireDefault(_navigation);

var _navigation_state = require("../navigation/navigation_state");

var _navigation_state2 = _interopRequireDefault(_navigation_state);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The page header which contains both search and navigation.
 * Clicking on the search icons opens the search.
 * Will re-render when the browser changes sizes
 */
var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "initialize",
    value: function initialize() {
      this.state = _navigation_state2.default.getState();
      this.search = new _search2.default();
      this.navigation = new _navigation2.default({
        el: (0, _jquery2.default)(".navigation")
      });

      this.events = {
        "click .js-lp-global-header-search": "onSearchClick",
        "click .js-lp-global-header-search .navigation__link": "onSearchClick",
        "click .js-menu": "onMobileMenuClick"
      };

      this.$search = this.$el.find(".js-lp-global-header-search");
      this.$inner = this.$el.find(".js-lp-global-header-inner");

      (0, _jquery2.default)(window).resize((0, _debounce2.default)(this.render.bind(this), 100));
      this.render();

      this.$mobileNotificationBadge = require("./mobile_notification_badge.hbs");

      this.appendMenuIcon();
    }
    /**
     * Add a class to the search when it's too big for the screen
     * @return {Header} The instance of the header
     */

  }, {
    key: "render",
    value: function render() {
      var fadeClassName = "lp-global-header__search--fade";

      this.$search.removeClass(fadeClassName).toggleClass(fadeClassName, this.isTooBig());

      return this;
    }
    /**
     * If the search box is too big based on the screen width
     * @return {Boolean}
     */

  }, {
    key: "isTooBig",
    value: function isTooBig() {
      return this.$search.width() > this.$inner.width() * .42;
    }
  }, {
    key: "onSearchClick",
    value: function onSearchClick(e) {
      e.preventDefault();

      this.search.show();
    }
  }, {
    key: "onMobileMenuClick",
    value: function onMobileMenuClick(e) {
      e.preventDefault();

      this.navigation._clickNav();
    }
  }, {
    key: "appendMenuIcon",
    value: function appendMenuIcon() {
      if (this.state.cartItemCount) {
        (0, _jquery2.default)(".js-lp-global-header-mobile").prepend(this.$mobileNotificationBadge);
      }
    }
  }]);

  return Header;
}(_bane.Component);

exports.default = Header;