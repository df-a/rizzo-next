"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _events = require("./mixins/events");

var _events2 = _interopRequireDefault(_events);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _pick = require("lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _bind = require("lodash/bind");

var _bind2 = _interopRequireDefault(_bind);

var _each = require("lodash/each");

var _each2 = _interopRequireDefault(_each);

var _uniqueId = require("lodash/uniqueId");

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _postal = require("postal/lib/postal.lodash");

var _postal2 = _interopRequireDefault(_postal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Can pass in options that contains these keys. They will automatically be added to `this`
var listOfOptions = ["el", "events", "container"];
// Regex for the "click .foo .bar" in the events
var delegateEventSplitter = /^(\S+)\s*(.*)$/;

/**
* The main class that will be extended when a new componenet is created.
* Extend this class with es6 syntax.
* @example
* import { Component } from "./core/bane"
*
* class ArticlesComponent extends Component {
*   initialize() {
*     this.events = {
*       "click .foo": "fooClicked"
*     }
*   }
*   render() {
*     //...
*   }
*   fooClicked() {
*     //...
*   }
* }
*/

var Component = function () {
  /**
   * Constructs a component
   * @param  {[Options]} options An options object
   * @param {Element} options.el An element to attatch this component to
   * @param {Object} options.events A key value pair of events
   */
  function Component(options) {
    _classCallCheck(this, Component);

    this.cid = (0, _uniqueId2.default)("comp");
    this.channel = "components";

    // Assign things from the passed in options to `this`
    (0, _assign2.default)(this, (0, _pick2.default)(options, listOfOptions));

    this._ensureElement();

    this.initialize.apply(this, arguments);

    this._delegateEvents();
  }

  _createClass(Component, [{
    key: "initialize",
    value: function initialize() {}
    // Overwrite the initialize method in your component for initial setup

    /**
     * Override this method with custom rendering logic
     * @return {Object} Instance of the component
     */

  }, {
    key: "render",
    value: function render() {
      // Overwrite me with awesomesauce
      return this;
    }
    /**
     * This method actually builds the template and inserts the HTML into the DOM
     * @param  {Object} data The data to pass to a template function
     * @return {jQuery} Returns the element
     */

  }, {
    key: "build",
    value: function build(data) {
      if (this.el) {
        return this.$el.html(typeof this.template === "function" ? this.template(data) : this.template);
      }
    }
    /**
     * Pull data off of a custom data attribute `data-lp-initial-abc`.
     * This allows for server side JSON data to be embeded in the document.
     * @example <caption>HTML</caption>
     * <div data-lp-initial-cards="{{cards}}"></div>
     *
     * @example <caption>JavaScript</caption>
     * let state = this.getInitialState();
     * state.cards; // { cards: ... }
     *
     * @return {Object} The parsed JSON data
     */

  }, {
    key: "getInitialState",
    value: function getInitialState() {
      var _this = this;

      if (this.__initialState__) {
        return this.__initialState__;
      }

      var state = this.__initialState__ = {};

      (0, _each2.default)(this.$el.data(), function (val, key) {
        if (key.indexOf("lpInitial") > -1) {
          var parsed = null;
          // No...no... please god no... nooooooooooooo.
          try {
            if (val.source) {
              (function () {
                var tmp = [];
                (0, _each2.default)(val.source, function (str) {
                  tmp.push(JSON.parse(str));
                });
                val = tmp;
              })();
            }
            parsed = JSON.parse(val);
          } catch (e) {
            parsed = val;
          }

          var cleanKey = key.replace("lpInitial", "").toLowerCase();
          state[cleanKey] = parsed;

          _this.$el.removeAttr("data-lp-initial-" + cleanKey);
        }
      });

      return state;
    }
    /**
    * Allows you to delegate events to the element the component is attached to. In the `initialize` method of your
    * component, simply add an `events` object to `this
    * @example
    *  initialize() {
    *    this.events = {
    *      "click": "someMethod",
    *      "click .button": "anotherMethod"
    *    }
    *  }
    */

  }, {
    key: "_delegateEvents",
    value: function _delegateEvents(events) {
      if (!(events || (events = this.events))) {
        return this;
      }
      this._undelegateEvents();

      for (var key in events) {
        var method = events[key];
        if (typeof method !== "function") {
          method = this[events[key]];
        }
        if (!method) {
          continue;
        }

        var match = key.match(delegateEventSplitter);
        var eventName = match[1],
            selector = match[2];
        method = (0, _bind2.default)(method, this);
        eventName += ".delegateEvents" + this.cid;
        if (selector === "") {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    }
    /**
     * Turns off event delegation for the component
     * @return {Object} The component instance
     */

  }, {
    key: "_undelegateEvents",
    value: function _undelegateEvents() {
      this.$el.off(".delegateEvents" + this.cid);
      return this;
    }
    // Wraps `this.el` with jQuery

  }, {
    key: "_ensureElement",
    value: function _ensureElement() {
      if (this.el) {
        this.$el = (0, _jquery2.default)(this.el);
      } else {
        this.$el = (0, _jquery2.default)("<div/>");
        this.el = this.$el[0];
      }

      this.$el.addClass("lp-component").data("lpComponent", this);
    }
    /**
     * Publish an event on the `components` channel
     * @param  {String} topic Topic to publish
     * @param  {Object} data Data to publish on the channel
     */

  }, {
    key: "publish",
    value: function publish(topic, data) {
      return _postal2.default.channel("components").publish(topic, data);
    }
  }]);

  return Component;
}();

exports.default = Component;


(0, _assign2.default)(Component.prototype, _events2.default);