"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _image_gallery = require("../image_gallery");

var _image_gallery2 = _interopRequireDefault(_image_gallery);

var _poi_callout = require("../poi_callout");

var _poi_callout2 = _interopRequireDefault(_poi_callout);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _matchMedia = require("../../core/utils/matchMedia");

var _matchMedia2 = _interopRequireDefault(_matchMedia);

var _breakpoints = require("../../core/utils/breakpoints");

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _rizzo = require("../../rizzo");

var _rizzo2 = _interopRequireDefault(_rizzo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var adpackage = document.cookie.match(/adpackage/);

/**
 * Enhances the body of articles with a gallery and more
 */

var ArticleBodyComponent = function (_Component) {
  _inherits(ArticleBodyComponent, _Component);

  function ArticleBodyComponent() {
    _classCallCheck(this, ArticleBodyComponent);

    return _possibleConstructorReturn(this, (ArticleBodyComponent.__proto__ || Object.getPrototypeOf(ArticleBodyComponent)).apply(this, arguments));
  }

  _createClass(ArticleBodyComponent, [{
    key: "initialize",
    value: function initialize(options) {
      var _this2 = this;

      this.imageContainerSelector = ".stack__article__image-container";
      this.poiData = options.poiData;
      this.howManyArticlesHaveLoaded = options.numberOfArticles;

      this.loadImages().then(function () {
        _this2.gallery = new _image_gallery2.default({
          el: _this2.$el
        });
      });

      if (this.poiData) {
        (0, _matchMedia2.default)("(min-width: " + _breakpoints2.default.min["1200"] + ")", function (query) {
          if (query.matches) {
            _this2.loadPoiCallout(_this2.poiData);
          } else {
            if (typeof _this2.poiCallout !== "undefined") {
              _this2.poiCallout.destroy();
            }
          }
        });
      }

      var featuredImage = this.el.find(this.imageContainerSelector);
      var $paragraphs = this.$el.find("p");
      var showAd = $paragraphs.length >= 2 || featuredImage.length;

      if (showAd) {
        (0, _matchMedia2.default)("(max-width: " + _breakpoints2.default.max["480"] + ")", function (query) {
          if (query.matches) {
            _this2._appendAd($paragraphs, featuredImage);
          }
        });
      }

      this.formatDate();
    }

    /**
     * Loads all the images in the body of the article
     * @return {Promise} A promise for when all of the images have loaded
     */

  }, {
    key: "loadImages",
    value: function loadImages() {
      var _this3 = this;

      var promises = [];

      this.$el.find(this.imageContainerSelector).each(function (index, el) {
        var $img = (0, _jquery2.default)(el).find("img"),
            $a = (0, _jquery2.default)(el).find("a").eq(0),
            $span = (0, _jquery2.default)(el).find("span"),
            src = (0, _jquery2.default)($img).attr("src");

        var promise = _this3.loadImage(src).then(function (image) {
          if (!$a.length) {
            $img.wrap("<a class=\"copy--body__link\" href=\"" + src + "\" data-size=\"" + image.width + "x" + image.height + "\" />");
          } else {
            $a.attr("data-size", image.width + "x" + image.height);
          }

          if (image.width > 1000 && $img.hasClass("is-landscape")) {
            (0, _jquery2.default)(el).addClass("is-wide");
          }

          (0, _jquery2.default)(el).addClass("is-visible");

          if (!$span.length) {
            (0, _jquery2.default)(el).contents().filter(function () {
              return this.nodeType === 3 && _jquery2.default.trim(this.nodeValue).length;
            }).wrap("<span class=\"copy--caption\" />");
          }
        });

        promises.push(promise);
      });

      return Promise.all(promises).catch(function (err) {
        _rizzo2.default.logger.log(err);
      });
    }

    /**
     * Preload an image
     * @param  {String} url Url of the image to load
     * @return {Promise} A promise for when the image loads
     */

  }, {
    key: "loadImage",
    value: function loadImage(url) {
      var image = new Image();

      return new Promise(function (resolve, reject) {
        image.src = url;
        image.onload = function () {
          resolve(image);
        };
        image.onerror = function () {
          reject(url);
        };

        if (!url) {
          reject(url);
        }
      });
    }

    /**
     * Format the post date with moment.js
     */

  }, {
    key: "formatDate",
    value: function formatDate() {
      var $footer = this.$el.siblings(".js-article-footer"),
          date = $footer.find("time").attr("datetime"),
          formattedDate = (0, _moment2.default)(date).format("MMMM YYYY");

      $footer.find("time").html(formattedDate).closest(".js-article-post-date").removeProp("hidden");
    }

    /**
     * Creates a new instance of the POI callout
     * @param {Object} data POI data
     */

  }, {
    key: "loadPoiCallout",
    value: function loadPoiCallout(data) {
      this.poiCallout = new _poi_callout2.default({
        el: this.$el,
        pois: data
      });
    }
  }, {
    key: "_appendAd",
    value: function _appendAd($paragraphs, $featuredImage) {
      var element = adpackage ? "<div\n      id=\"ad-articles-yieldmo-" + this.howManyArticlesHaveLoaded + "\"\n      class=\"adunit--article\"></div>" : "<div\n        class=\"adunit adunit--article display-none\"\n        data-dfp-options='{ \"namespace\": \"LonelyPlanet.com/Yieldmo\" }'\n        data-size-mapping=\"mpu-double\"\n        data-targeting='{ \"position\": \"article-paragraph\" }'></div>";

      if ($featuredImage.length) {
        $featuredImage.eq(0).after(element);
      } else {
        $paragraphs.eq(1).after(element);
      }

      window.lp.ads.manager.load();
    }
  }]);

  return ArticleBodyComponent;
}(_bane.Component);

exports.default = ArticleBodyComponent;