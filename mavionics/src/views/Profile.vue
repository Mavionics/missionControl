<template>
  <b-container class="profile is-glass">
    <h1>User profile</h1>
    <div>Hello {{getUserName}}</div>
    <b-button md variant="danger" @click="deleteAccount" data-testid="deleteAccount">Delete Account</b-button>
  </b-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "profile",
  components: {},
  computed: {
    appConfig() {
      return process.env.VUE_APP_CONFIG_NAME;
    },
    ...mapGetters(["getUserName"])
  },
  methods: {
    deleteAccount() {
      this.$bvModal
        .msgBoxConfirm(
          "Are you sure you want to delete your account? This action cannot be undone.",
          {
            title: "Deleting account",
            variant: "danger",
            okTitle: "Delete Account",
            okVariant: "danger",
            hideHeaderClose: true
          }
        )
        .then(value => {
          if (value) {
            this.$store
              .dispatch("deleteUser")
              .then(() => this.$router.push({ name: "logout" }));
          }
        });
    }
  }
};
</script>