<template>
  <div class="layout">
    <section class="hero is-info is-fullheight bg-clouds">
      <div class="hero-head">
        <Navbar :showBrand="!largeLogo" :currentUser="currentUser" />
        <img v-if="largeLogo" src="../assets/logo.svg"/>
      </div>
      <div class="hero-body has-text-centered">
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Layout",
  components: {
    Navbar
  },
  props: {
    largeLogo: { type: Boolean, default: false }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'currentUser'])
  }
};
</script>

<style>
.bg-clouds {
  /* background: linear-gradient(rgb(32, 105, 148, 0.9), rgba(32, 105, 148, 0.4)),
    url(../assets/clouds.jpg) no-repeat center center; */
  background: url(../assets/clouds.jpg) no-repeat center center;
  background-size: cover;
}
</style>
