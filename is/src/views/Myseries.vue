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
            @focus="titleError = null"
            class="text-input"
            autocomplete="false"
          ></v-text-field>
          <div class="series-title-error">
            <small>{{ titleError }}</small>
          </div>
        </span>
        <span>
          <button @click.prevent="addSeries" class="series-button">
            Add Series
          </button>
        </span>
      </div>

      <div>
        <series
          v-for="(series, index) in series"
          :key="index"
          :series="series"
          :index="index"
        >
          <div class="add-chapter">
            <router-link
              :to="{
                name: 'Editor',
                query: {
                  s: series.s_title,
                  sid: series._id,
                },
              }"
            >
              <button class="chapter-button">Add Chapter</button></router-link
            >
          </div>
        </series>
      </div>
    </v-container>
  </div>
</template>

<script>
import Series from "../components/Series.vue";

export default {
  components: {
    Series,
  },

  data() {
    return {
      series_title: null,
      hover: false,
      titleError: null,
    };
  },
  computed: {
    change() {
      return this.$store.getters.getSignal;
    },
    series() {
      return this.$store.getters.getSeries;
    },
  },
  watch: {
    change() {
      this.$store.dispatch("getSeries").then(() => {
        this.$store.dispatch("setSignal", false);
      });
    },
  },

  created() {
    // axios.defaults.headers.common["Authorization"] = this.$store.state.user;
    // axios.get(`//localhost:3001/myseries`).then(({ data }) => {
    //   this.series = data;
    // });
    this.$store.dispatch("getSeries");
  },
  methods: {
    addSeries() {
      if (this.series_title) {
        this.$store
          .dispatch("setSeriesTitle", { s_title: this.series_title })
          .then(() => {
            this.series_title = null;
          });
      } else {
        this.titleError = "Its still empty";
      }
    },
  },
};
</script>

<style scoped>
.series-title-error {
  color: red;
}
.series-button {
  color: white !important;
  margin-top: 5px;
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
