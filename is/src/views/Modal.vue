<template>
  <transition name="modal" v-if="!loggedIn">
    <div class="modal-body">
      <div>
        <button class="modal-default-button" @click="$emit('close')">X</button>
      </div>
      <div class="logoblack">
        <v-icon size="80" class="logoblack"
          >$vuetify.icons.logoBlack_btn
        </v-icon>
      </div>

      <login v-if="login" />
      <register v-if="!login" />
      <div v-if="login">
        Don't have an account?
        <button @click="login = false">Register</button>
      </div>

      <div v-if="!login">
        Already have an account?
        <button @click="login = true">Login</button>
      </div>
    </div>
  </transition>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";
export default {
  components: {
    Login,
    Register,
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
  //   data() {
  //     return {
  //       login: false,
  //       register: false,
  //     };
  //   },
};
</script>

<style scoped>
.logoblack {
  text-align: center;
}
.modal-default-button {
  float: right;
}
.modal-body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: aliceblue;
  z-index: 1;
  padding: 30px;
}

h2 {
  text-align: center;
  margin-top: 40px;
  color: #212121;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter, .modal-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
