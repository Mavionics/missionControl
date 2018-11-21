<template>
  <div class="cockpit">   
     <Layout>
      <div class="container">
        <h1>This is where you'll fly! VehicleId {{avId}} {{vehicle ? vehicle.name: ''}}</h1>
        <div>All data: {{vehicle}}</div>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout.vue";

export default {
  name: "cockpit",
  components: {
    Layout
  },
  mounted() {
    // Get data from db
    this.$store.dispatch("connectToVehicle", {avId: this.avId});
  },   
  computed: {
    vehicle() {
      return this.$store.state.currentVehicle;
    }
  },
  props:{
    avId: String
  }
};
</script>
