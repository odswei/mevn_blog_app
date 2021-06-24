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
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/editor/:id?",
    name: "Editor",
    component: Editor,
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
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: {
      requiresAuth: true,
    },
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
    path: "*",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

async function isAuthenticated() {
  const token = localStorage.getItem("xhtrvbq");
  let user = false;
  if (token) {
    if (process.env.NODE_ENV == "production") {
      axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
      // axios.defaults.baseURL = "http://localhost:3001";
      // console.log(process.env.VUE_APP_BASE_URL);
    } else {
      axios.defaults.baseURL = "http://localhost:3001";
    }
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    await axios.get("/user").then(({ data }) => {
      user = data.user;
      // console.log(user);
    });
  }
  return user;
}

router.beforeEach(async (to, from, next) => {
  const isAuth = await isAuthenticated();
  // console.log("cek", isAuth);
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuth) {
    next("/");
  } else next();
});

export default router;
