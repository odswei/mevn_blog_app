<template>
  <div class="series">
    <span class="series-index">{{ index + 1 }}</span
    ><span
      class="series-title"
      v-on:mouseleave="hover = false"
      v-on:mouseenter="hover = true"
      >{{ series.s_title }}
      <span v-if="hover">
        <button class="dseries" @click="deleteSeries">Delete Series</button>
      </span></span
    >

    <chapter
      v-for="chapter in series.chapters"
      :key="chapter._id"
      :chapter="chapter"
    />
    <slot></slot>
  </div>
</template>

<script>
import axios from "axios";
import Chapter from "./Chapter.vue";
export default {
  props: ["series", "index"],
  components: {
    Chapter,
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    deleteSeries() {
      axios.delete(`//localhost:3001/series/${this.series._id}`).then(() => {
        this.$store.dispatch("setSignal", true);
      });
    },
  },
};
</script>

<style scoped>
.dseries {
  background-color: #ff0000;
  color: white;
  font-size: 8.8px;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 10px;
  font-weight: bold;
}
</style>
