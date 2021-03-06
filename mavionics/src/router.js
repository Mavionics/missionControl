import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { store } from "./store/store.js";

import * as log from "loglevel";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/controlroom",
      name: "controlroom",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "controlroom" */ "./views/ControlRoom.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/cockpit/:vehicle",
      name: "cockpit",
      component: () =>
        import(/* webpackChunkName: "cockpit" */ "./views/Cockpit.vue"),
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "cockpit" */ "./views/Profile.vue"),
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/logout",
      name: "logout",
      component: () =>
        import(/* webpackChunkName: "logout" */ "./views/Logout.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/autologin/email/:email/password/:password",
      redirect: async to => {
        await store.dispatch("loginE", {
          email: to.params.email,
          password: to.params.password
        });
      },
      meta: {
        requiresAuth: false
      }
    }
  ]
});

// Handle access verification

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const isAuth = store.getters.isAuthenticated;

  if (requiresAuth && !isAuth) {
    log.warn("Not logged in! Redirecting!");
    next("/");
  } else if (requiresAuth && isAuth) {
    next();
  } else {
    next();
  }
});

export default router;
