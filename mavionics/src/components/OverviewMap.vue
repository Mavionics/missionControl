<template>
  <div>
    <div 
      id="cesiumContainer" 
      class="fullscreen" />
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
  props: {
    userPosition: {
      validator: function(value) {
        return (
          value == null ||
          (value.longitude !== undefined && value.latitude !== undefined)
        );
      },
      type: Object,
      default: () => null
    },
    vehicles: { type: Array, default: () => [] },
    cesiumKey: { type: String, default: "" },
    selectedItem: { type: Array, default: () => [] }
  },
  data() {
    return {};
  },
  watch: {
    selectedItem(item) {
      if (item.length > 0) {
        var v = this.viewer.entities.getById(item[0].name);
        this.viewer.trackedEntity = v;
        if (v) {
          this.viewer.flyTo(v, {
            offset: new Cesium.HeadingPitchRange(0, -1, 1000)
          });
        }
      } else {
        this.viewer.flyTo(this.viewer.entities, {
          offset: new Cesium.HeadingPitchRange(0, -1, 0)
        });
      }
    },
    userPosition(userPos) {
      this.updatePosition(this.userpin, userPos.coords);
    },
    vehicles(val) {
      // TODO: Handle when items are removed from array
      val.forEach(vehicle => this.updateVehicle(vehicle));
    }
  },
  mounted() {
    Cesium.Ion.defaultAccessToken = this.cesiumKey;
    this.viewer = new Cesium.Viewer("cesiumContainer", {
      imageryProvider: Cesium.createWorldImagery(), // use the Bing Maps Aerial imagery from ion (this is the default)
      terrainProvider: Cesium.createWorldTerrain(), // use the Cesium World Terrain from ion
      timeline: false, // Hide widgets
      infoBox: false,
      animation: false,
      fullscreenButton: false,
      baseLayerPicker: false
    });

    this.pinBuilder = new Cesium.PinBuilder();
    this.userpin = this.viewer.entities.add({
      id: "user",
      billboard: {
        image: this.pinBuilder
          .fromText("You", Cesium.Color.BLACK, 70)
          .toDataURL(),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    });
    this.updatePosition(this.userpin, this.userPosition);
    this.vehicles.forEach(vehicle => this.updateVehicle(vehicle));
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
  },
  methods: {
    updatePosition(entity, position) {
      if (
        entity !== undefined &&
        position !== undefined &&
        position.longitude !== undefined &&
        position.latitude !== undefined
      ) {
        entity.position = Cesium.Cartesian3.fromDegrees(
          position.longitude,
          position.latitude
        );
      }
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
        if (this.viewer.trackedEntity == null) {
          this.viewer.flyTo(this.viewer.entities, {
            offset: new Cesium.HeadingPitchRange(0, -1, 0)
          });
        }
      }
    }
  }
};
</script>