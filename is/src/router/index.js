import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Editor from "../views/Editor.vue";
import Chapter from "../views/Chapter.vue";
import Series from "../views/Series.vue";
import Myseries from "../views/Myseries.vue";
import Setting from "../views/Setting.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/editor/:id",
    name: "Editor",
    component: Editor,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chapter/:id",
    name: "Chapter",
    component: Chapter,
  },
  {
    path: "/series/:id",
    name: "Series",
    component: Series,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/myseries",
    name: "Myseries",
    component: Myseries,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("xhtrvbq");
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next({ name: "Home" });
  }
  next();
});

export default router;
