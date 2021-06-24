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

    <span class="input-container">
      <input type="text" v-model="search_query" placeholder="Search . ." />
    </span>

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

  // computed: {
  //   resultQuery() {
  //     console.log(this.series);
  //     return this.series;
  //   },
  // },

  computed: {
    resultQuery() {
      // console.log(this.componentLoaded, this.series);
      if (this.componentLoaded && this.search_query) {
        let stringSeriesResult = filterByValue(this.series, this.search_query);
        console.log(stringSeriesResult);
        // let tagResult = this.series.filter((a) =>
        //   a.chapters.some((u) =>
        //     u.tags.some((t) => t.tag.includes(this.search_query))
        //   )
        // );
        // let c_titleResult = this.series.filter((d) =>
        //   d.chapters.some((c) =>
        //     c.c_title
        //       .toString()
        //       .toLowerCase()
        //       .includes(this.search_query.toLowerCase())
        //   )
        // );
        // let allPossible = (obj1, obj2) => {
        //   let result = Object.values(
        //     obj1.concat(obj2).reduce((r, o) => {
        //       r[o._id] = o;
        //       return r;
        //     }, {})
        //   );
        //   return result;
        // };
        // let twoPossible = allPossible(stringSeriesResult, tagResult);
        // console.log(c_titleResult);
        // return allPossible(twoPossible, c_titleResult);
        return stringSeriesResult;
      } else {
        return this.series;
      }
    },
  },

  created() {
    axios.get("/api/series").then(({ data }) => {
      this.componentLoaded = true;
      this.series = data;
    });
  },
};

function filterByValue(array, string) {
  return array.filter(
    (data) =>
      JSON.stringify(data).toLowerCase().indexOf(string.toLowerCase()) !== -1
  );
}
</script>

<style scoped>
.input-container {
  padding: 0px 0px 0px 10px;
}
input {
  border-radius: 30px;
  background-color: white;
  padding: 10px 30px 10px 30px;
  width: 400px;
}
input:focus {
  outline: none;
}
</style>
