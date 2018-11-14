<template>
  <div class="home">
    <Layout :large-logo=true>
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-3">
              <Login/>
            </div>
          </div>
        </div>
    </Layout>
  </div>
</template>

<style>
section.hero.is-info {
  background: linear-gradient(rgb(32, 105, 148, 0.9), rgba(32, 105, 148, 0.4)),
    url(../assets/clouds.jpg) no-repeat center center;
  background-size: cover;
}
</style>


<script>
// @ is an alias to /src
import Layout from "@/components/Layout.vue"
import Login from "@/components/Login.vue";

export default {
  name: "home",
  components: {
    Login,
    Layout
  }
};
</script>
