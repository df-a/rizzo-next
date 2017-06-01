"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _photoswipe = require("photoswipe");

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _photoswipeUiDefault = require("photoswipe/dist/photoswipe-ui-default");

var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Keep track of instance IDs
var instanceId = 0;

/**
 * A component for creating an Image Gallery
 */

var ImageGalleryComponent = function (_Component) {
  _inherits(ImageGalleryComponent, _Component);

  function ImageGalleryComponent() {
    _classCallCheck(this, ImageGalleryComponent);

    return _possibleConstructorReturn(this, (ImageGalleryComponent.__proto__ || Object.getPrototypeOf(ImageGalleryComponent)).apply(this, arguments));
  }

  _createClass(ImageGalleryComponent, [{
    key: "initialize",
    value: function initialize() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$galleryImageSele = _ref.galleryImageSelector,
          galleryImageSelector = _ref$galleryImageSele === undefined ? ".stack__article__image-container" : _ref$galleryImageSele;

      this.template = require("./image_gallery.hbs");

      this.$images = this.$el.find(galleryImageSelector);

      this.events = _defineProperty({}, "click " + galleryImageSelector, "onGalleryClick");

      this.$el.attr({
        "data-pswp-uid": ++instanceId,
        "data-gallery": this
      });
    }
  }, {
    key: "_parseThumbnailElements",
    value: function _parseThumbnailElements() {
      var _this2 = this;

      if (this._items) {
        return this._items;
      }

      var items = this._items = [];

      this.$images.each(function (i, el) {
        var $galleryImage = (0, _jquery2.default)(el),
            $linkEl = $galleryImage.find("a"),
            size = $linkEl.attr("data-size").split("x"),
            image = $linkEl.find("img").attr("src"),
            link = $linkEl.attr("href"),
            largeImage = link.match(/\.(jpg|png|gif)/) ? link : image,
            youtubeID = _this2._youtubeID(link);

        var item = {
          src: largeImage,
          msrc: image,
          el: $linkEl.find("img")[0],
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };

        var $caption = void 0;
        if (($caption = $galleryImage.find("span")).length) {
          item.title = $caption.html();
        } else if (($caption = $galleryImage.next(".copy--caption")).length) {
          item.title = $caption.html();
        } else if (($caption = $galleryImage.next("p").find(".caption")).length) {
          item.title = $caption.html();
        }

        if (youtubeID) {
          item.youtubeID = youtubeID;
          item.html = "<div class='pswp__player' id='" + youtubeID + "'></div>";
          item.title = null;
          item.src = null;
          item.msrc = null;
        }

        items.push(item);
      });

      return items;
    }

    /**
     * Callback from photoswipe gallery close
     */

  }, {
    key: "onGalleryClose",
    value: function onGalleryClose() {
      this._youtubeStop();
    }

    /**
     * Callback from photoswipe item change
     */

  }, {
    key: "onGalleryChange",
    value: function onGalleryChange() {
      this._youtubePlay(this._gallery.currItem);
    }

    /**
     * Plays youtube movie if given proper movie ID
     */

  }, {
    key: "_youtubePlay",
    value: function _youtubePlay(galleryItem) {
      if (galleryItem.youtubeID) {
        this._player = document.getElementById(galleryItem.youtubeID);
        this._player.innerHTML = "<iframe width='100%' height='100%' src='https://www.youtube.com/embed/" + galleryItem.youtubeID + "?autoplay=1' frameborder='0' allowfullscreen></iframe>";
      } else {
        this._youtubeStop();
      }
    }

    /**
     * Stops youtube movie and destroys the player
     */

  }, {
    key: "_youtubeStop",
    value: function _youtubeStop() {
      if (this._player) {
        this._player.innerHTML = "";
        this._player = null;
      }
    }

    /**
     * Gets youtube movie id from given youtube movie url
     */

  }, {
    key: "_youtubeID",
    value: function _youtubeID(url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
          match = url.match(regExp);

      return match && match[2].length == 11 ? match[2] : null;
    }

    /**
     * Callback from clicking on a gallery image
     * @param  {Event}  event Event
     * @return {Object}       Returns an object to send data to GA for tracking
     */

  }, {
    key: "onGalleryClick",
    value: function onGalleryClick(event) {
      event.preventDefault();

      var clickedListItem = event.currentTarget,
          index = this.$images.index(clickedListItem),
          src = (0, _jquery2.default)(clickedListItem).find("img").attr("src");

      if (index >= 0) {
        this.openPhotoSwipe(index);
      }

      return src;
    }

    /**
     * Open the photo gallery
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */

  }, {
    key: "openPhotoSwipe",
    value: function openPhotoSwipe() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var items = this._parseThumbnailElements();

      var options = {
        galleryUID: this.$el.attr("data-pswp-uid"),
        getThumbBoundsFn: function getThumbBoundsFn(index) {
          var thumbnail = items[index].el,
              // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
              rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        history: false,
        counterEl: false,
        index: index
      };

      this._gallery = new _photoswipe2.default(this.$pswp[0], _photoswipeUiDefault2.default, items, options);
      this._gallery.listen("afterChange", this.onGalleryChange.bind(this));
      this._gallery.listen("close", this.onGalleryClose.bind(this));
      this._gallery.init();
    }
  }, {
    key: "$pswp",

    /**
     * Render the gallery viewer
     * @return {jQuery} Returns the gallery element
     */
    get: function get() {
      if (this._$pswp) {
        return this._$pswp;
      }

      return this._$pswp = (0, _jquery2.default)(this.template({})).appendTo("body");
    }
  }]);

  return ImageGalleryComponent;
}(_bane.Component);

exports.default = ImageGalleryComponent;