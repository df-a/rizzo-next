"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("../../core/bane");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
  _inherits(Footer, _Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "initialize",
    value: function initialize() {
      this.updateLocationOnChange();
      this.$form = (0, _jquery2.default)(".js-newsletter-form");
      this.$submitButton = (0, _jquery2.default)(".js-submit");
      this.$success = (0, _jquery2.default)(".js-success");
      this.$submitButton.on("click", this.submit.bind(this));
    }
  }, {
    key: "updateLocationOnChange",
    value: function updateLocationOnChange() {
      (0, _jquery2.default)(".js-language-select").on("change", function (event) {
        var url = "http://" + (0, _jquery2.default)(this).val();

        window.location = url;

        event.preventDefault();
      });
    }
  }, {
    key: "handleSubmitSuccess",
    value: function handleSubmitSuccess() {
      this.$form.addClass("is-hidden");
      this.$success.removeClass("is-hidden");
    }
  }, {
    key: "submit",
    value: function submit(event) {
      var _this2 = this;

      event.preventDefault();
      _jquery2.default.post(this.$form.attr("action"), this.$form.serialize()).done(function () {
        _this2.handleSubmitSuccess();
      }).fail(function (xhr) {
        if (xhr.status === 409) {
          _this2.handleSubmitSuccess();
        } else {
          console.log("error");
        }
      });
    }
  }]);

  return Footer;
}(_bane.Component);

exports.default = Footer;