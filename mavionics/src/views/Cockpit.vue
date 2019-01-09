<template>
  <div class="cockpit">
    <div id="top" class="top-panel parent">
      <router-link name="ControlRoom" class="navbar-item" to="/controlroom">Home</router-link>
    </div>
    <div id="video" class="fullscreen-panel parent">
      <div class="middle">Video</div>
      <video id="friendsVideo" autoplay playsinline></video>
    </div>
    <div id="map" class="secondary-panel parent">
      <div class="middle">Map</div>
    </div>
    <div class="lower-panel parent" id="debug">
      <div class="middle">Debug</div>
      <video id="yourVideo" autoplay muted playsinline></video>
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
  left: 35vh;
  margin: 8px;
  bottom: 0;
  height: 35vh;
  background: rgba(0, 0, 0, 0.5);
  right: 35vh;
}

.parent > video {
  max-width: 100%;
  max-height: 100%;
}
</style>

<script>
import Layout from "@/components/Layout.vue";
import store from "@/store/store.js";
import RtcModule from "@/modules/RtcModule";

export default {
  name: "cockpit",
  components: {
    Layout
  },
  mounted() {
    const yourVideo = document.getElementById("yourVideo");
    const friendsVideo = document.getElementById("friendsVideo");

    this.$store
      .dispatch("connectToVehicle", {
        avId: this.avId
      })
      .then(() => {
        let rtc = new RtcModule(this.$store.state.avRef, false);
        rtc.onStream = event => (friendsVideo.srcObject = event.stream);
        // rtc.sendAnswer();

        const sdp = JSON.parse(this.vehicle.offer);
        console.log(sdp.sdp);
      });
  },
  computed: {
    vehicle() {
      return this.$store.state.currentVehicle;
    }
  },
  props: {
    avId: String
  }
};
</script>
