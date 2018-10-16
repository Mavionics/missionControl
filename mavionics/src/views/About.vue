<template>
  <div class="about">
    <section class="hero is-info is-fullheight">
      <div class="hero-head">
        <Navbar/>
      </div>
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1>This is an about page</h1>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "about",
  components: {
    Navbar
  }
};
</script>