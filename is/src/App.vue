<template>
  <v-app id="main">
    <v-container fluid class="bar-container">
      <v-app-bar class="nav-bar" elevate="0" flat color="deep-orange accent-4">
        <v-icon size="200">$vuetify.icons.custom</v-icon>
        <v-spacer></v-spacer>
        <router-link v-if="loggedIn" style="text-decoration: none" to="/write">
          <v-btn plain class="write-button">
            <v-icon left> mdi-pencil </v-icon>
            Write
          </v-btn></router-link
        >
        <router-link
          v-if="!loggedIn"
          style="text-decoration: none"
          to="/login"
          class="light"
        >
          <v-btn plain class="write-button">Login</v-btn></router-link
        >
        <nav-profile v-else />
      </v-app-bar>
    </v-container>
    <main-card class="bar" />
    <v-main>
      <div class="front"><router-view /></div
    ></v-main>
  </v-app>
</template>

<script>
// import Navbar from "./components/Navbar.vue";
import NavProfile from "@/components/NavProfile.vue";
import MainCard from "./components/MainCard.vue";
// import AllPosts from "@/components/Post.vue";
export default {
  name: "App",
  components: {
    // AllPosts,
    NavProfile,

    MainCard,
  },

  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style scoped>
.bar-container {
  position: sticky;
  position: -webkit-sticky;
  z-index: 1;
  top: 0; /* required */
  background-color: #dd2c00;
}

.front {
  width: 1100px;
  margin-top: 140px;
  margin: auto;
}

.nav-bar {
  max-width: 1300px;
  margin: auto;
  color: rgb(255, 255, 255);
}

.write-button li a {
  text-decoration: none;
}

.write-button >>> .v-ripple__container {
  opacity: 0 !important;
}

.write-button >>> .v-btn__content {
  opacity: 1 !important;
  color: white !important;
}
</style>
