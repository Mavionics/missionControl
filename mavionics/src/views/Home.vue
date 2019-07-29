<template>
  <div class="home">
    <b-container>
      <b-row class="m-3 m-sm-5">
        <b-col>
          <b-img src="../assets/logo.svg" fluid alt="Mavionics Logo"></b-img>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Login v-if="!isAuthenticated"/>
        </b-col>
      </b-row>
    </b-container>
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
