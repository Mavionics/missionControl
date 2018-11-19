<template>
  <tr v-bind:key="vehicle.id">
        <td data-testid="vehicleStatus">{{status}}</td>
        <th data-testid="vehicleName" :class="{isDisabled : isLive}">{{vehicle.name}}</th>

        <td v-if="vehicle.position" class="is-hidden-touch">{{vehicle.position.latitude}}, {{vehicle.position.longitude}} </td>
        <td>
          <div name="Connect" class="button is-success" :disabled="!isLive" @click="connectToVehicle(vehicle.id)">Connect</div>
        </td>
      </tr>
</template>

<script>
  import * as log from 'loglevel';

export default {
  name: "VehicleListItem",
  props: {
    vehicle: Object
  },
  computed: {
    isLive() {
      return (Date.now()/1000 - this.vehicle.timestamp.seconds) < 10;
    },
    status() {
      return this.isLive ? "Live" : "Offline";
    }
  },
  methods: {
    connectToVehicle(avId){
      log.info("Connecting to " + avId);

      this.$router.push({ name: 'cockpit', params: { avId: avId }})
    }
  }
};
</script>

<style>
</style>
