<template>
  <div class="logout">
    <div class="container">
      <h1>You have been logged out!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "logout",
  components: {},
  mounted() {
    this.$store.dispatch("logout");
  }
};
</script>

