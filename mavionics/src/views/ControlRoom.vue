<template>
  <b-container class="controlRoom is-glass p-2">
    <b-row>
      <b-col>
        <!-- Wait for Cesium Key before loading OverviewMap -->
        <OverviewMap
          :vehicles="vehicles"
          :cesiumKey="cesiumKey"
          :userPosition="myPosition"
          :selectedItem="selectedItem"
          v-if="!loading"
        />
        <b-spinner class="m-5" v-if="loading"></b-spinner>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <VehicleList :vehicles="vehicles" :selectedItem="selectedItem" @itemSelect="itemSelect"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
</style>


<script>
import OverviewMap from "@/components/OverviewMap.vue";
import VehicleList from "@/components/VehicleList.vue";

export default {
  name: "ControlRoom",
  components: {
    OverviewMap,
    VehicleList
  },
  created() {
    this.$store.dispatch("getMapKeys").then(() => (this.loading = false));
  },
  mounted() {
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
  data() {
    return {
      loading: true,
      myPosition: null,
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
