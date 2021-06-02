<template>
  <div class="container">
    <div v-if="series">
      <h2>{{ series.series.s_title }}</h2>
      <p>followers: {{ series.series.followers.length }}</p>
      <p>claps: {{ series.series.claps.length }}</p>
      <div v-for="chapter in series.chapter" :key="chapter._id">
        <router-link
          v-if="typeof chapter._id !== 'undefined'"
          :to="{ name: 'Chapter', params: { id: chapter._id } }"
          ><p>Chapter {{ chapter.c_title }}</p></router-link
        >
        <router-link
          v-if="loggedIn"
          style="text-decoration: none"
          :to="{ name: 'Editor', params: { id: chapter._id } }"
        >
          <v-btn plain class="write-button"> Edit </v-btn></router-link
        >
      </div>
      <!-- {{ this.$store.state.series }} -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      series: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  async created() {
    await axios
      .get(`//localhost:3001/series/${this.$route.params.id}`)
      .then(({ data }) => {
        this.series = data;
      });
  },
};
</script>

<style scoped>
.container {
  margin-top: 100px;
}
</style>
