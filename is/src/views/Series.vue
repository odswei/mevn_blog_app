<template>
  <v-container class="container">
    <!-- <div v-if="series">
      <h1>{{ series.s_title }}</h1>
      <p>followers: {{ series.followers.length }}</p>
      <p>claps: {{ series.claps.length }}</p>
      <div v-for="chapter in series.chapters" :key="chapter._id"> -->
    <!-- <router-link
          v-if="typeof chapter._id !== 'undefined'"
          :to="{
            name: 'Chapter',
            params: { series_id: series._id, chapter_id: chapter._id },
          }"
          ><h2>{{ chapter.c_title }}</h2></router-link
        > -->
    <!-- <h2>{{ chapter.c_title }}</h2>
        <p>{{ chapter.contents }}</p>
        <router-link
          v-if="loggedIn"
          style="text-decoration: none"
          :to="{ name: 'Editor', params: { id: chapter._id } }"
        >
          <v-btn plain class="write-button"> Edit </v-btn></router-link
        >
      </div> -->
    <!-- {{ this.$store.state.series }} -->
    <main-card :series="series" />
    <!-- </div> -->
  </v-container>
</template>

<script>
import axios from "axios";

import MainCard from "./MainCard.vue";
export default {
  components: { MainCard },

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
      .get(`//localhost:3001/series/${this.$route.params.id}/chapters`)
      .then(({ data }) => {
        this.series = data;
      });
  },
};
</script>

<style scoped>
.container {
  background-color: white;
}
</style>
