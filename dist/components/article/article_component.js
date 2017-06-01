"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _desc, _value, _class;

var _bane = require("../../core/bane");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _debounce = require("lodash/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

var _article_body = require("../article_body");

var _article_body2 = _interopRequireDefault(_article_body);

var _social_share = require("../social_share");

var _social_share2 = _interopRequireDefault(_social_share);

var _track = require("../../core/decorators/track");

var _track2 = _interopRequireDefault(_track);

var _publish = require("../../core/decorators/publish");

var _publish2 = _interopRequireDefault(_publish);

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

var _article_model = require("./article_model");

var _article_model2 = _interopRequireDefault(_article_model);

var _rizzo = require("../../rizzo");

var _rizzo2 = _interopRequireDefault(_rizzo);

var _subscribe = require("../../core/decorators/subscribe");

var _subscribe2 = _interopRequireDefault(_subscribe);

var _matchMedia = require("../../core/utils/matchMedia");

var _matchMedia2 = _interopRequireDefault(_matchMedia);

var _breakpoints = require("../../core/utils/breakpoints");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _sticky_footer = require("../sticky_footer");

var _sticky_footer2 = _interopRequireDefault(_sticky_footer);

var _stringHelpers = require("../../core/utils/stringHelpers");

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

var adpackage = document.cookie.match(/adpackage/);

var ArticleComponent = (_dec = (0, _subscribe2.default)("ad.loaded", "ads"), _dec2 = (0, _publish2.default)("loaded", "articles"), _dec3 = (0, _track2.default)("article pageview scroll"), _dec4 = (0, _publish2.default)("reload", "ads"), (_class = function (_Component) {
  _inherits(ArticleComponent, _Component);

  function ArticleComponent() {
    _classCallCheck(this, ArticleComponent);

    return _possibleConstructorReturn(this, (ArticleComponent.__proto__ || Object.getPrototypeOf(ArticleComponent)).apply(this, arguments));
  }

  _createClass(ArticleComponent, [{
    key: "initialize",
    value: function initialize() {
      this.canUseScrollFeature = window.history && window.history.replaceState;

      this.subscribe();

      this._resetWindowScrollPosition();

      this.$document = (0, _jquery2.default)("html");
      this.$window = (0, _jquery2.default)(window);

      this.isNextArticleLoading = false;
      this.howManyArticlesHaveLoaded = 1;
      this.maxAdTimeout = 500;

      this.template = require("./article.hbs");
      this.loader = require("./article-loading.hbs");
      this.adLeaderboardTemplate = require("../ads/ad_article_leaderboard.hbs");

      this.articles = new Map();
      this.viewedArticles = [];
      this.listOfArticles = [];
      this.state = {};

      this.$globalFooter = (0, _jquery2.default)(".lp-global-footer");

      this._setFirstArticle();
      this._detachGlobalFooter();
    }
  }, {
    key: "_insertInlineAdSlots",
    value: function _insertInlineAdSlots($article) {
      var $articleBody = $article.find(".js-article-body");
      var articleCount = this.howManyArticlesHaveLoaded;
      var interval = 6;
      var adSlot = function adSlot(adNumber) {
        return "<div class=\"adunit--articles-inline\" id=\"ad-articles-article-" + articleCount + "-ad-" + adNumber + "\" />";
      };

      var paragraphs = $articleBody.find("p").filter(function (index, p) {
        return !(0, _jquery2.default)(p).attr("class") || (0, _jquery2.default)(p).attr("class") === "feature";
      });

      (0, _jquery2.default)(paragraphs).each(function (index, p) {
        var notFirst = index !== 0;
        var atEachInterval = (index + 1) % interval === 0;
        var adCount = (index + 1) / interval;

        if (notFirst && atEachInterval) {
          (0, _jquery2.default)(p).after(adSlot(adCount));
        }
      });
    }
  }, {
    key: "_detachGlobalFooter",
    value: function _detachGlobalFooter() {
      this.$globalFooter.detach();
    }
  }, {
    key: "_adsLoaded",
    value: function _adsLoaded(data) {
      if (data.size === "leaderboard-responsive") {
        if (!this.hasAdTimeoutResolved) {
          clearTimeout(this.adTimer);
          this.adLoadedPromise && this.adLoadedPromise();
        }
      }
    }
  }, {
    key: "_createIdForArticle",
    value: function _createIdForArticle(slug) {
      return slug.split("/")[slug.split("/").length - 1];
    }

    /**
     * Reset the window's previous scroll position when the page loads
     */

  }, {
    key: "_resetWindowScrollPosition",
    value: function _resetWindowScrollPosition() {
      window.onunload = function () {
        (0, _jquery2.default)(window).scrollTop(0);
      };
    }
  }, {
    key: "_createStickyFooter",
    value: function _createStickyFooter() {
      this.stickyFooterComponent = new _sticky_footer2.default({
        el: (0, _jquery2.default)(".lp-sticky-footer")
      });
    }
  }, {
    key: "_loadStickyFooter",
    value: function _loadStickyFooter() {
      var _this2 = this;

      this.stickyFooterComponent.update(this.$el.offset().top, this._getAmountNeededToScroll(), this.state);

      (0, _matchMedia2.default)("(min-width: " + _breakpoints2.default.min["720"] + ")", function (query) {
        if (query.matches) {
          _this2.stickyFooterComponent.attach();
          _this2.stickyFooterComponent.scroll();
        } else {
          _this2.stickyFooterComponent.detach();
        }
      });
    }

    /**
     * Set the first article
     */

  }, {
    key: "_setFirstArticle",
    value: function _setFirstArticle() {
      this.$activeArticle = this.$el.addClass("is-active");

      this.socialShareComponent = new _social_share2.default({
        el: this.$el.find(".js-action-sheet")
      });

      var firstArticle = new _article_model2.default({
        url: window.location.pathname + ".json"
      });

      firstArticle.set(window.lp.article_raw);
      var relatedArticles = firstArticle.get("related_articles").articles;

      this.articles.set(this.$el[0], firstArticle);
      this._setInitialCallouts(firstArticle.get("content").callouts);

      if (relatedArticles.length) {
        this.$el.attr("id", this._createIdForArticle(this.$el.data("slug")));
        this._setInitialListOfArticles(relatedArticles);
        this._updateFirstArticle();
        this._createStickyFooter();
        this._loadStickyFooter();
      }

      // Put the ad in the first article, but don't load it yet
      var adSlotNumber = this.howManyArticlesHaveLoaded;
      this.$activeArticle.append(this.adLeaderboardTemplate({ adpackage: adpackage, adSlotNumber: adSlotNumber }));

      if (adpackage) {
        this._insertInlineAdSlots(this.$el);
      }
    }
  }, {
    key: "_updateFirstArticle",
    value: function _updateFirstArticle() {
      // Add the first article to the list of viewed articles
      this.viewedArticles.push({
        slug: this.$el.data("slug"),
        title: this.$el.data("title"),
        scroll: {
          articleOffsetTop: this.$el.offset().top,
          amountNeededToScroll: this._getAmountNeededToScroll()
        },
        next: {
          slug: this.nextArticle.slug,
          title: this.nextArticle.title
        }
      });

      this.state = {
        current: {
          title: this.$el.data("title")
        },
        next: {
          slug: this.nextArticle.slug,
          title: this.nextArticle.title
        }
      };
    }
  }, {
    key: "_setInitialCallouts",
    value: function _setInitialCallouts(callouts) {
      this.articleBody = new _article_body2.default({
        el: this.$el.find(".js-article-body"),
        poiData: callouts,
        numberOfArticles: this.howManyArticlesHaveLoaded
      });
    }
  }, {
    key: "_setInitialListOfArticles",
    value: function _setInitialListOfArticles(articles) {
      this.listOfArticles = articles;
      this._setNextArticle();

      if (this.canUseScrollFeature) {
        var roomToScroll = this._getRoomToScroll(),
            amountNeededToScroll = this._getAmountNeededToScroll();

        if (roomToScroll < amountNeededToScroll) {
          this._scrollToNextArticle(amountNeededToScroll - roomToScroll);
        } else {
          this._scrollToNextArticle();
        }
      }
    }

    /**
     * Sets the next article by subtracting one from the number of articles loaded
     */

  }, {
    key: "_setNextArticle",
    value: function _setNextArticle() {
      this.nextArticle = this.listOfArticles[this.howManyArticlesHaveLoaded - 1];
    }

    /**
     * Runs methods when scrolling
     */

  }, {
    key: "_scrollToNextArticle",
    value: function _scrollToNextArticle() {
      var _this3 = this;

      var offsetDifference = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var shouldGetNextArticle = false;
      var hasRecalculatedStickyFooter = false;

      this.$window.on("scroll.article", (0, _debounce2.default)(function () {
        var activeArticle = _this3.articles.get(_this3.$activeArticle[0]);

        shouldGetNextArticle = _this3._shouldGetNextArticle(offsetDifference) && !_this3.isNextArticleLoading && typeof _this3.nextArticle !== "undefined";

        if (shouldGetNextArticle && !activeArticle.get("hasFetched")) {
          activeArticle.set("hasFetched", true);
          _this3._getNextArticle("/" + _this3.nextArticle.slug + ".json").then(function () {
            _this3._reloadAd();
          });
        }

        _this3._setActiveArticle();
        _this3._checkIfHistoryShouldBeUpdated();

        if (!hasRecalculatedStickyFooter) {
          hasRecalculatedStickyFooter = true;
          _this3.stickyFooterComponent.recalculate(_this3._getAmountNeededToScroll());
          _this3.viewedArticles[_this3.howManyArticlesHaveLoaded - 1].scroll.amountNeededToScroll = _this3._getAmountNeededToScroll();
        }
      }, 50));
    }
  }, {
    key: "_setActiveArticle",
    value: function _setActiveArticle() {
      var _this4 = this;

      this.articles.forEach(function (model, $article) {
        _this4._toggleActiveClassForArticle($article);
      });
    }
  }, {
    key: "_shouldGetNextArticle",
    value: function _shouldGetNextArticle(difference) {
      var reset = this.$newArticle ? this.$newArticle.offset().top : 0;
      var amountNeededToScroll = this._getAmountNeededToScroll();
      var calculatedAmount = (amountNeededToScroll - difference - reset) * 0.8;

      return this.$window.scrollTop() - reset >= calculatedAmount;
    }

    /**
     * Return how much room is available to scroll
     * @return {Number}
     */

  }, {
    key: "_getRoomToScroll",
    value: function _getRoomToScroll() {
      return this.$document.height() - this.$window.height();
    }

    /**
     * Return the amount needed to scroll in order to load a new article
     * @return {Number}
     */

  }, {
    key: "_getAmountNeededToScroll",
    value: function _getAmountNeededToScroll() {
      var roomToScroll = this._getRoomToScroll(),
          amountToScrollPastEndOfArticle = 0,
          globalFooterHeight = this.$globalFooter.height();

      return roomToScroll - amountToScrollPastEndOfArticle - globalFooterHeight;
    }

    /**
     * Check scroll top against each value in the map and add or remove the active
     * class to the `$article` element
     * @param  {Object} $article The article object from the map
     */

  }, {
    key: "_toggleActiveClassForArticle",
    value: function _toggleActiveClassForArticle($article) {
      if (this.$window.scrollTop()) {
        var top = (0, _jquery2.default)($article).offset().top,
            bottom = top + $article.offsetHeight,
            shouldActiveClassBeAdded = this.$window.scrollTop() < bottom && this.$window.scrollTop() > top;

        if (shouldActiveClassBeAdded) {
          this.$activeArticle = (0, _jquery2.default)($article).addClass("is-active");
        } else {
          (0, _jquery2.default)($article).removeClass("is-active");
        }
      }
    }

    /**
     * Find the active article and update the browser history
     */

  }, {
    key: "_checkIfHistoryShouldBeUpdated",
    value: function _checkIfHistoryShouldBeUpdated() {
      if (this.$activeArticle.hasClass("is-active") && this.$newArticle) {
        this._updateHistory(window.location.pathname, this.$activeArticle.data("title"), this.$activeArticle.data("slug"));
      }
    }

    /**
     * Loops through a given array and compares each slug in the given array with
     * a predefined slug that's passed in.
     * @param  {Array}  array An array of articles to loop through
     * @param  {String} slug  A slug to compare each item of the array against
     * @return {Boolean}
     */

  }, {
    key: "_doesItemExist",
    value: function _doesItemExist(array, slug) {
      var exists = false;

      for (var i = 0; i < array.length; i++) {
        exists = slug === array[i].slug;

        if (exists) {
          break;
        }
      }

      return exists;
    }

    /**
     * Use an AJAX call to get data for a new article
     * @param {String} slug Pathname of article to get
     */

  }, {
    key: "_getNextArticle",
    value: function _getNextArticle(slug) {
      var _this5 = this;

      this.isNextArticleLoading = true;

      this.$loader = (0, _jquery2.default)(this.loader({})).insertAfter(this.$activeArticle);

      var nextArticle = new _article_model2.default({ url: slug });

      return nextArticle.fetch().then(function () {
        var getNextArticle = nextArticle.get();

        _this5.$newArticle = (0, _jquery2.default)(_this5.template({
          article: getNextArticle,
          adpackage: getNextArticle.features.indexOf("adpackage") > -1,
          count: _this5.howManyArticlesHaveLoaded + 1
        })).appendTo(".page-container").addClass("is-loading");

        // Set the new article element and data to the articles map
        _this5.articles.set(_this5.$newArticle[0], nextArticle);
        nextArticle.set("articleNumber", _this5.articles.size);

        _this5._addNewArticlesToArray(nextArticle.get("related_articles").articles);
        _this5._updateNewArticle(nextArticle);

        _this5.$newArticle.attr("id", _this5._createIdForArticle(nextArticle.get().slug));

        // Put the ad in the new article, but don't load it yet
        var adSlotNumber = _this5.howManyArticlesHaveLoaded;
        _this5.$newArticle.append(_this5.adLeaderboardTemplate({ adpackage: adpackage, adSlotNumber: adSlotNumber }));

        _this5._articleCanBeLoaded();

        _this5.isNextArticleLoading = false;
      }).catch(function () {
        var errorMessage = "\"<a href=\"" + _this5.nextArticle.slug + "\">" + _this5.nextArticle.title + "</a>\"\n        could not be loaded. Please view it <a href=\"" + _this5.nextArticle.slug + "\">here</a>.";
        _this5.nextArticle = false;
        _this5.isNextArticleLoading = false;
        _this5._hideLoader({ showArticle: false });
        _rizzo2.default.logger.error("Unable to fetch " + slug + ".json");
        _this5.$activeArticle.append("<div class=\"article-error\">" + errorMessage + "</div>");
      });
    }
  }, {
    key: "_articleCanBeLoaded",
    value: function _articleCanBeLoaded() {
      var _this6 = this;

      new Promise(function (resolve) {
        _this6.adLoadedPromise = resolve;
        _this6.adTimer = setTimeout(function () {
          _this6.hasAdTimeoutResolved = true;
          resolve();
        }, _this6.maxAdTimeout);
      }).then(function () {
        _this6._hideLoader({ showArticle: true });
      });

      return {
        id: this.$newArticle.attr("id")
      };
    }
  }, {
    key: "_hideLoader",
    value: function _hideLoader(options) {
      var _this7 = this;

      this.$loader.addClass("is-invisible");

      return (0, _waitForTransition2.default)(this.$loader, { fallbackTime: 1000 }).then(function () {
        _this7.$loader.remove();

        if (options.showArticle) {
          _this7.$newArticle.removeClass("is-loading");
        }
      });
    }

    /**
     * Updates a newly created article
     */

  }, {
    key: "_updateNewArticle",
    value: function _updateNewArticle(model) {
      this.articleBody = new _article_body2.default({
        el: this.$newArticle.find(".article-body"),
        poiData: model.get("content").callouts,
        numberOfArticles: this.howManyArticlesHaveLoaded + 1
      });

      this.socialShareComponent = new _social_share2.default({
        el: this.$newArticle.find(".js-action-sheet")
      });

      this.howManyArticlesHaveLoaded += 1;

      this._setNextArticle();
      this._checkIfHistoryShouldBeUpdated();

      if (adpackage) {
        this._insertInlineAdSlots(this.$newArticle);
      }
    }

    /**
     * Finds the previously viewed article and adds it to the array of viewed
     * articles
     */

  }, {
    key: "_updateListOfViewedArticles",
    value: function _updateListOfViewedArticles() {
      var previousArticle = this.listOfArticles[this.howManyArticlesHaveLoaded - 2];

      if (previousArticle) {
        previousArticle.next = {
          slug: this.nextArticle.slug,
          title: this.nextArticle.title
        };

        try {
          previousArticle.scroll = {
            articleOffsetTop: this.$newArticle.offset().top,
            amountNeededToScroll: this._getAmountNeededToScroll()
          };
        } catch (e) {
          _rizzo2.default.logger.error("\n          Couldn't find " + this.$newArticle + " in _updateListOfViewedArticles().\n          $newArticles: " + this.$newArticle.length + "\n        ");
        }

        this.viewedArticles.push(previousArticle);
      }
    }

    /**
     * Array of new items to add; loop through the new array of articles and check
     * that each item doesn't already exist in the `viewedArticles` array or the
     * `listOfArticles` array; push each unique item to the `listOfArticles` Array
     * @param {Array} array Array of new articles to add
     */

  }, {
    key: "_addNewArticlesToArray",
    value: function _addNewArticlesToArray(array) {
      for (var i = 0; i < array.length; i++) {
        var slug = array[i].slug,
            hasItemBeenViewed = this._doesItemExist(this.viewedArticles, slug),
            isItemInList = this._doesItemExist(this.listOfArticles, slug);

        if (!hasItemBeenViewed && !isItemInList) {
          this.listOfArticles.push(array[i]);
        }
      }
    }

    /**
     * Use HTML5 replaceState to update the browser's history
     * @param {String} pathname The window's current pathname
     * @param {String} title    Title of the new "page"
     * @param {String} slug     Pathname of the new "page"
     */

  }, {
    key: "_updateHistory",
    value: function _updateHistory(pathname, title, slug) {
      var _this8 = this;

      if (pathname !== "/" + slug) {
        window.history.replaceState(null, title + " - Lonely Planet", "/" + slug);

        this._updateData();

        this.state.current.title = title;

        if (!this._doesItemExist(this.viewedArticles, slug)) {
          this.state.next.slug = this.nextArticle.slug;
          this.state.next.title = this.nextArticle.title;

          this._trackAjaxPageView("/" + slug);
          this._updateListOfViewedArticles();
        }

        var articleOffsetTop = void 0,
            amountNeededToScroll = void 0;

        try {
          articleOffsetTop = this.$newArticle.offset().top;
          amountNeededToScroll = this._getAmountNeededToScroll();
        } catch (e) {
          _rizzo2.default.logger.error("\n          Couldn't find " + this.$newArticle + " in _updateHistory().\n          $newArticles: " + this.$newArticle.length + "\n        ");
        }

        this.viewedArticles.forEach(function (item) {
          if (item.title === title) {
            _this8.state.next.slug = item.next.slug;
            _this8.state.next.title = item.next.title;
            articleOffsetTop = item.scroll.articleOffsetTop;
            amountNeededToScroll = item.scroll.amountNeededToScroll;
          }
        });

        this.stickyFooterComponent.update(articleOffsetTop, amountNeededToScroll, this.state);
      }
    }

    /**
     * Track a virtual pageview for analytics
     * @param  {String} pathname Pathname to send to analytics
     * @param  {String} title    Title to send to analytics
     * @return {String}          Data to send to analytics
     */

  }, {
    key: "_trackAjaxPageView",
    value: function _trackAjaxPageView(pathname) {
      return pathname;
    }

    /**
     * Update data for ads and analytics
     */

  }, {
    key: "_updateData",
    value: function _updateData() {
      var article = this.articles.get(this.$activeArticle[0]).get(),
          interests = article.tealium.article.interests,
          categories = [],
          regex = /,\s*$/;

      window.lp.article = {
        name: article.title,
        slug: article.slug,
        image: article.image,
        postDate: article.post_date,
        author: article.author,
        atlasId: article.tealium.article.atlas_id,
        continentName: article.tealium.article.cd1_Continent,
        countryName: article.tealium.article.cd2_Country,
        cityName: article.tealium.article.cd3_City,
        type: article.tealium.article.page_type,
        siteSection: article.tealium.article.site_section,
        id: article.tealium.place.id,
        destination: article.tealium.place.destination
      };

      if ((typeof interests === "undefined" ? "undefined" : _typeof(interests)) === "object") {
        window.lp.article.interests = interests.join(", ").replace(regex, "");
      } else {
        window.lp.article.interests = interests.replace(regex, "");
      }

      if (_typeof(article.categories) === "object") {
        _jquery2.default.each(article.categories, function (index, value) {
          categories.push(value.name);
        });

        window.lp.article.categories = categories.join(", ").replace(regex, "");
      } else {
        window.lp.article.categories = article.categories;
      }

      window.lp.ads.tnm = "tip-article, " + article.tealium.place.id;
      window.lp.ads.continent = article.tealium.article.cd1_Continent ? (0, _stringHelpers.slugify)(article.tealium.article.cd1_Continent) : "";
      window.lp.ads.country = article.tealium.article.cd2_Country ? (0, _stringHelpers.slugify)(article.tealium.article.cd2_Country) : "";
      window.lp.ads.destination = (0, _stringHelpers.slugify)(article.tealium.place.destination);
      window.lp.ads.state = (0, _stringHelpers.slugify)(article.tealium.place.state_name);
      window.lp.ads.region = (0, _stringHelpers.slugify)(article.tealium.place.region_name);
      window.lp.ads.city = (0, _stringHelpers.slugify)(article.tealium.article.cd3_City);
      window.lp.ads.interest = window.lp.article.interests;
      window.lp.ads.position = "article-" + article.articleNumber;

      Object.assign(window.lp.analytics.dataLayer[0], {
        cd1_Continent: article.tealium.article.cd1_Continent,
        cd2_Country: article.tealium.article.cd2_Country,
        cd3_City: article.tealium.article.cd3_City,
        cd5_Region: article.tealium.place.state_name || article.tealium.place.region_name,
        cd10_ArticleName: article.title
      });

      this._updateMetaData(window.lp.article);
    }

    /**
     * Update meta data
     * @param {Object} article Article data from window.lp.article
     */

  }, {
    key: "_updateMetaData",
    value: function _updateMetaData(article) {
      var documentTitle = article.name + " - Lonely Planet",
          description = "Read " + article.name,
          url = "https://www.lonelyplanet.com/" + article.slug;

      // Title
      document.title = documentTitle;
      (0, _jquery2.default)("meta[name=title]").attr("content", documentTitle);
      (0, _jquery2.default)("meta[property=\"og:title\"]").attr("content", documentTitle);

      // Description
      (0, _jquery2.default)("meta[name=description]").attr("content", description);
      (0, _jquery2.default)("meta[itemprop=description]").attr("content", description);
      (0, _jquery2.default)("meta[property=\"og:description\"]").attr("content", description);

      // URL
      (0, _jquery2.default)("meta[property=\"og:url\"]").attr("content", url);
      (0, _jquery2.default)("link[rel=canonical]").attr("href", url);

      // Image
      (0, _jquery2.default)("meta[itemprop=image]").attr("content", article.image);
      (0, _jquery2.default)("meta[property=\"og:image\"]").attr("content", article.image);

      // Article
      (0, _jquery2.default)("meta[property=\"article:tag\"]").attr("content", article.categories);
      (0, _jquery2.default)("meta[property=\"article:published_time\"]").attr("content", article.postDate);
      (0, _jquery2.default)("meta[property=\"article:author\"]").attr("content", article.author);
    }
  }, {
    key: "_reloadAd",
    value: function _reloadAd() {
      var $slotLeader = this.$activeArticle.find(".js-slot-leader");

      if ($slotLeader.length) {
        $slotLeader.data({
          adType: "ajax",
          targeting: { position: window.lp.ads.position }
        }).removeAttr("data-targeting");
      }
    }
  }]);

  return ArticleComponent;
}(_bane.Component), (_applyDecoratedDescriptor(_class.prototype, "_adsLoaded", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "_adsLoaded"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_articleCanBeLoaded", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "_articleCanBeLoaded"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_trackAjaxPageView", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "_trackAjaxPageView"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_reloadAd", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "_reloadAd"), _class.prototype)), _class));
exports.default = ArticleComponent;