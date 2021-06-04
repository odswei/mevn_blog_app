<template>
  <v-container>
    <!-- <v-row>
      <v-col v-for="{ post } in series" :key="post._id" cols="12" md="6" sm="12">
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
    <!-- <main-card class="bar" />
  
    <profile-photo /> -->
    <!-- <div v-for="(post, index) of series" :key="index">{{ post.s_title }}</div> -->
    <!-- {{ series }} -->
    <input type="text" v-model="search_query" placeholder="search . ." />
    <br />
    <card-series :series="resultQuery" />
  </v-container>
</template>

<script>
// import MainCard from "../components/MainCard.vue";
// @ is an alias to /src
// import ProfilePhoto from "../components/ProfilePhoto.vue";
import axios from "axios";

import CardSeries from "../components/CardSeries.vue";
export default {
  components: {
    // ProfilePhoto,
    // MainCard,
    CardSeries,
  },
  data() {
    return {
      series: null,
      componentLoaded: false,
      search_query: null,
    };
  },

  computed: {
    resultQuery() {
      if (this.componentLoaded && this.search_query) {
        const search = this.search_query.toLowerCase();
        // console.log(typeof search) const search = this.lookfor.toLowerCase()
        return this.series.filter(
          (post) =>
            typeof post.s_title === "string" &&
            post.s_title.toLowerCase().includes(search)
        );
      } else {
        return this.series;
      }
    },
  },

  created() {
    axios
      .get("//localhost:3001/series")
      .then(
        ({ data }) => ((this.componentLoaded = true), (this.series = data))
      );
  },
};
</script>

<style scoped></style>
