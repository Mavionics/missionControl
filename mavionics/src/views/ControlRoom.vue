<template>
  <div class="controlRoom">
    
    <Layout>
        <div class="box is-glass container is-fluid">
          <OverviewMap :vehicles="vehicles"/>
        </div>
    </Layout>
  </div>
</template>

<style scoped>
</style>


<script>
import Layout from "@/components/Layout.vue"
import OverviewMap from "@/components/OverviewMap.vue"

export default {
  name: "ControlRoom",
  components: {
    Layout,
    OverviewMap,
  },
  computed: {
    displayName() {
      return this.$store.state.currentUser
        ? this.$store.state.currentUser.displayName
        : "";
    },
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
