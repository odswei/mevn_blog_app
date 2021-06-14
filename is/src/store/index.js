import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    series: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("xhtrvbq", userData.hw);
    },
    SET_HW(state, hw) {
      state.user = { hw: hw };
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("xhtrvbq");
      location.reload();
    },
    SET_SERIES(state, seriesData) {
      state.series = seriesData;
    },
    GET_CHAPTERS(state, seriesData) {
      state.series = seriesData;
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
    getSeries({ commit }) {
      return axios.get(`//localhost:3001/myseries`).then(({ data }) => {
        commit("SET_SERIES", data);
      });
    },
    setSeries({ commit }, seriesData) {
      commit("SET_SERIES", seriesData);
    },
    // getChapters({ commit }, series_id) {
    //   return axios
    //     .get(`//localhost:3001/series/${series_id}`)
    // },
  },
  modules: {},
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
});
