<template>
  <div class="cockpit">
    <div id="top" class="top-panel parent">
      <router-link name="ControlRoom" class="navbar-item" to="/controlroom">Home</router-link>
    </div>
    <div class="fullscreen-panel parent">
      <hud :vehicle="vehicle.state"/>
      <video id="video" ref="video" class autoplay playsinline></video>
    </div>
    <div id="map" class="secondary-panel parent">
      <Map
        class="fill"
        :cesiumKey="cesiumKey"
        :userPosition="myPosition"
        :vehicle="this.$store.state.currentVehicle.state"
      />
    </div>
    <div class="lower-panel parent" id="debug">
      <!-- <div class="middle">Debug</div> -->
      {{ $route.params.vehicle }}
      {{ vehicle.state }}
      <!-- <video id="yourVideo" autoplay muted playsinline></video> -->
      <div>{{this.$store.state.lastData}}</div>
      <!-- <div>{{vehicle}}</div> -->
      <div class="columns">
        <div
          style="text-align:left"
          class="column is-one-third"
          :class="{'invalid':vehicle.state.speed==null}"
        >{{vehicle.state.speed}} m/s</div>
        <div
          style="text-align:center"
          class="column is-one-third"
          :class="{'invalid':vehicle.state.heading==null}"
        >{{vehicle.state.heading}} &deg;</div>
        <div
          style="text-align:right"
          class="column is-one-third"
          :class="{'invalid':vehicle.state.altitude==null}"
        >{{vehicle.state.altitude}} m</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.parent {
  position: absolute;
  display: block;
}

.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-weight: bold;
  font-size: larger;
}

.top-panel {
  z-index: 3;
  top: 0px;
  left: 0px;
  right: 0px;
  color: darkslategrey;
}

.fullscreen-panel {
  object-fit: cover;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 0;
  margin: 0;
  background: #009955;
  text-align: center;
}

.secondary-panel {
  left: 0;
  bottom: 0;
  height: 35vh;
  width: 35vh; /* 16:9 ratio */
  background: #005599;
  margin: 8px;
}

.lower-panel {
  left: 36vh;
  margin: 8px;
  bottom: 0;
  height: 12vh;
  background: rgba(0, 0, 0, 0.3);
  right: 36vh;
}

#debug {
  color: beige;
  z-index: 1;
}

.fill {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

.invalid {
  color: grey;
  opacity: 0.4;
}
</style>

<script>
import { mapGetters } from "vuex";
import Hud from "@/components/Hud";
import Map from "@/components/Map";

export default {
  name: "cockpit",
  components: { Hud, Map },
  created() {
    this.$store.dispatch("getMapKeys").then(() => (this.loading = false));
  },
  mounted() {
    this.loadingComponent = this.$loading.open();
    // const yourVideo = document.getElementById("yourVideo");
    // console.log("Cockpit.vue ", this.$route.params.vehicle);
    // console.log(this.state);
    this.$store
      .dispatch("connectToVehicle", {
        avId: this.$route.params.vehicle
      })
      .then(() => {
        //if (this.$store.state.avRef == null) return;
      });

    console.log(this.$store.state.currentVehicle.state);
  },
  data() {
    return { loading: true, myPosition: { longitude: 15, latitude: 58 } };
  },
  computed: {
    cesiumKey() {
      return this.$store.state.cesiumKey;
    },
    videoStream() {
      return this.$store.state.videoStream;
    },
    ...mapGetters({
      // map `this.vehicle` to `this.$store.getters.getActiveVehicle`
      vehicle: "getActiveVehicle"
    })
  },
  watch: {
    videoStream(stream) {
      document.querySelector("#video").srcObject = stream;
      // this.$ref.video.srcObject = stream
    },
    loading(isTrue) {
      if (!isTrue) {
        this.loadingComponent.close();
      }
    }
  },
  props: {
    avId: String
  }
};
</script>
