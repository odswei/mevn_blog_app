<template>
  <div>
    <v-container>
      <div @keyup.enter="addSeries" class="add-series">
        <span>
          <v-text-field
            v-model="series_title"
            label="Your Series"
            hint="For example, Fullstack with Laravel and VueJS!"
            persistent-hint
            class="text-input"
          ></v-text-field>
        </span>
        <span>
          <button @click.prevent="addSeries" class="series-button">
            Add Series
          </button>
        </span>
      </div>

      <div v-for="(s_title, index) in series" :key="index">
        <div class="series">
          <span class="series-index">{{ index + 1 }}</span
          ><span class="series-title">{{ s_title.s_title }}</span>
        </div>

        <chapter
          v-for="chapter in s_title.chapters"
          :key="chapter._id"
          :chapter="chapter"
        />

        <div class="add-chapter">
          <router-link
            :to="{
              name: 'Editor',
              query: {
                s: s_title.s_title,
              },
            }"
          >
            <button class="chapter-button">Add Chapter</button></router-link
          >
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Chapter from "../components/Chapter.vue";
export default {
  components: {
    Chapter,
  },
  data() {
    return {
      series_title: null,
      change: false,
      series: null,
      hover: false,
    };
  },
  watch: {
    change() {
      axios.get(`//localhost:3001/myseries`).then(({ data }) => {
        this.series = data;
        this.change = false;
      });
    },
  },

  created() {
    axios.defaults.headers.common["Authorization"] = this.$store.state.user.hw;
    axios.get(`//localhost:3001/myseries`).then(({ data }) => {
      this.series = data;
    });
  },
  methods: {
    addSeries() {
      if (this.s_title != null) {
        axios
          .post("//localhost:3001/series", { s_title: this.series_title })
          .then(() => {
            this.change = true;
            this.series_title = null;
          });
      }
    },
  },
};
</script>

<style scoped>
.series-button {
  color: white !important;
  margin-top: 20px;
  background-color: #ff7a00;
  font-size: 15px;
  font-weight: bold;
  padding: 2px 15px;
  border-radius: 20px;
}
.chapter-button {
  color: rgb(255, 255, 255) !important;
  background-color: #006eff;
  font-size: 10px;
  font-weight: 900;
  padding: 2px 8px;
  border-radius: 30px;
}

.text-input {
  max-width: 800px;
}

.add-series {
  margin: 20px 0px 15px 0px;
}

.series {
  font-size: 21px;
  margin: 10px 0px 5px 0px;
}

.series-index {
  margin-right: 10px;
}

.series-title {
}

.add-chapter {
  font-size: 16px;
  margin: 10px 0px 10px 30px;
}
</style>
