"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bane = require("./bane");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Register components with Rizzo
 */
var ComponentRegistry = function () {
  /**
   * Constructs the ComponentRegistry
   * @param {Logger} options.logger Instance of a logger
   */
  function ComponentRegistry() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        logger = _ref.logger;

    _classCallCheck(this, ComponentRegistry);

    this.components = new Map();
    this.logger = logger;
  }
  /**
   * Create an instance of a given component. 
   * Will also register the component.
   * @param  {Component} Component A constructor that extends `Component`
   * @param  {[object]} options Options to pass to the constructor
   * @return {object} Instance of the component
   */


  _createClass(ComponentRegistry, [{
    key: "createInstanceOf",
    value: function createInstanceOf(Component, options) {
      // Function.name only supported in certain browsers, hence the check
      if (Component.name && !this.components.has(Component.name)) {
        this.register(Component);
      }

      var instances = this.components.get(Component.name);

      var instance = null;

      try {
        instance = new Component(options);

        if (instances) {
          instances.push(instance);
        }
      } catch (e) {
        if (typeof ENV_PROD !== "undefined" && !ENV_PROD) {
          throw e;
        } else {
          var el = (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" ? options.el : options;

          this.logger.error("\n          Could not create instance of " + Component.name + " on " + el + ".\n          Reason: " + e.message + "\n          Page: " + document.location.href + "\n        ");
        }
      }

      return instance;
    }
    /**
     * Get instances of a specific component, by either it's string or Constructor
     * @param  {Component|String} Component Either the Constructor or the string name of a constructor
     * @return {Array} An array of all instances of the component
     * @example
     * rizzo.renderComponent(MastheadComponent, {});
     * rizzo.registry.getInstancesOf(MastheadComponent); // [MastheadComponent]
     * 
     */

  }, {
    key: "getInstancesOf",
    value: function getInstancesOf(Component) {
      var name = typeof Component === "function" ? Component.name : Component;
      return this.components.get(name);
    }
    /**
     * Add a new Component to the registry.  
     * Must extend the `Component` constructor.  
     * Components will only be registered in browsers that support `Function.name` since this is mostly for debugging anyways.
     * @param  {Component} Constructor The component being added
     */

  }, {
    key: "register",
    value: function register(Constructor) {
      if (!(Constructor.prototype instanceof _bane.Component)) {
        throw "Can only register Components";
      }

      this.components.set(Constructor.name, []);
    }
  }]);

  return ComponentRegistry;
}();

exports.default = ComponentRegistry;