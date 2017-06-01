"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require("./core/logger");

var _logger2 = _interopRequireDefault(_logger);

var _component_registry = require("./core/component_registry");

var _component_registry2 = _interopRequireDefault(_component_registry);

var _perf_monitor = require("./core/perf_monitor");

var _perf_monitor2 = _interopRequireDefault(_perf_monitor);

var _rizzo = require("./core/rizzo");

var _rizzo2 = _interopRequireDefault(_rizzo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _logger2.default();

var rizzo = window.rizzo = new _rizzo2.default({
  registry: new _component_registry2.default({ logger: logger }),
  perf: new _perf_monitor2.default(),
  logger: logger
});

exports.default = rizzo;