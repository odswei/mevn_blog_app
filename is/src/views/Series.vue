<template>
  <div class="container">
    <div v-if="chapters">
      <div v-for="chapter in chapters" :key="chapter._id">
        <router-link
          v-if="typeof chapter._id !== 'undefined'"
          :to="{ name: 'Chapter', params: { id: chapter._id } }"
          ><p>Chapter {{ chapter.c_title }}</p></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      chapters: null,
    };
  },

  async created() {
    await axios
      .get(`//localhost:3001/series/${this.$route.params.id}`)
      .then(({ data }) => {
        this.chapters = data;
      });
  },
};
</script>

<style scoped>
.container {
  margin-top: 100px;
}
</style>
