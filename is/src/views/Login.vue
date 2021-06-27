<template>
  <div class="lgn-container">
    <v-form @submit.prevent="login">
      <v-container class="form">
        <v-text-field
          v-model="user.username"
          autocomplete="off"
          :rules="usernameRules"
          label="Username"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          autocomplete="off"
          hint="At least 8 characters"
          @click:append="show1 = !show1"
          outlined
        ></v-text-field>

        <v-btn type="submit" large block color="secondary"> Login </v-btn>
        <div class="reg">
          Don't have an account?
          <router-link to="/register" class="td">Register</router-link>
        </div>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      show1: false,
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length == 0 || v.length >= 8 || "Min 8 characters",
      ],
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => !/\W/.test(v) || "Username must be valid",
      ],
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.user.username,
          password: this.user.password,
        })
        .then(() => {
          const path = `/`;
          if (this.$route.path !== path) this.$router.push(path);
        });
    },
  },
};
</script>
<style scoped>
.reg {
  margin-top: 15px;
  color: #272829;
}
.td {
  text-decoration: none;
  color: #272829;
}
.form {
  padding: 40px;
}

.lgn-container {
  width: 400px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
