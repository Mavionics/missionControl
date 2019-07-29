<template>
  <b-container class="about is-glass">
    <h1>This is an about page</h1>
    <div>This was build with configuration: {{appConfig}}</div>
  </b-container>
</template>


<script>
export default {
  name: "about",
  computed: {
    appConfig() {
      return process.env.VUE_APP_CONFIG_NAME;
    }
  }
};
</script>