<template>
  <div id="cesiumContainer"></div>
</template>


<style scoped>
.fullscreen {
  width: 100%;
  top: 30;
  bottom: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>

<script>
import * as log from "loglevel";
import Cesium from "cesium/Cesium";
require("cesium/Widgets/widgets.css");

function isValidPosition(coords) {
  return !(
    coords == null ||
    coords.longitude == null ||
    coords.latitude == null
  );
}

export default {
  name: "Map",
  mounted() {
    Cesium.Ion.defaultAccessToken = this.cesiumKey;

    // this.viewer = new Cesium.CesiumWidget("cesiumContainer", {
    //   sceneMode: Cesium.SceneMode.SCENE2D,
    //   mapMode2D: Cesium.MapMode2D.ROTATE
    // });

    this.viewer = new Cesium.Viewer("cesiumContainer", {
      sceneMode: Cesium.SceneMode.SCENE2D,
      mapMode2D: Cesium.MapMode2D.ROTATE,
      // imageryProvider: new Cesium.IonImageryProvider({ assetId: 3954 }), // Sentinel-2 (mostly) cloudless global imagery between 10 and 60 meter resolution.
      // imageryProvider: Cesium.createWorldImagery(), // use the Bing Maps Aerial imagery from ion (this is the default)
      // terrainProvider: Cesium.createWorldTerrain(), // use the Cesium World Terrain from ion
      timeline: false, // Hide widgets
      infoBox: false,
      animation: false,
      fullscreenButton: false,
      baseLayerPicker: true,
      homeButton: false,
      projectionPicker: false
    });

    this.pinBuilder = new Cesium.PinBuilder();
    this.userpin = this.viewer.entities.add({
      id: "user",
      billboard: {
        image: this.pinBuilder
          .fromText("You", Cesium.Color.BLACK, 70)
          .toDataURL(),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    });

    this.avpin = this.viewer.entities.add({
      id: "av",
      // position: new Cesium.CallbackProperty(this.getAvPosition, false),
      billboard: {
        image: require("../assets/airport.png"),
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,

        scaleByDistance: new Cesium.NearFarScalar(1000, 0.4, 30000, 0.1),
        rotation: 0.0,
        alignedAxis: Cesium.Cartesian3.ZERO, // default
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    });

    this.updatePosition(this.userpin, this.userPosition);
    this.updatePosition(this.avpin, this.vehicle);

    // this.viewer.flyTo(this.viewer.entities, {
    //   offset: new Cesium.HeadingPitchRange(0, -1, 0)
    // });
    // this.vehicles.forEach(vehicle => this.updateVehicle(vehicle));
    // this.userpin = {
    //     id: "user",
    //     // ellipsoid:{
    //     //   radii: new Cesium.Cartesian3(100,100,100),
    //     //   material: Cesium.Color.RED.withAlpha(0.5),
    //     //   outline: true,
    //     //   outlineColor: Cesium.Color.WHITE,
    //     //   heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    //     // }
    //     // point : {
    //     //   pixelSize: 10,
    //     //   color: Cesium.Color.RED,
    //     //   outlineColor: Cesium.Color.WHITE,
    //     //   outlineWidth:1,
    //     //   heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
    //     // }

    //   };

    this.viewer.trackedEntity = this.avpin;
  },
  props: {
    userPosition: {
      immediate: true,
      deep: true,
      validator: isValidPosition
    },
    // userPosition: Object,
    vehicles: Array,
    cesiumKey: String,
    vehicle: {
      immediate: true,
      deep: true
      //   validator: function(value) {
      //     return (
      //       value !== null &&
      //       (value.longitude !== undefined && value.latitude !== undefined)
      //     );
      // }
    }
  },
  data() {
    return {};
  },
  methods: {
    updatePosition(entity, coords) {
      if (!isValidPosition(coords)) {
        return;
      }

      entity.position = Cesium.Cartesian3.fromDegrees(
        coords.longitude,
        coords.latitude
      );
    },
    updateAV(vehicle) {
      this.updatePosition(this.avpin, vehicle);
      // this.avpin.billboard.rotation = Cesium.Math.toRadians(vehicle.heading);
      // debugger;
      this.viewer.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          vehicle.longitude,
          vehicle.latitude,
          vehicle.altitude + 1000.0
        ),
        orientation: {
          heading: Cesium.Math.toRadians(vehicle.heading)
        }
      });
    },
    updateVehicle(vehicle) {
      if (vehicle.position) {
        var v = this.viewer.entities.getById(vehicle.name);
        if (!v) {
          log.info("New vehicle");

          v = this.viewer.entities.add({
            id: vehicle.name,
            // model: {
            //   uri:
            //     "https://cesiumjs.org/Cesium/Apps/SampleData/models/CesiumAir/Cesium_Air.gltf",
            //   minimumPixelSize: 64
            // },
            billboard: {
              image: this.pinBuilder
                .fromText(vehicle.name, Cesium.Color.BLACK, 70)
                .toDataURL(),
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
          });
        }
        this.updatePosition(v, vehicle.position);
        // if (this.viewer.trackedEntity == null) {
        //   this.viewer.flyTo(this.viewer.entities, {
        //     offset: new Cesium.HeadingPitchRange(0, -1, 0)
        //   });
        // }
      }
    }
  },
  watch: {
    userPosition: {
      handler: function(userPos) {
        this.updatePosition(this.userpin, userPos);
      },
      deep: true
    },
    vehicle: {
      handler: function(val) {
        this.updateAV(val);
      },
      deep: true
    }
  }
  // watch: {
  //   // vehicles(val) {
  //   //   // TODO: Handle when items are removed from array
  //   //   // val.forEach(vehicle => this.updateVehicle(vehicle));
  //   // }
  //   }
  // }
};
</script>