<template>
  <div class="about">
    <Layout>
        <div class="container">
          <h1>This is an about page</h1>
          <div>This was build with configuration: {{appConfig}}</div>
        </div>
    </Layout>
  </div>
</template>


<script>
import Layout from "@/components/Layout.vue"

export default {
  name: "about",
  components: {
    Layout
  },
  computed:{
    appConfig() { 
      return process.env.VUE_APP_CONFIG_NAME;
      }
  }
};
</script>