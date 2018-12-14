<template>
<div>
    <div id="cesiumContainer" class="fullscreen"></div>
    <div>{{myPosition.longitude}}, {{myPosition.latitude}}</div>
</div>
</template>


<style scoped>
.fullscreen {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>

<script>
import * as log from "loglevel";
import Cesium from "cesium/Cesium";
require("cesium/Widgets/widgets.css");

export default {
  name: "OverviewMap",
  mounted() {
    Cesium.Ion.defaultAccessToken = this.$store.state.cesiumKey;

    this.viewer = new Cesium.Viewer("cesiumContainer", {
      imageryProvider: Cesium.createWorldImagery(), // use the Bing Maps Aerial imagery from ion (this is the default)
      terrainProvider: Cesium.createWorldTerrain(), // use the Cesium World Terrain from ion
      timeline: false, // Hide widgets
      infoBox: false,
      animation: false,
      fullscreenButton: false
    });

    navigator.geolocation.getCurrentPosition(pos => {
      this.myPosition = pos.coords;
    });
  },
  props: {
    vehicles: Array
  },
  data() {
    return {
      myPosition: String
    };
  },
  watch: {
    myPosition(userPos) {
      log.info(userPos.longitude + " " + userPos.latitude);
      var pinBuilder = new Cesium.PinBuilder();
      this.viewer.entities.add({
        id: "user",
        position: Cesium.Cartesian3.fromDegrees(
          userPos.longitude,
          userPos.latitude,
          0
        ),
        // ellipsoid:{
        //   radii: new Cesium.Cartesian3(100,100,100),
        //   material: Cesium.Color.RED.withAlpha(0.5),
        //   outline: true, 
        //   outlineColor: Cesium.Color.WHITE,
        //   heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        // }
        // point : {
        //   pixelSize: 10,
        //   color: Cesium.Color.RED, 
        //   outlineColor: Cesium.Color.WHITE, 
        //   outlineWidth:1,
        //   heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        // }
        billboard: {
          image: pinBuilder
                  .fromText("You", Cesium.Color.BLACK, 70)
                  .toDataURL(),
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      });
    },
    vehicles(val) {
      val.forEach(vehicle => {
        if (vehicle.position) {
          log.info(
            vehicle.position.longitude + " " + vehicle.position.latitude
          );

          var v = this.viewer.entities.getById(vehicle.name);
          if (!v) {
            log.info("New vehicle");

            var pinBuilder = new Cesium.PinBuilder();
            this.viewer.entities.add({
              id: vehicle.name,
              position: Cesium.Cartesian3.fromDegrees(
                vehicle.position.longitude,
                vehicle.position.latitude
              ),
              billboard: {
                image: pinBuilder
                  .fromText(vehicle.name, Cesium.Color.BLACK, 70)
                  .toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
              }
            });
          } else {
            v.position = Cesium.Cartesian3.fromDegrees(
              vehicle.position.longitude,
              vehicle.position.latitude
            );
            log.info("Position updated " + v.position);
          }
        }
      });
    }
  }
};
</script>