<template>
  <div class="home">
    <img src="../assets/logo.svg">
    <div class="container">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <Login v-if="!isAuthenticated"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>


<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    Login
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
