<template>
  <v-app id="main">
    <div class="navbar">
      <div class="nav-container">
        <router-link to="/"
          ><img src="./assets/logo.svg" class="logo" alt="//nsery." />
        </router-link>

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

        <button
          v-if="!loggedIn"
          id="show-modal"
          @click="showModal = true"
          class="login-button"
        >
          <strong> Log In</strong>
        </button>
        <!-- use the modal component, pass in the prop -->

        <nav-profile class="profile" v-if="loggedIn" />
        <router-link
          v-if="loggedIn"
          style="text-decoration: none"
          to="/myseries"
          class="login-button"
        >
          <v-btn plain class="write-button"> My Series </v-btn></router-link
        >
      </div>
    </div>
    <v-main
      ><div>
        <modal v-if="showModal" @close="showModal = false" />
      </div>
      <div class="main"><router-view /></div
    ></v-main>
  </v-app>
</template>

<script>
// import Navbar from "./components/Navbar.vue";
import NavProfile from "@/components/NavProfile.vue";
import Modal from "./views/Modal.vue";

// import AllPosts from "@/components/Post.vue";
export default {
  name: "App",
  components: {
    // AllPosts,

    NavProfile,
    Modal,
  },

  data() {
    return {
      login: true,
      showModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },

  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style scoped>
.profile {
  float: right;
}
.nav-container {
  padding: 25px 25px 0px 25px;
  max-width: 1300px;
  margin: auto;
}
.login-button {
  color: white;
  float: right;
  margin-top: 7px;
}

.logo {
  height: 30px;
  width: auto;
}
#main {
  background-color: #ffffff;
}

.navbar {
  background-image: url("./assets/vector24.svg");
  background-repeat: no-repeat;
  background-size: cover;
  position: sticky;
  position: -webkit-sticky;
  z-index: 1;
  height: 100px;
  top: 0px; /* required */
}
.main {
  max-width: 1300px;
  margin: auto;
}

/* .nav-bar {
  max-width: 1300px;
  margin: auto;
  color: rgb(255, 255, 255);
} */

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
