<template>
  <b-table
    :items="vehicles"
    :fields="fields"
    striped
    hover
    data-testid="vehicleList"
    thead-class="d-none"
    selectable
    select-mode="single"
    @row-selected="selectItem"
  >
    <template 
      slot="status" 
      slot-scope="vehicle">
      <span 
        class="capitalize" 
        data-testid="vehicleStatus">{{ getStatus(vehicle.item) }}</span>
    </template>

    <template 
      slot="name" 
      slot-scope="vehicle">
      <span data-testid="vehicleName">
        <b>{{ vehicle.item.name }}</b>
      </span>
    </template>

    <template 
      slot="sim" 
      slot-scope="vehicle">
      <div 
        v-if="vehicle.item.isSim" 
        class="field">
        <b-form-checkbox
          v-model="vehicle.item.runSim"
          name="check-button"
          data-testid="runSimulation"
          switch
          @input="(state)=>toggleSimulation(state, vehicle.item.id)"
        >Run Simulation</b-form-checkbox>
      </div>
    </template>

    <template 
      slot="connect" 
      slot-scope="vehicle">
      <b-button
        :disabled="!isReadyForConnect(vehicle.item)"
        name="Connect"
        variant="success"
        class="float-right"
        @click="connectToVehicle(vehicle.item.id)"
      >Connect</b-button>
    </template>

    <template slot="bottom-row">
      <AddVehicleForm/>
      <td 
        v-b-modal.modal-add-vehicle 
        colspan="4" 
        class="addLine">
        <font-awesome-icon 
          icon="plus" 
          data-testid="addVehicle" 
          style="margin-right: 8px"/>Click to add vehicle...
      </td>
    </template>
  </b-table>
</template>

<script>
import AddVehicleForm from "@/components/AddVehicleForm";

export default {
  name: "VehicleList",
  components: {
    AddVehicleForm
  },
  props: {
    vehicles: {
      type: Array,
      default: () => {}
    },
    selectedItem: {
      type: Object,
      default: null
    }
  },
  data: () => {
    return {
      fields: ["status", "name", "sim", "connect"],
      currentTime: Number
    };
  },
  computed: {},
  mounted() {
    this.updateTime();
    this.$options.interval = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
  methods: {
    selectItem(item) {
      this.$emit("itemSelect", item);
    },
    updateTime() {
      this.currentTime = Date.now() / 1000;
    },
    isLive(vehicle) {
      // console.log(
      //   vehicle.name,
      //   this.currentTime,
      //   vehicle.timestamp.seconds,
      //   this.currentTime - vehicle.timestamp.seconds
      // );
      return (
        vehicle.timestamp !== undefined &&
        this.currentTime - vehicle.timestamp.seconds < 10
      );
    },
    isReadyForConnect(vehicle) {
      return this.isLive(vehicle) && vehicle.status === "offer";
    },
    getStatus(vehicle) {
      if (this.isLive(vehicle)) {
        return vehicle.status;
      } else {
        return "Offline";
      }
    },
    toggleSimulation(start, avId) {
      if (start) {
        this.$store.dispatch("startSimulation", { avId: avId });
      } else {
        this.$store.dispatch("stopSimulation", { avId: avId });
      }
    },
    connectToVehicle(avId) {
      this.$router.push("cockpit/" + avId); // { name: "cockpit", params: { vehicle: avId } });
    }
  }
};
</script>

<style>
.table {
  text-align: left;
}
.addLine {
  color: #666666;
  font-style: italic;
  cursor: pointer;
}
</style>
