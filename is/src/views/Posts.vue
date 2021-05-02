<template>
  <div>
    <div v-for="{ post } in posts" :key="post._id">
      <v-card>
        <div v-for="(content, index) in post" :key="index">
          <p :class="Object.keys(content)[1]">
            {{ content[Object.keys(content)[1]] }}
          </p>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
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

<style scoped>
.title {
  font-size: 2em;
  font-weight: bold;
}
.subtitle {
  font-size: 1.17em;
  font-weight: bold;
}

#cardid {
  margin-bottom: 40px !important;
  background-color: rgb(7, 37, 37);
}
</style>
