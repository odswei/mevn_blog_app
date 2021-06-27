<template>
  <v-app id="main">
    <div class="navbar">
      <div class="nav-container">
        <div class="selected">
          <router-link to="/"
            ><img src="./assets/logo-black.svg" class="logo" alt="//nsery." />
          </router-link>
        </div>

        <!-- <router-link v-if="loggedIn" style="text-decoration: none" to="/editor">
          <v-btn plain class="write-button">
            <v-icon left> mdi-pencil </v-icon>
            Write
          </v-btn></router-link
        > -->

        <!-- <router-link
          v-if="!loggedIn"
          style="text-decoration: none"
          to="/login"
          class="light"
        >
          <v-btn plain class="write-button">Login</v-btn></router-link
        > -->

        <div class="selected lgn-btn">
          <router-link to="/login" v-if="!loggedIn" class="log-dec"
            >Login
          </router-link>
        </div>
        <!-- use the modal component, pass in the prop -->

        <div class="selected">
          <router-link v-if="loggedIn" class="my-series" to="/myseries">
            My Series
          </router-link>
        </div>
        <div class="selected">
          <nav-profile class="profile" v-if="loggedIn" />
        </div>
      </div>
    </div>
    <v-main>
      <div class="main"><router-view /></div
    ></v-main>
  </v-app>
</template>

<script>
// import Navbar from "./components/Navbar.vue";
import NavProfile from "@/components/NavProfile.vue";

// import AllPosts from "@/components/Post.vue";
export default {
  name: "App",
  components: {
    // AllPosts,

    NavProfile,
  },

  data() {
    return {
      login: true,
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style scoped>
.nav-container {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  height: 88px;
  padding: 0px 25px;
  align-items: flex-start;
}
.nav-container .selected.lgn-btn {
  margin-left: auto;
}

.log-dec {
  color: #272829;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.25em;
  font-weight: bold;
  padding-right: 10px;
}
.nav-container .selected {
  align-self: center;
}

.nav-container .selected .profile {
  margin-right: 6px;
}

.logo {
  height: 30px;
  width: auto;
}
#main {
  background-color: #ffffff;
}

/* .navbar {
  background-image: url("./assets/vector24.svg");
  background-repeat: no-repeat;
  background-size: cover;
  position: sticky;
  position: -webkit-sticky;
  z-index: 1;
  height: 100px;
  top: 0px; /* required */
/* } */
.navbar {
  background-color: white;
  width: 100vw;
  z-index: 2;
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
}

.main {
  max-width: 1300px;
  margin: auto;
}

.my-series {
  text-decoration: none;
  font-size: 1.1em;
  color: #272829;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  margin-right: 10px;
}

/* .nav-bar {
  max-width: 1300px;
  margin: auto;
  color: rgb(255, 255, 255);
} */
/*
.write-button li a {
  text-decoration: none;
}

.write-button >>> .v-ripple__container {
  opacity: 0 !important;
}

.write-button >>> .v-btn__content {
  opacity: 1 !important;
  color: #272829 !important;
} */
</style>
