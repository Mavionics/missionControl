<template>
  <div class="controlRoom">
    <Layout>
      <div class="box is-glass container is-fluid">
        <!-- Wait for Cesium Key before loading OverviewMap -->
        <OverviewMap
          :vehicles="vehicles"
          :cesiumKey="cesiumKey"
          :userPosition="myPosition"
          :selectedItem="selectedItem"
          v-if="!loading"
        />
        <VehicleList :vehicles="vehicles" :selectedItem="selectedItem" @itemSelect="itemSelect"/>
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
  created() {
    this.$store.dispatch("getMapKeys").then(() => (this.loading = false));
  },
  mounted() {
    this.loadingComponent = this.$loading.open();
    navigator.geolocation.getCurrentPosition(pos => {
      this.myPosition = pos.coords;
    });
  },
  computed: {
    vehicles() {
      return this.$store.state.vehicles;
    },
    cesiumKey() {
      return this.$store.state.cesiumKey;
    }
  },
  watch: {
    loading(isTrue) {
      if (!isTrue) {
        this.loadingComponent.close();
      }
    }
  },
  data() {
    return {
      loading: true,
      myPosition: "",
      selectedItem: null
    };
  },
  methods: {
    itemSelect(item) {
      this.selectedItem = item;
    }
  }
};
</script>
