import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    login({ commit }, credentials) {
      return axios
        .post("//localhost:3001/login", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },

    register(context, credentials) {
      return axios.post("//localhost:3001/register", credentials);
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
  },
  modules: {},
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
});
