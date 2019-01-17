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
        <p class="level-item">
          <button class="button is-primary" @click="showAddVehicle = true">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
            <span>Add</span>
          </button>
          <b-modal :active.sync="showAddVehicle" has-modal-card>
            <AddVehicleForm :user="user"></AddVehicleForm>
          </b-modal>
        </p>
      </div>
    </nav>
    <table class="table is-hoverable is-striped is-fullwidth">
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
      </tbody>
    </table>
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
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
      showAddVehicle: false,
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
</style>
