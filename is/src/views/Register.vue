<template>
  <div class="lgn-container">
    <v-form @submit.prevent="register">
      <v-container class="form">
        <v-text-field
          v-model="user.username"
          autocomplete="off"
          label="Username"
          :rules="usernameRules"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          autocomplete="off"
          label="Email"
          :rules="emailRules"
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

        <v-btn type="submit" block large color="secondary"> Register </v-btn>
        <div class="reg">
          Already have an account?
          <router-link to="/login" class="td">Login</router-link>
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
        email: "",
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
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          username: this.user.username,
          password: this.user.password,
        })
        .then(() => {
          this.$router.push({ name: "Login" });
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
