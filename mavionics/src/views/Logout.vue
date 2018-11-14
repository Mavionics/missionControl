<template>
  <div class="logout">   
     <Layout>
      <div class="container">
        <h1>You have been logged out!</h1>
      </div>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout.vue";

export default {
  name: "logout",
  components: {
    Layout
  },
  mounted() {
    this.$store.dispatch("logout");
  }
};
</script>

