"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _overlay = require("../overlay");

var _overlay2 = _interopRequireDefault(_overlay);

var _waitForTransition = require("../../core/utils/waitForTransition");

var _waitForTransition2 = _interopRequireDefault(_waitForTransition);

var _search_actions = require("./search_actions");

var _search_actions2 = _interopRequireDefault(_search_actions);

var _search_state = require("./search_state");

var _search_state2 = _interopRequireDefault(_search_state);

var _search = require("./search.hbs");

var _search2 = _interopRequireDefault(_search);

var _search_item = require("./search_item");

var _search_item2 = _interopRequireDefault(_search_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchComponent = function (_Component) {
  _inherits(SearchComponent, _Component);

  function SearchComponent() {
    _classCallCheck(this, SearchComponent);

    return _possibleConstructorReturn(this, (SearchComponent.__proto__ || Object.getPrototypeOf(SearchComponent)).apply(this, arguments));
  }

  _createClass(SearchComponent, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.build();

      this.events = {
        "click .js-lp-search-close": function clickJsLpSearchClose(e) {
          e.preventDefault();

          _this2.hide();
        },

        "keydown .lp-search__input": "onKeyup"
      };
      //$(document.body).on("keyup", this.onKeyup.bind(this));

      this.collection = [];
      this.overlay = new _overlay2.default({
        preventScroll: true
      });

      this.listenTo(this.overlay, "click", this.hide);

      _search_state2.default.on("change:results", this.searchComplete.bind(this));
    }
  }, {
    key: "build",
    value: function build() {
      this.$el = $((0, _search2.default)());

      this.$input = this.$el.find(".js-lp-search-input");
      this.$searchResults = this.$el.find(".js-lp-search-results");
      this.$list = this.$searchResults.find(".js-lp-search-results-list");
      this.$resultsLink = this.$searchResults.find(".js-lp-search-results-more");
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;

      if (this.isOpen) {
        return Promise.all([]);
      }

      this.isOpen = true;

      this.$el.appendTo(document.body);

      this.overlay.show();

      setTimeout(function () {
        _this3.$el.addClass(SearchComponent.className + "--visible");
      }, 10);

      this.$input.focus();
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this4 = this;

      if (!this.isOpen) {
        return Promise.all([]);
      }

      this.isOpen = false;

      this.$el.removeClass(SearchComponent.className + "--visible");

      this.overlay.hide();

      return (0, _waitForTransition2.default)(this.$el, { fallbackTime: 100 }).then(function () {
        _this4.$el.detach();
      });
    }
  }, {
    key: "searchComplete",
    value: function searchComplete(data) {
      var _this5 = this;

      var collection = [];

      this.$list.empty();
      this.currentPosition = -1;

      this.$resultsLink.attr("href", "http://www.lonelyplanet.com/search?q=" + this.$input.val());

      data.results.forEach(function (model) {
        collection.push(_this5.addOne(model));
      });

      this.collection = collection;

      return this.$input.val();
    }
  }, {
    key: "onKeyup",
    value: function onKeyup(e) {
      var _this6 = this;

      if (!this.isOpen) {
        return;
      }

      switch (e.keyCode) {
        case 13:
          // enter
          if (this.currentPosition !== -1 && this.collection[this.currentPosition]) {
            this.collection[this.currentPosition].navigate();
            break;
          }

          window.location.href = "http://www.lonelyplanet.com/search?q=" + this.$input.val();
          break;

        case 27:
          // esc
          this.hide();
          break;

        case 38:
          //up
          if (!this.collection.length) {
            return;
          }
          e.preventDefault();
          this.goUp();
          break;

        case 40:
          //down
          if (!this.collection.length) {
            return;
          }
          e.preventDefault();
          this.goDown();
          break;

        default:
          clearTimeout(this.searchTimer);

          this.searchTimer = window.setTimeout(function () {
            _search_actions2.default.typing({
              query: _this6.$input.val()
            });
          }, 200);

          break;
      }
    }
  }, {
    key: "goUp",
    value: function goUp() {
      this.currentPosition--;

      if (this.currentPosition < 0) {
        this.currentPosition = 0;
        return;
      }

      var currentItem = this.collection[this.currentPosition];

      this.collection.forEach(function (itemComponent) {
        itemComponent.unselect();
      });

      currentItem.select();
    }
  }, {
    key: "goDown",
    value: function goDown() {
      this.currentPosition++;

      if (this.currentPosition >= this.collection.length) {
        this.currentPosition = this.collection.length - 1;
      }

      var currentItem = this.collection[this.currentPosition];

      this.collection.forEach(function (itemComponent) {
        itemComponent.unselect();
      });

      currentItem.select();
    }
  }, {
    key: "addOne",
    value: function addOne(model) {
      var itemComponent = new _search_item2.default({
        model: model,
        searchString: this.$input.val()
      });

      itemComponent.render().$el.appendTo(this.$list);

      return itemComponent;
    }
  }, {
    key: "isOpen",
    get: function get() {
      if (this._isOpen === undefined) {
        this._isOpen = false;
      }

      return this._isOpen;
    },
    set: function set(val) {
      this._isOpen = val || false;
    }
  }, {
    key: "collection",
    get: function get() {
      if (this._collection === undefined) {
        this._collection = [];
      }

      return this._collection;
    },
    set: function set(arr) {
      this._collection = arr;

      if (this._collection.length > 0) {
        this.$searchResults.addClass("lp-search-results--visible");
      } else {
        this.$searchResults.removeClass("lp-search-results--visible");
      }
    }
  }], [{
    key: "className",
    get: function get() {
      return "lp-search";
    }
  }]);

  return SearchComponent;
}(_bane.Component);

exports.default = SearchComponent;