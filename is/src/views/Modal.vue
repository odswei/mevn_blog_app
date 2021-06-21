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

      <login v-if="toLogin" />
      <register v-if="!toLogin" />
      <div v-if="toLogin">
        Don't have an account?
        <button @click="toLogin = false">Register</button>
      </div>

      <div v-if="!toLogin">
        Already have an account?
        <button @click="toLogin = true">Login</button>
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
      toLogin: true,
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
  background-color: #ffffff;
  color: #332f2f;
  z-index: 1;
  padding: 30px;
  border: 1px solid #524c4c;
  border-radius: 5px;
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
