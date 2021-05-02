<template>
  <v-app id="main">
    <v-container fluid id="mar">
      <v-app-bar class="bar" elevate="0" flat color="deep-orange accent-4">
        <v-toolbar-title class="text-h5">Infinite Series</v-toolbar-title>

        <v-spacer></v-spacer>

        <router-link style="text-decoration: none" to="/write">
          <v-btn plain class="write-button">
            <v-icon left> mdi-pencil </v-icon>
            Write
          </v-btn></router-link
        >

        <router-link v-if="!loggedIn" to="/login" class="light"
          >Login</router-link
        >

        <nav-profile v-else />
      </v-app-bar>
    </v-container>
    <div class="jumbotron" v-if="!loggedIn">
      <div class="box">
        <div class="j-title">Show and Share with the world!</div>
      </div>
    </div>
    <v-main>
      <v-container class="front"> <router-view /> </v-container
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

  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style scoped>
#mar {
  margin: auto;
  background-color: #dd2c00;
  position: fixed;
  z-index: 1;
}

.front {
  width: 1100px;
  margin-top: 140px;
}

.bar {
  max-width: 1500px;
  margin: auto;
  color: rgb(255, 255, 255);
}

.jumbotron {
  height: 600px;
  background-color: #dd2c00;
}

.box {
  position: relative;

  max-width: 1500px;
  height: 600px;
  margin: auto;
}

.j-title {
  color: white;
  font-size: 7em;

  position: absolute;
  right: 40px;
  bottom: 0;
  width: 900px;
  text-align: end;
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
