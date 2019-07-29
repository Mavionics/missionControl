<template>
  <b-container class="controlRoom is-glass p-2">
    <b-row>
      <b-col>
        <!-- Wait for Cesium Key before loading OverviewMap -->
        <OverviewMap
          v-if="!loading"
          :vehicles="vehicles"
          :cesium-key="cesiumKey"
          :user-position="myPosition"
          :selected-item="selectedItem"
        />
        <b-spinner 
          v-if="loading" 
          class="m-5"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <VehicleList 
          :vehicles="vehicles" 
          :selected-item="selectedItem" 
          @itemSelect="itemSelect"/>
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
  data() {
    return {
      loading: true,
      myPosition: null,
      selectedItem: null
    };
  },
  computed: {
    vehicles() {
      return Object.values(this.$store.state.vehicles);
    },
    cesiumKey() {
      return this.$store.state.cesiumKey;
    }
  },
  created() {
    this.$store.dispatch("getMapKeys").then(() => (this.loading = false));
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.myPosition = pos.coords;
    });
  },
  methods: {
    itemSelect(item) {
      this.selectedItem = item;
    }
  }
};
</script>
