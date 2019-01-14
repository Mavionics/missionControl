<template>
  <div class="home">
    <Layout :large-logo="true">
      <div class="container">
        <div class="columns">
          <div class="column is-6 is-offset-3">
            <Login v-if="!isAuthenticated"/>
          </div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<style>
</style>


<script>
// @ is an alias to /src
import Layout from "@/components/Layout.vue";
import Login from "@/components/Login.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    Login,
    Layout
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
