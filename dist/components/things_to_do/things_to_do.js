"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class;

var _component = require("../../core/component");

var _component2 = _interopRequireDefault(_component);

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

var _clamp = require("clamp-js/clamp.js");

var _clamp2 = _interopRequireDefault(_clamp);

var _rizzo = require("../../rizzo");

var _rizzo2 = _interopRequireDefault(_rizzo);

var _publish = require("../../core/decorators/publish");

var _publish2 = _interopRequireDefault(_publish);

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

/**
 * Show a list of Top Experiences
 */
var ThingsToDo = (_dec = (0, _publish2.default)("experiences.removed"), (_class = function (_Component) {
  _inherits(ThingsToDo, _Component);

  function ThingsToDo() {
    _classCallCheck(this, ThingsToDo);

    return _possibleConstructorReturn(this, (ThingsToDo.__proto__ || Object.getPrototypeOf(ThingsToDo)).apply(this, arguments));
  }

  _createClass(ThingsToDo, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.currentIndex = this.getCurrentIndex() || 0;

      this.options = {
        numOfCards: 4
      };

      this.events = {
        "click .js-ttd-more": "loadMore",
        "click .js-ttd-less": "loadPrevious",
        "swiperight": "loadPrevious",
        "swipeleft": "loadMore"
      };

      this.fetchCards().done(this.cardsFetched.bind(this)).fail(function (jqXHR) {
        _rizzo2.default.logger.error(new Error("\n        Could not fetch /api/" + window.lp.place.slug + "/experiences.json.\n        Response Text: " + jqXHR.responseText + ".\n        Status: " + jqXHR.statusText + "\n        "));
        return _this2.nukeIt();
      });

      this.navigation = require("./things_to_do_navigation.hbs");
    }
  }, {
    key: "getCurrentIndex",
    value: function getCurrentIndex() {
      var obj = window.localStorage && JSON.parse(window.localStorage.getItem("ttd.currentIndex"));
      if (!obj || obj.slug !== window.lp.place.slug) {
        return;
      }

      return obj.index;
    }
  }, {
    key: "fetchCards",
    value: function fetchCards() {
      var op_variant = window.location.href.match(/op_variant=true/);
      if (op_variant == null) {
        return $.ajax({
          url: "/api/" + window.lp.place.slug + "/experiences.json"
        });
      } else {
        return $.ajax({
          url: "/api/" + window.lp.place.slug + "/experiences.json?op_variant=true"
        });
      }
    }
  }, {
    key: "nukeIt",
    value: function nukeIt() {
      $("#experiences").remove();
    }
    // TODO: jc this is... smelly

  }, {
    key: "cardsFetched",
    value: function cardsFetched(cards) {
      if (!cards.length) {
        return this.nukeIt();
      }
      this.cards = cards;

      if (cards.length > 4) {
        this.addNavigationButtons();
      }
      if (this.currentIndex >= this.options.numOfCards) {
        this.showPrevious();
      }
      if (this.currentIndex + 4 >= this.cards.length) {
        this.hideShowMore();
      }

      this.template = require("./thing_to_do_card.hbs");
      this.render(this.nextCards());

      this.clampImageCardTitle();
    }
  }, {
    key: "addNavigationButtons",
    value: function addNavigationButtons() {
      this.$el.find(".js-ttd-navigation").html(this.navigation());
    }
    /**
     * Get the next 4 cards to render
     * @return {Array} An array of rendered templates
     */

  }, {
    key: "nextCards",
    value: function nextCards() {
      var _this3 = this;

      if (this.currentIndex >= this.cards.length) {
        this.currentIndex = 0;
      } else if (this.currentIndex < 0) {
        this.currentIndex = this.cards.length - (this.cards.length % this.options.numOfCards || this.options.numOfCards);
      }

      return this.cards.slice(this.currentIndex, this.currentIndex + this.options.numOfCards).map(function (card, i) {
        Object.assign(card.card, {
          card_num: i + _this3.currentIndex + 1,
          order: i
        });
        return _this3.template(card);
      });
    }
  }, {
    key: "render",
    value: function render(cards) {
      this.$el.find(".js-ttd-list").html(cards.join(""));

      this.loadImages(this.$el.find(".js-image-card-image"));
    }
  }, {
    key: "loadImages",
    value: function loadImages(images) {
      var _this4 = this;

      var imagePromises = [];

      images.each(function (index, element) {
        var $el = $(element),
            imageUrl = $el.data("image-url"),
            backupUrl = $el.data("backupimage-url");

        imagePromises.push(_this4.lazyLoadImage(imageUrl).then(undefined, function () {
          return _this4.lazyLoadImage(backupUrl);
        }).then(function (url) {
          $el.css({
            "background-image": "url(" + url + ")"
          }).addClass("is-visible");
        }).catch(function (url) {
          -_rizzo2.default.logger.log("Could not load image: " + url);
        }));
      });

      return Promise.all(imagePromises);
    }
  }, {
    key: "makeNextList",
    value: function makeNextList() {
      var cards = this.nextCards();
      if (window.localStorage) {
        try {
          window.localStorage.setItem("ttd.currentIndex", JSON.stringify({ index: this.currentIndex, slug: window.lp.place.slug }));
        } catch (e) {
          _rizzo2.default.logger.log("Couldn't set TTD in local storage");
        }
      }

      // Create a new list and place it on top of existing list
      return $("<ul />", {
        "class": "ttd__list js-ttd-list"
      }).append(cards);
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this5 = this;

      var reverse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var $list = this.$el.find(".js-ttd-list"),
          ttdComponentWidth = this.$el.width();

      var $nextList = this.makeNextList();

      $nextList.css({
        "margin-top": "-" + $list.outerHeight(true) + "px",
        "transform": "translate3d(" + (reverse ? "-" : "") + ttdComponentWidth + "px, 0, 0)"
      });
      this.loadImages($nextList.find(".js-image-card-image"));

      this.animating = true;

      $list.after($nextList).css("transform", "translate3d(" + (reverse ? "" : "-") + ttdComponentWidth + "px, 0, 0)");

      setTimeout(function () {
        $nextList.css("transform", "translate3d(0, 0, 0)");
      }, 30);

      if (!reverse && this.currentIndex + 4 >= this.cards.length) {
        this.hideShowMore();
      } else if (reverse && this.currentIndex - 4 < 0) {
        this.hideShowPrevious();
      }

      return (0, _waitForTransition2.default)($nextList, { fallbackTime: 600 }).then(function () {
        $list.remove();
        $nextList.css("margin-top", 0);
        _this5.animating = false;
      });
    }
    /**
     * Load more top things to do. Callback from click on load more button.
     * @param  {jQuery.Event} e The DOM event
     */

  }, {
    key: "loadMore",
    value: function loadMore(e) {
      e.preventDefault();
      if (this.animating || this.currentIndex + 4 >= this.cards.length) {
        return;
      }
      // Grab the next 4 images
      this.showMoreAndPrevious();
      this.currentIndex += this.options.numOfCards;

      // Forward
      this.animate();
    }
  }, {
    key: "loadPrevious",
    value: function loadPrevious(e) {
      e.preventDefault();
      if (this.animating || this.currentIndex - 4 < 0) {
        return;
      }
      // Grab the next 4 images
      this.showMoreAndPrevious();
      this.currentIndex -= this.options.numOfCards;

      // Reverse
      this.animate(true);
    }
  }, {
    key: "showMore",
    value: function showMore() {
      this.$el.find(".js-ttd-more").prop("disabled", false);
    }
  }, {
    key: "showPrevious",
    value: function showPrevious() {
      this.$el.find(".js-ttd-less").prop("disabled", false);
    }
  }, {
    key: "showMoreAndPrevious",
    value: function showMoreAndPrevious() {
      this.showMore();
      this.showPrevious();
    }
  }, {
    key: "hideShowMore",
    value: function hideShowMore() {
      this.$el.find(".js-ttd-more").prop("disabled", true);
    }
  }, {
    key: "hideShowPrevious",
    value: function hideShowPrevious() {
      this.$el.find(".js-ttd-less").prop("disabled", true);
    }

    /**
     * Lazy load an image
     * @param  {String} url Image url to lazy load
     * @return {Promise} A promise that resolves when the image has loaded
     */

  }, {
    key: "lazyLoadImage",
    value: function lazyLoadImage(url) {
      var self = this,
          image = new Image();

      this.imagePromises = this.imagePromises || {};

      if (this.imagePromises[url]) {
        return this.imagePromises[url];
      }

      var promise = new Promise(function (resolve, reject) {
        image.src = url;
        image.onload = function () {
          // Only cache the promise when it's successfully loading an image
          self.imagePromises[url] = promise;
          resolve(url);
        };
        image.onerror = function () {
          reject(url);
        };

        if (!url) {
          reject(url);
        }
      });

      return promise;
    }

    /**
     * Clamp a card title
     * @return null
     */

  }, {
    key: "clampImageCardTitle",
    value: function clampImageCardTitle() {
      $.each($(".js-image-card-title"), function () {
        (0, _clamp2.default)($(this).get(0), { clamp: 2 });
      });
    }
  }]);

  return ThingsToDo;
}(_component2.default), (_applyDecoratedDescriptor(_class.prototype, "nukeIt", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "nukeIt"), _class.prototype)), _class));
exports.default = ThingsToDo;