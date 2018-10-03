<template>

  <div class="controlRoom">
    <section class="hero is-info is-fullheight">
      <div class="hero-head">
        <Navbar/>
        
        <div class="box is-glass">
          <h1>Control Room for {{displayName}}.</h1>
          <div>You are in the Control Room! Mind your step!</div>
          <table class="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vehicle in vehicles" 
                  v-bind:key="vehicle.id">
                <th>{{vehicle.name}}</th>
                <td>{{vehicle.id}}</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "ControlRoom",
  components: {
    Navbar
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
