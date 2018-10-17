<template>
  <div class="home">
    <section class="hero is-info is-fullheight">
      <div class="hero-head">
        <Navbar :showBrand="false" />
        
         <img src="../assets/logo.svg"/>
      </div>
      <div class="hero-body has-text-centered">
        <div class="container">
          <div class="columns">
            <div class="column is-6 is-offset-3">
              <Login/>
            </div>
          </div>
        </div>
      </div>
    </section>
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
import Login from "@/components/Login.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  components: {
    Login,
    Navbar
  }
};
</script>
