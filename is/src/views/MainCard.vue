<template>
  <div class="main-card" v-if="series">
    <toggle-index
      v-show="isToggled"
      @isToggled="toggleIndex"
      :chapters="series.chapters"
      @send_id="viewContent"
    ></toggle-index>
    <div class="series-title">{{ series.s_title }}</div>
    <div class="yellow-card" @click="toggleIndex">
      <v-icon size="35">$vuetify.icons.index_icon</v-icon>See All Chapters
    </div>
    <div class="chapters-container">
      <div class="chapter-list">
        <div v-for="chapter in series.chapters" :key="chapter._id">
          <div
            class="chapter"
            @click="viewContent(chapter._id)"
            :class="[chapter._id == id ? 'isActive' : '']"
          >
            <span class="chapter-no">{{ chapter.chapter_no }}</span>

            <span class="chapter-title">
              <span>
                {{ chapter.c_title }}
              </span>
              <!-- <router-link
                v-if="loggedIn"
                style="text-decoration: none"
                :to="{ name: 'Editor', params: { id: chapter._id } }"
              >
                <v-btn plain class="write-button"> Edit </v-btn></router-link
              > --></span
            >
          </div>

          <!-- <div class="vl"></div> -->
        </div>
      </div>
      <div class="body">
        <h2>{{ title }}</h2>
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import toggleIndex from "./ToggleIndex.vue";

export default {
  components: { EditorContent, toggleIndex },
  props: ["series", "cid"],
  data: () => ({
    contents: null,
    title: null,
    editor: null,
    isToggled: false,
    id: null,
  }),
  computed: {
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
      this.id = content[0]._id;
      if (this.isToggled) {
        this.isToggled = false;
      }
    },
    toggleIndex() {
      this.isToggled = !this.isToggled;
    },
  },
  watch: {
    series() {
      const local = this.series.chapters.filter((c) => c._id === this.cid);
      this.editor.commands.setContent(local[0].contents);
      this.title = local[0].c_title;
    },
    contents() {
      this.editor.commands.setContent(this.contents);
    },
  },

  mounted() {
    this.editor = new Editor({
      editable: false,
      content: this.contents,
      extensions: [StarterKit],
    });
    if (this.series) {
      const local = this.series.chapters.filter((c) => c._id === this.cid);
      this.editor.commands.setContent(local[0].contents);
      this.title = local[0].c_title;
    }
    let p = this.cid.slice();
    this.id = p;
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
.isActive {
  background-color: #ffa000;
  color: white;
}
.chapter {
  margin-bottom: 10px;
  margin-right: 30px;
  border-radius: 5px;
  padding: 5px 8px;
}
.chapter-no {
  margin-right: 10px;
}
.main-card {
  color: rgb(41, 41, 41);
  padding: 0px 15px;
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
  display: flex;
}
.chapter-list {
  /* background-color: aqua; */
  margin-top: 10px;
  min-width: 280px;
}

.yellow-card {
  font-size: 1.3em;
  background-color: #ff6f00;
  width: 70%;
  color: white;
  position: relative;
  left: -25px;
  color: #fff;
  visibility: hidden;
}

.series-title {
  font-size: 1.7em;
  font-weight: 705;

  color: rgb(46, 44, 44);
}

@media only screen and (max-width: 850px) {
  .chapter-list {
    display: none;
  }
  .yellow-card {
    visibility: visible;
    margin-bottom: 5px;
    padding: 2px 25px;
  }
}
</style>
