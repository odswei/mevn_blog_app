<template>
  <v-form @submit.prevent="register">
    <v-container class="form">
      <v-col>
        <v-text-field
          v-model="user.username"
          autocomplete="off"
          label="Username"
          outlined
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="user.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.min]"
          name="input-10-1"
          label="Password"
          outlined
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
      <v-btn type="submit" block large class="ma-2" color="secondary">
        Register
      </v-btn>
      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </v-container>
  </v-form>
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
      rules: {
        min: (v) => v.length == 0 || v.length >= 8 || "Min 8 characters",
      },
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
.form {
  background-color: rgb(255, 255, 255);
  width: 450px;
  padding: 40px;
}
</style>
