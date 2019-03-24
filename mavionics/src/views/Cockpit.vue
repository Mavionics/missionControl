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
      <div class="middle">Map</div>
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
          class="column is-one-third"
          :class="{'invalid':vehicle.state.speed==null}"
        >{{vehicle.state.speed}} m/s</div>
        <div
          class="column is-one-third"
          :class="{'invalid':vehicle.state.heading==null}"
        >{{vehicle.state.heading}} &deg;</div>
        <div
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

.invalid {
  color: grey;
  opacity: 0.4;
}
</style>

<script>
import { mapGetters } from "vuex";
import Hud from "@/components/Hud";

export default {
  name: "cockpit",
  components: { Hud },
  mounted() {
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
  },
  computed: {
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
    }
  },
  props: {
    avId: String
  }
};
</script>
