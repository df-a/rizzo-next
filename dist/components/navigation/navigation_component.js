"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _desc, _value, _class;

var _bane = require("../../core/bane");

var _overlay = require("../overlay");

var _overlay2 = _interopRequireDefault(_overlay);

var _notification = require("../notification/notification");

var _notification2 = _interopRequireDefault(_notification);

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

var _navigation_actions = require("./navigation_actions");

var _navigation_actions2 = _interopRequireDefault(_navigation_actions);

var _navigation_state = require("./navigation_state");

var _navigation_state2 = _interopRequireDefault(_navigation_state);

var _subscribe = require("../../core/decorators/subscribe");

var _subscribe2 = _interopRequireDefault(_subscribe);

var _matchMedia = require("../../core/utils/matchMedia");

var _matchMedia2 = _interopRequireDefault(_matchMedia);

var _breakpoints = require("../../core/utils/breakpoints");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

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

var userPanelTemplate = require("./user_panel.hbs"),
    userAvatarTemplate = require("./user_avatar.hbs"),
    userLinkTemplate = require("./user_link.hbs");

var NavigationComponent = (_dec = (0, _subscribe2.default)("user.status.update"), _dec2 = (0, _subscribe2.default)("user.notifications.update"), (_class = function (_Component) {
  _inherits(NavigationComponent, _Component);

  function NavigationComponent() {
    _classCallCheck(this, NavigationComponent);

    return _possibleConstructorReturn(this, (NavigationComponent.__proto__ || Object.getPrototypeOf(NavigationComponent)).apply(this, arguments));
  }

  _createClass(NavigationComponent, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.state = _navigation_state2.default.getState();
      this.overlay = new _overlay2.default();
      this.cartUrl = "http://shop.lonelyplanet.com/cart/update";

      var notificationLabel = this.state.cartItemCount === 1 ? "item" : "items";

      this.notification = new _notification2.default({
        target: this.$el.find(".js-cart-notification"),
        content: this.state.cartItemCount,
        className: "notification-badge--shop",
        label: this.state.cartItemCount + " " + notificationLabel + " in your cart",
        href: this.cartUrl
      });

      (0, _matchMedia2.default)("(min-width: " + _breakpoints2.default.min["720"] + ")", function (query) {
        if (query.matches) {
          _this2.notification.$el.find(".js-notification-badge").removeClass("notification-badge--shop-inline").addClass("notification-badge--shop");
        } else {
          _this2.notification.$el.find(".js-notification-badge").removeClass("notification-badge--shop").addClass("notification-badge--shop-inline").text("");
        }
      });

      this.name = "navigation";
      this.$mobileNavigation = this.$el.find(".mobile-navigation").detach();
      this.$mobileNavigation.removeClass("mobile-navigation--hidden");
      this.$mobileNavigation.on("click", ".js-close", this._clickNav.bind(this));
      this.$mobileNavigation.on("click", ".js-nav-item", this._handleClick.bind(this));

      this.$el.on("touchstart", ".js-nav-item", this._handleClick.bind(this));

      this.updateShopUrl();

      // SubNavigation hover
      this.handleHover();

      // Events
      this.listenTo(_navigation_state2.default, "changed:nav", this.toggleNav);
      this.listenTo(this.overlay, "click", this._clickNav);

      this.subscribe();
    }
    /**
     * Set up hover events to trigger the sub menu's opening and closing.
     * Use event delegation here because the user login is dynamically added.
     * @return {[type]} [description]
     */

  }, {
    key: "_handleClick",
    value: function _handleClick(e) {
      var $target = $(e.currentTarget);

      $target.hasClass("navigation__item") ? this._handleSubNav($target[0]) : this._handleMobileSubNav($target[0]);

      if ($target.find(".mobile-sub-navigation").length && !$(e.target).hasClass("sub-navigation__link") && !$(e.target).closest("a").hasClass("sub-navigation-feature")) {
        e.preventDefault();
      }
    }
  }, {
    key: "_handleMobileSubNav",
    value: function _handleMobileSubNav(el) {
      var $navItem = $(el).find(".mobile-sub-navigation");

      if ($(".is-expanded").length && !$navItem.hasClass("is-expanded")) {
        this.$mobileNavigation.find(".mobile-sub-navigation").removeClass("is-expanded");
        this.$mobileNavigation.find(".js-nav-item").removeClass("clicked");
      }

      $(el).toggleClass("clicked");
      $navItem.toggleClass("is-expanded");
    }
  }, {
    key: "_handleSubNav",
    value: function _handleSubNav(el) {
      if ($(el).find(".sub-navigation").hasClass("sub-navigation--visible")) {
        this._closeSubNav(el);
      } else {
        this._openSubNav(el);
      }
    }
  }, {
    key: "_openSubNav",
    value: function _openSubNav(el) {
      clearTimeout(this.hideTimer);

      // Always clear the currently active one
      this.$el.find(".sub-navigation").removeClass("sub-navigation--visible");

      this.showTimer = setTimeout(function () {
        $(el).find(".sub-navigation").addClass("sub-navigation--visible");
      }, 0);
    }
  }, {
    key: "_closeSubNav",
    value: function _closeSubNav(el) {
      clearTimeout(this.showTimer);

      this.hideTimer = setTimeout(function () {
        $(el).find(".sub-navigation").removeClass("sub-navigation--visible");
      }, 100);
    }
  }, {
    key: "handleHover",
    value: function handleHover() {
      var _this3 = this;

      this.$el.on("mouseenter", ".js-nav-item", function (e) {
        return _this3._openSubNav(e.currentTarget);
      });
      this.$el.on("mouseleave", ".js-nav-item", function (e) {
        return _this3._closeSubNav(e.currentTarget);
      });
    }
  }, {
    key: "toggleNav",
    value: function toggleNav() {
      if (this.state.isNavOpen) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this4 = this;

      if (!this.state.isNavOpen) {
        return Promise.all([]);
      }

      if (this.$mobileNavigation.parents().length === 0) {
        this.$mobileNavigation.appendTo(document.body);
      }

      this.overlay.show();

      setTimeout(function () {
        _this4.$mobileNavigation.addClass("mobile-navigation--visible");
      }, 20);

      return (0, _waitForTransition2.default)(this.$mobileNavigation, { fallbackTime: 2000 });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this5 = this;

      if (this.state.isNavOpen) {
        return Promise.all([]);
      }

      this.$mobileNavigation.removeClass("mobile-navigation--visible");

      this.overlay.hide();

      return (0, _waitForTransition2.default)(this.$mobileNavigation, { fallbackTime: 2000 }).then(function () {
        _this5.$mobileNavigation.detach();
      });
    }
  }, {
    key: "_clickNav",
    value: function _clickNav() {
      _navigation_actions2.default.clickNav();
    }

    /**
     * Change shop URL depending on if there are items in the cart
     */

  }, {
    key: "updateShopUrl",
    value: function updateShopUrl() {
      var shopUrl = this.state.cartItemCount ? this.cartUrl : "http://shop.lonelyplanet.com/";

      $(".js-cart-notification").find(".navigation__link").attr("href", shopUrl);
    }
  }, {
    key: "userStatusUpdate",
    value: function userStatusUpdate(user) {
      var $li = this.$el.find(".navigation__item--user"),
          $liMobile = this.$mobileNavigation.find(".mobile-navigation__item--user");

      if (!user.id) {
        return;
      }

      $li.html(userAvatarTemplate({
        user: user
      })).append(userPanelTemplate({
        className: "sub-navigation",
        user: user
      }));

      $liMobile.html(userLinkTemplate({
        user: user
      })).append(userPanelTemplate({
        className: "mobile-sub-navigation",
        user: user
      }));
    }
  }, {
    key: "userNotificationUpdate",
    value: function userNotificationUpdate(user) {
      this.userStatusUpdate(user);
    }
  }]);

  return NavigationComponent;
}(_bane.Component), (_applyDecoratedDescriptor(_class.prototype, "userStatusUpdate", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "userStatusUpdate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "userNotificationUpdate", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "userNotificationUpdate"), _class.prototype)), _class));
exports.default = NavigationComponent;