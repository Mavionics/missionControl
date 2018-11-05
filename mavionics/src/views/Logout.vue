<template>
  <div class="logout">
      <Navbar/>
    <h1>You have been logged out!</h1>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "logout",
  components: {
    Navbar
  }, 
  mounted() {
    this.$store.dispatch("logout")
  }
};
</script>

