<template>
  <div class="controlRoom">
    <section class="hero is-info is-fullheight">
      <div class="hero-head">
        <Navbar/>
        <div class="box is-glass">
          <h1>Control Room for {{displayName}}.</h1>
          <div>You are in the Control Room! Mind your step!</div>
          <OverviewMap :vehicles="vehicles"/>
          <table class="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Location</th>
                <th>Connect</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vehicle in vehicles" 
                  v-bind:key="vehicle.id">
                <th>{{vehicle.name}}</th>
                <td></td>

                <td v-if="vehicle.position">{{vehicle.position.latitude}}, {{vehicle.position.longitude}} </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>


<script>
import Navbar from "@/components/Navbar.vue";
import OverviewMap from "@/components/OverviewMap.vue";

export default {
  name: "ControlRoom",
  components: {
    Navbar,
    OverviewMap
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
