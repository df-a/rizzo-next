"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _events = require("../../core/mixins/events");

var _events2 = _interopRequireDefault(_events);

var _arkham = require("../../core/arkham");

var _arkham2 = _interopRequireDefault(_arkham);

var _shop_cookie_util = require("../../core/shop_cookie_util");

var _shop_cookie_util2 = _interopRequireDefault(_shop_cookie_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* mock data */

var state = {
  isOpen: false,
  isNavOpen: false,
  cartItemCount: new _shop_cookie_util2.default().getShopItemCount(),
  cart: {
    title: "YOUR SHOPPING CART",
    items: [{ name: "Thailand Travel Guide", price: "$19.99",
      image: "http://www.trentcap.com/wp/wp-content/uploads/2012/02/sample-img.png",
      alt: "Thailand Travel Guide" }, { name: "Southeast Asia on a Shoes", price: "$29.99",
      image: "http://www.trentcap.com/wp/wp-content/uploads/2012/02/sample-img.png",
      alt: "Thailand Travel Guide" }],
    action: "http://shop.lonelyplanet.com/cart/view",
    actiontitle: "PROCEED TO CHECKOUT"
  }
};

var NavigationState = {
  getState: function getState() {
    return state;
  }
};

(0, _assign2.default)(NavigationState, _events2.default);

_arkham2.default.on("navigation.click", function () {
  state.isNavOpen = !state.isNavOpen;
  NavigationState.trigger("changed:nav", state);
});

exports.default = NavigationState;