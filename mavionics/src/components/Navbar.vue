<template>
    <div class="content">
        <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
            <img v-if="showBrand" src="../assets/logo.svg" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" >
            </router-link>

            <a role="button" class="navbar-burger" @click="showHamburger" :class="{'is-active':navIsActive}" data-target="navMenu" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" :class="{'is-active':navIsActive}">
        <div class="navbar-end">      
            <router-link class="navbar-item" to="/">Home</router-link>
            <router-link class="navbar-item" to="/controlroom">ControlRoom</router-link>
            <router-link class="navbar-item" to="/about">About</router-link>
            <router-link class="navbar-item" to="/logout" v-show="loggedIn" @click="logout"><div class="button">Logout</div></router-link>
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
</style>
