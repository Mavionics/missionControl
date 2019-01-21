<template>
  <div class="profile">
    <Layout>
      <div class="container">
        <h1>User profile</h1>
        <div>Hello {{getUserName}}</div>
        <button
          class="button is-medium is-danger"
          @click="deleteAccount"
          data-testid="deleteAccount"
        >Delete Account</button>
      </div>
    </Layout>
  </div>
</template>


<script>
import Layout from "@/components/Layout.vue";
import { mapGetters } from "vuex";

export default {
  name: "profile",
  components: {
    Layout
  },
  computed: {
    appConfig() {
      return process.env.VUE_APP_CONFIG_NAME;
    },
    ...mapGetters(["getUserName"])
  },
  methods: {
    deleteAccount() {
      this.$dialog.confirm({
        title: "Deleting account",
        message:
          "Are you sure you want to <b>delete</b> your account? This action cannot be undone.",
        confirmText: "Delete Account",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.$store
            .dispatch("deleteUser")
            .then(() => this.$router.push({ name: "logout" }));
        }
      });
    }
  }
};
</script>