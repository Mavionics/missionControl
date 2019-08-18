<template>
  <nb-list-item thumbnail >
    <nb-left>
      <!-- <nb-thumbnail square :source="uri: data.icon" /> -->
    </nb-left>
    <nb-body>
      <nb-text>{{data.name}}</nb-text>
      <nb-text note :numberOfLines="1">{{data.description}}</nb-text>
    </nb-body>

    <nb-right>
      <nb-text v-if="data.isSim" class="sim-text">Simulator</nb-text>
      <nb-text v-else-if="isLive(data)" class="flying-text">Flying</nb-text>
      <nb-button
        v-else
        :on-press="connectToVehicle"
        color="#841584"
        accessibility-label="Vehicle ready for flight"
      >
        <nb-text>Fly</nb-text>
      </nb-button>
    </nb-right>
  </nb-list-item>
</template>
<script>
import store from "../store";

export default {
  props: {
    data: Object
  },
  data: () => {
    return {
      currentTime: Number
    };
  },
  mounted() {
    this.updateTime();
    this.$options.interval = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
  computed: {
    hasIcon: () => this.data && this.data.icon != "",
    isLive: () => {
      return (
        ((Date.now() / 1000 - this.data.timestamp.seconds) < 10.0)
      );
    }
  },
  methods: {
    connectToVehicle(avId) {
      if (store.state.permissionStatus) {
        store.dispatch("SET_ACTIVE_VEHICLE", this.data);
        this.data.navigate("Flight");
      } else {
        store.dispatch("REQUEST_ALL_PERMISSIONS");
      }
    },
    updateTime() {
      this.currentTime = Date.now() / 1000;
    },
    isLive(vehicle) {
      return (
        vehicle.timestamp !== undefined &&
        this.currentTime - vehicle.timestamp.seconds < 10
      );
    }
  },
};
</script>

<style>
.flying-text {
  color: #0066ff;
  font-weight: bold;
}
.sim-text {
  color: #ff6600;
  font-weight: bold;
}
</style>