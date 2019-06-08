<template>
  <div id="app">
    <Navbar :showBrand="!largeLogo" :isAuthenticated="isAuthenticated"/>
    <!-- <img v-if="largeLogo" src="/assets/logo.svg"> -->
    <div class="hero-body has-text-centered">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
html {
  background: url("assets/clouds.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  props: {
    largeLogo: { type: Boolean, default: false }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
};
</script>
