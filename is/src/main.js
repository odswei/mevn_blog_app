import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const chimney = localStorage.getItem("xhtrvbq");

    if (chimney) {
      this.$store.commit("SET_HW", chimney);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
    // console.log("BASE", process.env.BASE_URL);
    if (process.env.NODE_ENV == "production") {
      // axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
      axios.defaults.baseURL = "http://localhost:3001";
    } else {
      axios.defaults.baseURL = "http://localhost:3001";
    }
    axios.defaults.headers.common["Authorization"] = "Bearer " + chimney;
  },
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
