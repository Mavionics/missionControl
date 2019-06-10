<template>
  <div class="container">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left"></div>

      <!-- Right side -->
      <div class="level-right">
        <!-- Add filtering later -->
        <!-- <p class="level-item">
          <strong>All</strong>
        </p>
        <p class="level-item">
          <a>Online</a>
        </p>
        <p class="level-item">
          <a>Simulated</a>
        </p>
        <p class="level-item">
          <a>Flying</a>
        </p>-->
      </div>
    </nav>
    <table class="table is-hoverable is-striped is-fullwidth" data-testid="vehicleList">
      <!-- <thead>
      <tr>
        <th>Status</th>
        <th>Name</th>
        <th class="is-hidden-touch">Location</th>
        <th>Action</th>
      </tr>
      </thead>-->
      <tbody>
        <VehicleListItem
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
          @click.native="selectItem(vehicle)"
        />

        <AddVehicleForm :user="user"></AddVehicleForm>
        <tr v-b-modal.modal-add-vehicle class="addLine">
          <td></td>
          <th>
            <font-awesome-icon icon="plus" data-testid="addVehicle" style="margin-right: 5px"></font-awesome-icon>Click to add vehicle...
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VehicleListItem from "@/components/VehicleListItem";
import AddVehicleForm from "@/components/AddVehicleForm";

export default {
  name: "VehicleList",
  components: {
    VehicleListItem,
    AddVehicleForm
  },
  props: {
    vehicles: Array,
    selectedItem: Object
  },
  data: () => {
    return {
      user: {
        name: "Kalle"
      }
    };
  },
  methods: {
    selectItem(item) {
      this.$emit("itemSelect", item);
    }
  }
};
</script>

<style>
.addLine {
  color: #666666;
  font-style: italic;
  border: #dddddd 1px dotted;
  cursor: pointer;
}
</style>
