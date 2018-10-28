<template>
    <div class="content">
        <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" v-if="showBrand" to="/">
              <img id="navbar-brand-img" src="../assets/logo.svg" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
            </router-link>

            <a role="button" class="navbar-burger" @click="showHamburger" :class="{'is-active':navIsActive}" data-target="navMenu" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" :class="{'is-active':navIsActive}">
        </div>
        <div class="navbar-end">      
            <router-link name="Home" class="navbar-item" to="/">Home</router-link>
            <router-link name="ControlRoom" class="navbar-item" to="/controlroom">ControlRoom</router-link>
            <router-link name="About" class="navbar-item" to="/about">About</router-link>
            <div class="navbar-item">
              <div class="buttons">
                <router-link name="Logout" class="button is-light" to="/logout" v-show="loggedIn" @click="logout">Logout</router-link>
              </div>
            </div>
        </div>
        </nav>
    </div>
</template>

<script>
  import store from "../store.js";

  export default {
    name: "Navbar",

    data() {
      return {
        navIsActive: false
      };
    },
    computed: {
      loggedIn() {
        return store.state.currentUser != null;
      }
    },
    methods: {
      showHamburger: function() {
        this.navIsActive = !this.navIsActive;
      },
      logout() {
        store.dispatch("fetchUserProfile");
      }
    },
    props: {
      showBrand: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      loggedIn(val) {
        console.log("Logged in is " + val);
      }
    }
  };
</script>

<style>
.router-link-exact-active {
  border-bottom: 2px solid;
  border-radius: 2px;
}
</style>
