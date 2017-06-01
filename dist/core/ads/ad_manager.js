"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _desc, _value, _class;

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _ad_sizes = require("./ad_sizes");

var _ad_sizes2 = _interopRequireDefault(_ad_sizes);

var _ad_unit = require("./ad_unit");

var _ad_unit2 = _interopRequireDefault(_ad_unit);

var _cookie_util = require("../cookie_util");

var _cookie_util2 = _interopRequireDefault(_cookie_util);

require("jquery.dfp");

var _publish = require("../decorators/publish");

var _publish2 = _interopRequireDefault(_publish);

var _subscribe = require("../decorators/subscribe");

var _subscribe2 = _interopRequireDefault(_subscribe);

var _stringHelpers = require("../../core/utils/stringHelpers");

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var AdManager = (_dec = (0, _publish2.default)("ad.loaded", "ads"), _dec2 = (0, _subscribe2.default)("reload", "ads"), _dec3 = (0, _subscribe2.default)("refresh", "ads"), (_class = function () {
  function AdManager(config) {
    _classCallCheck(this, AdManager);

    this.defaultConfig = {
      adunits: ".adunit",
      sizeMapping: _ad_sizes2.default,
      layers: ["LonelyPlanet.com"],
      theme: "",
      template: "",
      topic: "",
      adThm: "",
      adTnm: "",
      continent: "",
      country: "",
      destination: "",
      city: ""
    };

    this.config = _jquery2.default.extend({}, this.defaultConfig, config);

    this.adCallbacks = {
      "1x1": "_superzone"
    };

    this.subscribe();

    return this;
  }

  _createClass(AdManager, [{
    key: "_superzone",
    value: function _superzone($unit) {
      $unit.removeClass("adunit--leaderboard").addClass("adunit--superzone");
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this = this;

      this.pluginConfig = {
        dfpID: this.getNetworkID(),
        setTargeting: this.formatKeywords(this.config),
        namespace: this.config.layers.join("/"),
        sizeMapping: this.config.sizeMapping,
        enableSingleRequest: false,
        collapseEmptyDivs: true,
        afterEachAdLoaded: function afterEachAdLoaded($adunit, event) {
          _this._adCallback.call(_this, $adunit, event);
          _this._afterEachAdLoaded($adunit);
        }
      };

      this.load();
      return this;
    }
  }, {
    key: "_afterEachAdLoaded",
    value: function _afterEachAdLoaded($adunit) {
      return {
        id: $adunit.attr("id"),
        size: $adunit.data("sizeMapping")
      };
    }
  }, {
    key: "_reload",
    value: function _reload() {
      this.pluginConfig.setTargeting = this.formatKeywords(window.lp.ads);
      this.load();
    }
  }, {
    key: "_adCallback",
    value: function _adCallback($adunit, event) {
      var unit = $adunit.data("adUnit"),
          currentUnit = void 0;

      if (!unit) {
        currentUnit = new _ad_unit2.default($adunit);
        $adunit.data("adUnit", currentUnit);
      }

      if (currentUnit && !currentUnit.isEmpty()) {
        this._track($adunit);
      }

      if (event.size) {
        var callback = this.adCallbacks[event.size.join("x")];
        callback && this[callback] && this[callback]($adunit, event);
      }
    }
  }, {
    key: "_track",
    value: function _track($adunit) {
      return $adunit.data("sizeMapping") + "-" + $adunit[0].id + "-" + ($adunit.data("adType") || "default");
    }
  }, {
    key: "formatKeywords",
    value: function formatKeywords(config) {
      var keywords = {
        theme: config.theme,
        template: config.template,
        topic: config.topic,
        thm: config.adThm,
        ctt: (0, _stringHelpers.slugify)(config.continent),
        continent: (0, _stringHelpers.slugify)(config.continent),
        cnty: (0, _stringHelpers.slugify)(config.country),
        country: (0, _stringHelpers.slugify)(config.country),
        city: (0, _stringHelpers.slugify)(config.city),
        dest: (0, _stringHelpers.slugify)(config.destination),
        destination: (0, _stringHelpers.slugify)(config.destination),
        state: (0, _stringHelpers.slugify)(config.state),
        interest: config.interest
      };

      if (window.Krux) {
        keywords.ksg = window.Krux.segments || "";
        keywords.kuid = window.Krux.user || "";
      }

      if (config.tnm) {
        keywords.tnm = config.tnm.replace(/\s/, "").split(",");
      }

      if (config.keyValues && !_jquery2.default.isEmptyObject(config.keyValues)) {
        for (var key in config.keyValues) {
          if (config.keyValues.hasOwnProperty(key)) {
            keywords[key] = config.keyValues[key];
          }
        }
      }

      return keywords;
    }
  }, {
    key: "getNetworkID",
    value: function getNetworkID() {
      var networkID = 9885583,
          cookie = this._networkCookie(),
          param = this._networkParam();

      if (param) {
        networkID = param;
      } else if (cookie) {
        networkID = cookie;
      }

      return networkID;
    }
  }, {
    key: "_networkCookie",
    value: function _networkCookie() {
      return new _cookie_util2.default().getCookie("lpNetworkCode");
    }
  }, {
    key: "_networkParam",
    value: function _networkParam() {
      var props = window.location.search.match(/lpNetworkCode=([0-9]{4,8})/);
      return props ? props.pop() : null;
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      this.$adunits = (0, _jquery2.default)(this.config.adunits);

      // Filter out ad units that have already been loaded then
      // ad dimensions that may be too large for their context
      this.$adunits.filter(function (index) {
        return _this2.$adunits.eq(index).data("googleAdUnit") === undefined;
      }).each(function (i, el) {
        var $el = (0, _jquery2.default)(el);
        var elOptions = $el.data("dfpOptions");

        $el.dfp((0, _objectAssign2.default)({}, _this2.pluginConfig, elOptions));
      });
    }
  }, {
    key: "refresh",
    value: function refresh(data) {
      var i = void 0,
          len = void 0,
          unit = void 0;

      if (!data) {
        return window.googletag.pubads().refresh();
      }

      for (i = 0, len = this.$adunits.length; i < len; i++) {
        if (unit = this.$adunits.eq(i).data("adUnit")) {
          if (!data.type || data.type === unit.getType()) {
            unit.refresh(data.ads);
          }
        }
      }
    }
  }]);

  return AdManager;
}(), (_applyDecoratedDescriptor(_class.prototype, "_afterEachAdLoaded", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "_afterEachAdLoaded"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_reload", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "_reload"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "refresh", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "refresh"), _class.prototype)), _class));
exports.default = AdManager;