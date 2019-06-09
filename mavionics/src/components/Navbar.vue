<template>
  <b-navbar toggleable="sm" type="dark" variant="faded">
    <b-navbar-brand to="/" class="no-active-indication">
      <img
        id="navbar-brand-img"
        src="../assets/logo.svg"
        alt="Mavionics"
        width="112"
        height="28"
        v-if="showBrand"
      >
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item name="Home" to="/">Home</b-nav-item>
        <b-nav-item name="ControlRoom" to="/controlroom" v-show="isAuthenticated">ControlRoom</b-nav-item>
        <b-nav-item name="About" to="/about">About</b-nav-item>
        <b-nav-item-dropdown id="nav-user-dropdown" name="User" right v-show="isAuthenticated">
          <template slot="button-content">
            <font-awesome-icon icon="user"></font-awesome-icon>
          </template>

          <b-dropdown-item name="Profile" to="/profile" v-show="isAuthenticated">Profile</b-dropdown-item>
          <b-dropdown-item name="Logout" to="/logout" v-show="isAuthenticated">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    showBrand: {
      type: Boolean,
      default: true
    },
    currentUser: Object,
    isAuthenticated: Boolean
  }
};
</script>

<style>
.no-active-indication.router-link-exact-active {
  border-bottom: 0px;
}

.router-link-exact-active {
  border-bottom: 2px solid;
  border-radius: 2px;
}
</style>
