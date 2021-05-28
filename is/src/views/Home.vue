<template>
  <v-container>
    <!-- <v-row>
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
    </v-row> -->
    <main-card class="bar" />
    <profile-photo />hi
    <div v-for="(post, index) of posts" :key="index">{{ post.s_title }}</div>
  </v-container>
</template>

<script>
import MainCard from "../components/MainCard.vue";
// @ is an alias to /src
import ProfilePhoto from "../components/ProfilePhoto.vue";
import axios from "axios";
export default {
  components: {
    ProfilePhoto,
    MainCard,
  },
  data() {
    return {
      posts: "hello world",
      loading: false,
      selection: 1,
    };
  },

  mounted() {
    const hw = this.$store.state.user;
    if (hw) {
      axios.defaults.headers.common["Authorization"] = hw;
      axios
        .get("//localhost:3001/series")
        .then(({ data }) => (this.posts = data));
    }
  },
};
</script>

<style scoped></style>
