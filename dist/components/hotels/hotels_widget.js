"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

require("pickadate/lib/picker.date");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dateDefaults = {
  format: "mm/d/yyyy",
  formatSubmit: "yyyy-mm-dd",
  hiddenName: true,
  labelMonthNext: "Go to the next month",
  labelMonthPrev: "Go to the previous month",
  labelMonthSelect: "Pick a month from the dropdown",
  labelYearSelect: "Pick a year from the dropdown"
};

var HotelsWidget = function (_Component) {
  _inherits(HotelsWidget, _Component);

  function HotelsWidget() {
    _classCallCheck(this, HotelsWidget);

    return _possibleConstructorReturn(this, (HotelsWidget.__proto__ || Object.getPrototypeOf(HotelsWidget)).apply(this, arguments));
  }

  _createClass(HotelsWidget, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.events = {
        "submit #hotel-search-form": "searchHotels"
      };

      var dates = this.$el.find("input[type='date']"),
          startDate = (0, _jquery2.default)(dates[0]),
          endDate = (0, _jquery2.default)(dates[1]),
          today = new Date();

      this.$startDate = startDate.pickadate(Object.assign({
        min: today
      }, dateDefaults));

      this.$endDate = endDate.pickadate(Object.assign({
        min: this.nextDate(today)
      }, dateDefaults));

      startDate.change(function () {
        return _this2.changeDate(_this2.endDate, _this2.startDate);
      });
    }
  }, {
    key: "nextDate",
    value: function nextDate(date) {
      var tmpDate = new Date(date);
      tmpDate.setDate(date.getDate() + 1);
      return tmpDate;
    }
  }, {
    key: "changeDate",
    value: function changeDate(endDate, startDate) {
      var existingEndDate = new Date(endDate),
          newStartDate = new Date(startDate);

      if (existingEndDate.toString() === "Invalid Date" || newStartDate > existingEndDate) {
        var newMinimumEndDate = new Date(newStartDate.getTime() + 24 * 60 * 60 * 1000);
        this.updateEndDate(newMinimumEndDate);
        return newMinimumEndDate;
      }
    }
  }, {
    key: "updateEndDate",
    value: function updateEndDate(date) {
      this.$endDate.pickadate("picker").set({
        "min": date,
        "select": date
      });
    }
  }, {
    key: "searchHotels",
    value: function searchHotels() {
      return {
        booking: this.booking
      };
    }
  }, {
    key: "booking",
    get: function get() {
      var guests = this.$el.find("#js-guests");

      return {
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        guests: parseInt(guests.val(), 10)
      };
    }
  }, {
    key: "startDate",
    get: function get() {
      return this.$startDate.pickadate("picker").get();
    }
  }, {
    key: "endDate",
    get: function get() {
      return this.$endDate.pickadate("picker").get();
    }
  }]);

  return HotelsWidget;
}(_bane.Component);

exports.default = HotelsWidget;