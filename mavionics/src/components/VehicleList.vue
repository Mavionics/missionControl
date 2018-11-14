<template>
  <table class="table is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Location</th>
        <th>Connect</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vehicle in vehicles" 
          v-bind:key="vehicle.id">
        <th>{{vehicle.name}}</th>
        <td></td>

        <td v-if="vehicle.position">{{vehicle.position.latitude}}, {{vehicle.position.longitude}} </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name:'VehicleList',
  props:{
    vehicles: Array
  }
}
</script>

<style>

</style>
