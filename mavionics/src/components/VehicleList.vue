<template>
  <table class="table is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>Status</th>
        <th>Name</th>
        <th class="is-hidden-touch">Location</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <VehicleListItem v-for="vehicle in vehicles" 
          :key="vehicle.id" :vehicle="vehicle" />
    </tbody>
  </table>
</template>

<script>
import VehicleListItem from "@/components/VehicleListItem";
export default {
  name: "VehicleList",
  components: {
    VehicleListItem
  },
  props: {
    vehicles: Array
  }
};
</script>

<style>
</style>
