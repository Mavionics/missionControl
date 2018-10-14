<template>

  <div class="controlRoom">
    <section class="hero is-info is-fullheight">
      <div class="hero-head">
        <Navbar/>
        <div class="box is-glass">
          <h1>Control Room for {{displayName}}.</h1>
          <div>You are in the Control Room! Mind your step!</div>
          <div id="cesiumContainer" class="fullscreen"></div>
          <table class="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vehicle in vehicles" 
                  v-bind:key="vehicle.id">
                <th>{{vehicle.name}}</th>
                <td>{{vehicle.id}}</td>

                <td v-if="vehicle.position">{{vehicle.position.latitude}}, {{vehicle.position.longitude}} </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
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
import Navbar from "@/components/Navbar.vue";
import Cesium from "cesium/Cesium";
require("cesium/Widgets/widgets.css");

export default {
  name: "ControlRoom",
  components: {
    Navbar
  },
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

    // var pinBuilder = new Cesium.PinBuilder();

    // this.viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    //   billboard: {
    //     image : pinBuilder.fromText('?', Cesium.Color.BLACK, 48).toDataURL(),
    //     verticalOrigin : Cesium.VerticalOrigin.BOTTOM
    //   },
    // });
  },
  computed: {
    displayName() {
      return this.$store.state.currentUser
        ? this.$store.state.currentUser.displayName
        : "";
    },
    vehicles() {
      return this.$store.state.vehicles;
    }
  },
  data() {
    return {
      name: ""
    };
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
