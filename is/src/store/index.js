import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import NProgress from "nprogress";

const chimney = localStorage.getItem("xhtrvbq");

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  Accept: "application/json",
  "Content-Type": "application/json",
});

apiClient.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

apiClient.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

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
    SET_UPDATED_IMAGE(state, data) {
      state.image.img = data;
    },
    SET_USERNAME(state, data) {
      state.image.u = data;
    },
    SET_WORK_AT(state, data) {
      state.image.w_a = data;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    login({ commit }, credentials) {
      return apiClient.post("/login", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },

    register(context, credentials) {
      return apiClient.post("/register", credentials);
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
    getSeries({ commit }) {
      apiClient.interceptors.request.use(function (config) {
        config.headers.Authorization = "Bearer " + chimney;
        return config;
      });
      return apiClient.get("/api/myseries").then(({ data }) => {
        commit("SET_SERIES", data);
      });
    },
    setSeries({ commit }, seriesData) {
      commit("SET_SERIES", seriesData);
    },
    async getImage({ commit, state }) {
      await apiClient.interceptors.request.use(function (config) {
        config.headers.Authorization = "Bearer " + state.user;
        return config;
      });
      await apiClient.get("/image").then(({ data }) => {
        commit("SET_IMAGE", data);
      });
    },
    setSignal({ commit }, data) {
      commit("SET_SIGNAL", data);
    },
    setSeriesTitle({ commit }, data) {
      apiClient
        .post("/api/series", data)
        .then(() => commit("SET_SIGNAL", true));
    },
    setImgChange({ commit }, data) {
      commit("SET_UPDATED_IMAGE", data);
    },
    setUsername({ commit }, data) {
      commit("SET_USERNAME", data);
    },
    setWorkAt({ commit }, data) {
      commit("SET_WORK_AT", data);
    },
  },
  modules: {},
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
    getImage(state) {
      if (state.image) {
        return state.image.img;
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
    getUname(state) {
      if (state.image) {
        return state.image.u;
      }
    },
    getWorkAt(state) {
      if (state.image) {
        return state.image.w_a;
      }
    },
  },
});
