<template>
  <tr v-bind:key="vehicle.id">
    <td data-testid="vehicleStatus" class="capitalize">{{status}}</td>
    <th data-testid="vehicleName" :class="{isDisabled : isLive}">{{vehicle.name}}</th>

    <td class="is-hidden-touch">
      <span v-if="vehicle.position">{{position}}</span>
    </td>
    <td>
      <div class="field" v-if="vehicle.isSim">
        <b-switch
          data-testid="runSimulation"
          v-model="vehicle.runSim"
          @input="toggleSimulation"
        >Run Simulation</b-switch>
      </div>
    </td>
    <td>
      <div
        name="Connect"
        class="button is-success is-pulled-right"
        :disabled="!isReadyForConnect"
        @click="connectToVehicle(vehicle.id)"
      >Connect</div>
    </td>
  </tr>
</template>

<script>
// import * as log from 'loglevel';

export default {
  name: "VehicleListItem",
  props: {
    vehicle: Object
  },
  mounted() {
    this.updateTime();
    this.$options.interval = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
  data: () => {
    return {
      currentTime: Number,
      runSim: false
    };
  },
  computed: {
    isLive() {
      return (
        this.vehicle.timestamp !== undefined &&
        this.currentTime - this.vehicle.timestamp.seconds < 10
      );
    },
    status() {
      if (this.isLive) {
        return this.vehicle.status;
      } else {
        return "Offline";
      }
    },
    isReadyForConnect() {
      return this.isLive && this.vehicle.status === "offer";
    },
    position() {
      if (
        typeof this.vehicle !== "undefined" &&
        typeof this.vehicle.position !== "undefined" &&
        typeof this.vehicle.position.coords !== "undefined" &&
        typeof this.vehicle.position.coords.latitude === "number" &&
        typeof this.vehicle.position.coords.longitude === "number"
      ) {
        return (
          this.vehicle.position.coords.latitude.toFixed(2) +
          ", " +
          this.vehicle.position.coords.longitude.toFixed(2)
        );
      }
    }
  },
  methods: {
    connectToVehicle(avId) {
      this.$router.push({ name: "cockpit", params: { avId: avId } });
    },
    updateTime() {
      this.currentTime = Date.now() / 1000;
    },
    toggleSimulation(start) {
      if (start) {
        this.$store.dispatch("startSimulation", { avId: this.vehicle.id });
      } else {
        this.$store.dispatch("stopSimulation", { avId: this.vehicle.id });
      }
    }
  }
};
</script>

<style>
.capitalize:first-letter {
  text-transform: capitalize;
}
</style>
