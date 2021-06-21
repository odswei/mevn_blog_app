import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    series: null,
    imgChange: false,
    image: null,
    seriesChange: false,
    signal: false,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData.hw.token;
      localStorage.setItem("xhtrvbq", userData.hw.token);
    },
    SET_HW(state, hw) {
      state.user = hw;
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
    SET_IMAGE(state, data) {
      state.image = data;
    },
    SET_SIGNAL(state, data) {
      state.signal = data;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    login({ commit }, credentials) {
      return axios.post("/login", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },

    register(context, credentials) {
      return axios.post("/register", credentials);
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
    getSeries({ commit }) {
      return axios.get(`/myseries`).then(({ data }) => {
        commit("SET_SERIES", data);
      });
    },
    setSeries({ commit }, seriesData) {
      commit("SET_SERIES", seriesData);
    },
    getImage({ commit, state }) {
      if (state.user) {
        const token = localStorage.getItem("xhtrvbq");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get("/image").then(({ data }) => {
          commit("SET_IMAGE", data);
        });
      } else {
        console.log(this.$vuetify.save_btn);
        const data = null;
        commit("SET_IMAGE", data);
      }
    },
    setSignal({ commit }, data) {
      commit("SET_SIGNAL", data);
    },
    setSeriesTitle({ commit }, data) {
      axios.post("/series", data).then(() => commit("SET_SIGNAL", true));
    },
  },
  modules: {},
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
    getImage(state) {
      if (state.image) {
        return (
          "data:" + state.image.contentType + ";base64, " + state.image.data
        );
      }
      return state.image;
    },
    seriesChange(state) {
      return state.seriesChange;
    },
    getSignal(state) {
      return state.signal;
    },
    getSeries(state) {
      return state.series;
    },
  },
});
