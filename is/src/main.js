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
    console.log("dipanggil");
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

    axios.defaults.headers.common["Authorization"] = "Bearer " + chimney;
  },
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
