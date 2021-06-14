<template>
  <!-- <v-container v-if="loggedIn">
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">

        </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-sheet min-height="70vh" rounded="lg"> </v-sheet>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268">
    
        </v-sheet>
      </v-col>
    </v-row>
  </v-container> -->
  <div>
    <v-toolbar flat v-if="loggedIn">
      <v-tabs v-model="menu" grow slider-color="yellow">
        <v-tab>Post</v-tab>
        <v-tab>Write</v-tab>
        <v-tab>My Post</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-if="loggedIn" v-model="menu">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <posts />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <write />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis.
              Nam eget dui. Proin viverra, ligula sit amet ultrices semper,
              ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In
              dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

            <p class="mb-0">
              Cras sagittis. Phasellus nec sem in justo pellentesque facilisis.
              Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec
              quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam
              at tortor in tellus interdum sagittis.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import Write from "./Write.vue";
import Posts from "./Posts.vue";
export default {
  name: "Dashboard",
  components: {
    Write,
    Posts,
  },
  data() {
    return {
      menu: null,
      items: ["Articles", "Write", "My Post"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style scoped>
.back {
  background-color: #2979ff;
}
</style>
