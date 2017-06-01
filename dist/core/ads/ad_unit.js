"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdUnit = function () {
  function AdUnit($target) {
    _classCallCheck(this, AdUnit);

    this.$target = $target;
    this.$iframe = $target.find("iframe");
    this.initialize();
  }

  _createClass(AdUnit, [{
    key: "initialize",
    value: function initialize() {
      if (this.isEmpty()) {
        this.$target.trigger(":ads/hidden");
        return;
      }

      this.$target.closest(".is-closed").removeClass("is-closed");
      this.$target.trigger(":ads/visible");

      var extension = this.$target.data("extension");

      if (extension && this.extensions[extension]) {
        this.extensions[extension].call(this);
      }
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      if (this.$target.css("display") === "none") {
        return true;
      }

      // Sometimes DFP will return useless 1x1 blank images
      // so we must check for them.
      return this.$iframe.contents().find("img").width() === 1;
    }
  }, {
    key: "getType",
    value: function getType() {
      var patterns = /(leaderboard|leaderboard\-responsive|mpu-bottomboard|mpu|trafficDriver|adSense|sponsorTile)/,
          matches = this.$target.attr("class").match(patterns);

      return matches ? matches[1] : null;
    }
  }, {
    key: "refresh",
    value: function refresh(newConfig) {
      var slot = this.$target.data("googleAdUnit");

      if (newConfig) {
        this.clearConfig(slot);
        this.setNewConfig(slot, newConfig);
      }

      window.googletag.pubads().refresh([slot]);
    }
  }, {
    key: "setNewConfig",
    value: function setNewConfig(slot, newConfig) {
      for (var param in newConfig) {
        slot.setTargeting(param, newConfig[param]);
      }
    }
  }, {
    key: "clearConfig",
    value: function clearConfig(slot) {
      slot.clearTargeting();
    }
  }, {
    key: "extensions",
    get: function get() {
      var _this = this;

      return {
        stackMPU: function stackMPU() {
          var $container = _this.$target.closest(".js-card-sponsored");

          if (_this.$iframe.height() > $container.outerHeight()) {
            $container.addClass("card--sponsored--double-mpu");
          }
        }
      };
    }
  }]);

  return AdUnit;
}();

exports.default = AdUnit;