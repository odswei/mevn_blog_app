<template>
  <div>
    <v-container>
      <v-form class="add-series">
        <v-row>
          <v-col cols="12" sm="10" md="8">
            <v-text-field
              v-model="series_title"
              label="Your Series"
              hint="For example, Fullstack with Laravel and VueJS!"
              persistent-hint
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          @click.prevent="addSeries"
          class="hello"
          depressed
          color="blue accent-4  "
          rounded
          small
          ><span>Add Series</span>
        </v-btn>
      </v-form>

      <card-series :series="series"
    /></v-container>
  </div>
</template>

<script>
import CardSeries from "../components/CardSeries.vue";
import axios from "axios";
export default {
  components: { CardSeries },
  data() {
    return {
      series_title: null,
      change: false,
      series: null,
    };
  },
  watch: {
    change() {
      axios.get(`//localhost:3001/myseries`).then(({ data }) => {
        this.series = data;
      });
      this.change = false;
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
      axios
        .post("//localhost:3001/series", { s_title: this.series_title })
        .then(({ data }) => {
          (this.change = true), this.$store.dispatch("setSeries", { data });
        });
    },
  },
};
</script>

<style scoped>
.hello {
  color: white !important;
  margin: 15px 0px 15px 0px;
}
.add-series {
  margin: 20px 10px 15px 35px;
}
</style>
