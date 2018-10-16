<template>
    <div id="cesiumContainer" class="fullscreen"></div>
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
  import Cesium from "cesium/Cesium";
  require("cesium/Widgets/widgets.css");

  export default {
    name: "OverviewMap",
    mounted() {
      Cesium.Ion.defaultAccessToken =
        "***REMOVED***";

      this.viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: Cesium.createWorldImagery(), // use the Bing Maps Aerial imagery from ion (this is the default)
        terrainProvider: Cesium.createWorldTerrain(), // use the Cesium World Terrain from ion
        timeline: false, // Hide widgets
        infoBox: false,
        animation: false,
        fullscreenButton: false
      });
    },
    props: {
      vehicles: Array
    },
    watch: {
      vehicles(val) {
        val.forEach(vehicle => {
          if (vehicle.position) {
            console.log(
              vehicle.position.longitude + " " + vehicle.position.latitude
            );

            var v = this.viewer.entities.getById(vehicle.name);
            if (!v) {
              console.log("New vehicle");

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
              console.log("Position updated " + v.position);
            }
          }
        });
      }
    }
  };
</script>