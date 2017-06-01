"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _clamp = require("clamp-js/clamp.js");

var _clamp2 = _interopRequireDefault(_clamp);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

require("./_articles.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticlesComponent = function (_Component) {
  _inherits(ArticlesComponent, _Component);

  function ArticlesComponent() {
    _classCallCheck(this, ArticlesComponent);

    return _possibleConstructorReturn(this, (ArticlesComponent.__proto__ || Object.getPrototypeOf(ArticlesComponent)).apply(this, arguments));
  }

  _createClass(ArticlesComponent, [{
    key: "initialize",
    value: function initialize(options) {
      this.articles = this.$el.find(".article");
      this.maxLines = options.maxLines || 6;
      // Retrieved via getComputedStyle($0)["line-height"] ish
      this.titleLineHeight = options.titleLineHeight || { desktop: 35, mobile: 23 };
      this.blurbLineHeight = options.blurbLineHeight || { desktop: 27, mobile: 18 };
      this.mobileWidth = options.mobileWidth || 717;
      this.screen = "mobile";

      if (!(0, _jquery2.default)("html").hasClass("ie9")) {
        this._detectScreen();
        this._clampText();

        (0, _jquery2.default)(window).on("resize", this._reclamp.bind(this));
      }
    }
  }, {
    key: "widthWindow",
    value: function widthWindow() {
      return (0, _jquery2.default)(window).width();
    }
  }, {
    key: "isDesktop",
    value: function isDesktop() {
      return this.widthWindow() >= this.mobileWidth;
    }
  }, {
    key: "_reclamp",
    value: function _reclamp() {
      this._detectScreen();
      this._clampText();
    }
  }, {
    key: "_detectScreen",
    value: function _detectScreen() {
      return this.screen = this.isDesktop() ? "desktop" : "mobile";
    }
  }, {
    key: "_clampText",
    value: function _clampText() {
      var _this2 = this;

      this.articles.each(function (index, article) {
        var _findElements2 = _this2._findElements(article),
            titleLines = _findElements2.titleLines,
            teaserLines = _findElements2.teaserLines,
            teaser = _findElements2.teaser,
            blurb = _findElements2.blurb;

        // aka 2 + 5 or something


        try {
          if (titleLines + teaserLines > _this2.maxLines) {
            var teaserClamp = Math.ceil(_this2.maxLines - titleLines);
            (0, _clamp2.default)(teaser.get(0), { clamp: teaserClamp });
            teaser.addClass("article__info__teaser--small");
            blurb.prop("hidden", true);
          } else {
            // Only clamp the blurb
            var blurbClamp = Math.ceil(_this2.maxLines - titleLines - teaserLines);
            (0, _clamp2.default)(blurb.get(0), { clamp: blurbClamp });
          }
        } catch (e) {
          // Clamp broke... oh well
        }
      });
    }
  }, {
    key: "_findElements",
    value: function _findElements(article) {
      // Select all necessary elements
      var $article = (0, _jquery2.default)(article),
          title = $article.find(".article__info__title"),
          teaser = $article.find(".article__info__teaser"),
          blurb = $article.find(".article__info__blurb"),

      // Find elements heights
      titleHeight = parseInt(title.height(), 10) || 0,
          teaserHeight = parseInt(teaser.height(), 10) || 0,
          blurbHeight = parseInt(blurb.height(), 10) || 0,

      // Figure out how many lines each element actually is based on line heights and height
      blurbLines = blurbHeight / this.blurbLineHeight[this.screen],
          teaserLines = teaserHeight / this.blurbLineHeight[this.screen],
          titleLines = titleHeight / this.titleLineHeight[this.screen],


      // Figure out how many lines need to be removed
      linesAllowed = this.maxLines - titleLines,
          removeLines = Math.floor(blurbLines + teaserLines - linesAllowed);

      return {
        removeLines: removeLines,
        titleLines: titleLines,
        teaserLines: teaserLines,
        blurbLines: blurbLines,
        teaser: teaser,
        blurb: blurb
      };
    }
  }]);

  return ArticlesComponent;
}(_bane.Component);

exports.default = ArticlesComponent;