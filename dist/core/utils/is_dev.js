"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDev;
function isDev() {
  return typeof ENV_PROD !== "undefined" && !ENV_PROD || document.cookie.indexOf("lpDev") > -1;
}