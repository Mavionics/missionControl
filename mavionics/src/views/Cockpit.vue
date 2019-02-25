<template>
  <div class="cockpit">
    <div id="top" class="top-panel parent">
      <router-link name="ControlRoom" class="navbar-item" to="/controlroom">Home</router-link>
    </div>
    <video
      id="video"
      ref="video"
      class="fullscreen-panel parent"
      autoplay
      playsinline
      :src="videoURL"
    ></video>
    <div id="map" class="secondary-panel parent">
      {{ $route.params.vehicle }}
      <div class="middle">Map</div>
    </div>
    <div class="lower-panel parent" id="debug">
      <div class="middle">Debug</div>
      <!-- <video id="yourVideo" autoplay muted playsinline></video> -->
      <div>{{lastData}}</div>
      <div>{{vehicle}}</div>
      <div class="columns">
        <div class="column is-one-third" :class="{'invalid':speed==null}">{{speed}} m/s</div>
        <div class="column is-one-third" :class="{'invalid':heading==null}">{{heading}} &deg;</div>
        <div class="column is-one-third" :class="{'invalid':altitude==null}">{{altitude}} m</div>
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
  left: 35vh;
  margin: 8px;
  bottom: 0;
  height: 35vh;
  background: rgba(0, 0, 0, 0.5);
  right: 35vh;
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
export default {
  name: "cockpit",
  data() {
    return {
      altitude: null,
      verticalSpeed: null,
      speed: null,
      acceleration: null,
      heading: null,
      turnRate: null,
      longitude: null,
      latitude: null,
      lastData: ""
    };
  },
  mounted() {
    // const yourVideo = document.getElementById("yourVideo");
    console.log("Cockpit.vue ", this.$route.params.vehicle);
    this.$store
      .dispatch("connectToVehicle", {
        avId: this.$route.params.vehicle
      })
      .then(() => {
        //if (this.$store.state.avRef == null) return;
      });
  },
  computed: {
    vehicle() {
      return this.$store.state.currentVehicle;
    },
    videoURL() {
      return this.$store.state.videoURL;
    }
  },
  props: {
    avId: String
  }
};
</script>
