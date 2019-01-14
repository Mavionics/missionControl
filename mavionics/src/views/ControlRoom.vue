<template>
  <div class="controlRoom">
    <Layout>
      <div class="box is-glass container is-fluid">
        <OverviewMap :vehicles="vehicles"/>
        <VehicleList :vehicles="vehicles"/>
      </div>
    </Layout>
  </div>
</template>

<style scoped>
</style>


<script>
import Layout from "@/components/Layout.vue";
import OverviewMap from "@/components/OverviewMap.vue";
import VehicleList from "@/components/VehicleList.vue";

export default {
  name: "ControlRoom",
  components: {
    Layout,
    OverviewMap,
    VehicleList
  },
  computed: {
    vehicles() {
      return this.$store.state.vehicles;
    }
  },
  data() {
    return {
      name: ""
    };
  }
};
</script>
