<template>
  <v-container class="main-card" v-if="series">
    <h1>{{ series.s_title }}</h1>
    <div class="chapters-container">
      <div class="chapter-list">
        <div v-for="chapter in series.chapters" :key="chapter._id">
          <div class="step-container">
            <span class="dot">
              <span>{{ chapter.chapter_no }}</span>

              <span class="c-title">
                <button @click="viewContent(chapter._id)">
                  {{ chapter.c_title }}
                </button>
                <!-- <router-link
                v-if="loggedIn"
                style="text-decoration: none"
                :to="{ name: 'Editor', params: { id: chapter._id } }"
              >
                <v-btn plain class="write-button"> Edit </v-btn></router-link
              > --></span
              >
            </span>
          </div>
          <!-- <div class="vl"></div> -->
        </div>
      </div>
      <div class="body">
        <h2>{{ title }}</h2>
        <editor-content :editor="editor" />
      </div>
    </div>
  </v-container>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: { EditorContent },
  props: ["series", "cid"],
  data: () => ({
    contents: null,
    title: null,
    editor: null,
  }),
  computed: {
    // contentView() {
    //   if (this.contents) {
    //     return this.contents[0].contents;
    //   }
    //   return this.series.chapters[0].contents;
    // },
    // titleView() {
    //   if (this.series) {
    //     return this.series.chapters[0].title;
    //   }
    //   return null;
    // },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    viewContent(id) {
      const content = this.series.chapters.filter((c) => c._id === id);
      this.contents = content[0].contents;
      this.title = content[0].c_title;
    },
  },
  watch: {
    series() {
      const local = this.series.chapters.filter((c) => c._id === this.cid);

      this.editor.commands.setContent(local[0].contents);
      this.title = this.series.chapters[0].c_title;
    },
    contents() {
      this.editor.commands.setContent(this.contents);
    },
  },

  mounted() {
    this.editor = new Editor({
      editable: false,
      content: null,
      extensions: [StarterKit],
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
.main-card {
  color: rgb(38, 37, 37);
}
.body {
  padding-left: 25px;
}
h1 {
  margin-bottom: 20px;
}
.c-no {
  margin: 0 0 0 -13px;
}
.dot {
  padding-left: 10px;
  text-align: right;
  border-left: 5px solid rgba(255, 5, 5, 0.433);
  display: inline-block;
}
.vl {
  border-left: 1px solid rgb(82, 82, 82);
  top: 50%;
  height: 20px;
  margin: 6.5px 0px 6.5px 13px !important;
}
.c-vertical {
  position: absolute;
  top: 50%;
  height: 26px;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.c-title {
  margin: 0 0 0 15px;
}
.step-container {
  height: 26px;
  position: relative;
}
.chapters-container {
  display: grid;
  grid-template-columns: 0.6fr 1.6fr;
}
.chapter-list {
  /* background-color: aqua; */
  margin-top: 10px;
}
</style>
