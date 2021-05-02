<template>
  <v-container>
    <v-row>
      <v-col v-for="{ post } in posts" :key="post._id" cols="12" md="6" sm="12">
        <v-card elevation="0">
          <div v-for="(content, index) in post" :key="index">
            <p :class="Object.keys(content)[1]">
              {{ content[Object.keys(content)[1]] }}
            </p>
          </div>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4"> Read </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import Posts from "../components/Posts.vue";
import axios from "axios";
export default {
  data() {
    return {
      posts: "",
      loading: false,
      selection: 1,
    };
  },
  mounted() {
    const token = this.$store.state.user.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("//localhost:3001/p/post")
        .then(({ data }) => (this.posts = data.posts));
    }
  },
};
</script>

<style scoped></style>
