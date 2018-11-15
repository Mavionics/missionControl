<template>
  <tr v-bind:key="vehicle.id">
        <td data-testid="vehicleStatus">{{status}}</td>
        <th data-testid="vehicleName" :class="{isDisabled : isLive}">{{vehicle.name}}</th>

        <td v-if="vehicle.position" class="is-hidden-touch">{{vehicle.position.latitude}}, {{vehicle.position.longitude}} </td>
        <td>
          <router-link name="Connect" class="button is-success" :disabled="!isLive" to="/logout">Connect</router-link>
        </td>
      </tr>
</template>

<script>
export default {
  name: "VehicleListItem",
  props: {
    vehicle: Object
  },

  computed: {
    isLive() {
      return Date.now()/1000 - this.vehicle.timestamp.seconds < 10;
    },
    status() {
      return this.isLive ? "Live" : "Offline";
    }
  }
};
</script>

<style>
</style>
