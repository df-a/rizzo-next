"use strict";

require("./_map_static.scss");

var mapLoaded = false;
var $mapButton = $(".js-open-map");
var map = null;
$mapButton.on("click", function () {
  if (!mapLoaded) {
    require.ensure(["../map/index"], function (require) {
      if (map) {
        return map.open();
      }

      var MapComponent = require("../map/index");

      map = new MapComponent.default({
        el: ".map_holder"
      });

      if (!MapComponent.default.supported && map) {
        map.close();
      }
    }, "map");
  }
});

if (window.location.href.indexOf("/map") > -1) {
  $mapButton.trigger("click");
}