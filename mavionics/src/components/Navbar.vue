<template>
    <div class="content">
        <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" v-if="showBrand" to="/">
              <img id="navbar-brand-img" src="../assets/logo.svg" alt="Mavionics" width="112" height="28" />
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
            <router-link name="ControlRoom" class="navbar-item" to="/controlroom" v-show="isAuthenticated">ControlRoom</router-link>
            <router-link name="About" class="navbar-item" to="/about">About</router-link>
            <div class="navbar-item" v-show="isAuthenticated">
              <div class="buttons">
                <router-link name="Logout" class="button is-light" to="/logout">Logout</router-link>
              </div>
            </div>
        </div>
        </nav>
    </div>
</template>

<script>
  export default {
    name: "Navbar",

    data() {
      return {
        navIsActive: false
      };
    },
    computed: {
      isAuthenticated() {
       return this.currentUser != null
      }
    },
    methods: {
      showHamburger: function() {
        this.navIsActive = !this.navIsActive;
      }
    },
    props: {
      showBrand: {
        type: Boolean,
        default: true
      },
      currentUser: Object,

    }
  };
</script>

<style>
.router-link-exact-active {
  border-bottom: 2px solid;
  border-radius: 2px;
}
</style>
