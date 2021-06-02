<template>
  <div class="about">
    <div class="series">
      <span class="no-series">1</span>
      <span class="series-chapter">
        <div class="series-title">{{ content.series.s_title }}</div>
        <div class="chapter">
          <span class="no-chapter">1.</span>
          <span class="chapter-title"
            ><input
              v-model="content.chapter.c_title"
              placeholder="Chapter Title . ."
          /></span>
        </div>
      </span>
    </div>

    <editor v-model="content.chapter.contents" placeholder="hello" />

    <v-btn
      class="btn"
      @click="chapterPublishing"
      color="blue accent-4"
      depressed
      rounded
      >Publish</v-btn
    >
    <!-- <v-btn @click="chapterSave" class="btn" color="error" depressed rounded
      >Save</v-btn
    > -->
    <!-- 
    <div class="content">
      <h3>Content</h3>
      <pre><code>{{ hellow }}</code></pre>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import Editor from "@/components/Editor";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      content: null,
      c_title: null,
      chapter_no: 1,
      tags: ["mongodb", "mongoose"],
    };
  },
  computed: {
    hellow() {
      console.log(typeof this.content);
      return this.content;
    },
  },
  methods: {
    // chapterSave() {
    //   const hello = String(this.content);

    //   let chapter_content = {
    //     contents: hello,
    //     c_title: this.c_title,
    //     chapter_no: 1,
    //     tags: ["mongodb", "mongoose"],
    //     published: false,
    //   };
    //   const token = this.$store.state.user.hw;
    //   if (token) {
    //     axios.defaults.headers.common["Authorization"] = token;
    //     axios
    //       .post(
    //         "//localhost:3001/series/60b5c1307c56d8260cf6301a",
    //         chapter_content
    //       )
    //       .then(() => {
    //         console.log(chapter_content);
    //         this.$router.push({ name: "Home" });
    //       });
    //   }
    // },
    chapterPublishing() {
      const hello = this.hellow;

      let chapter_content = {
        contents: hello,
        c_title: this.c_title,
        chapter_no: 1,
        tags: ["mongodb", "mongoose"],
        published: true,
      };
      const token = this.$store.state.user.hw;
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
        axios
          .post(
            "//localhost:3001/series/60b5c1307c56d8260cf6301a",
            chapter_content
          )
          .then(() => {
            this.$router.push({ name: "Home" });
          });
      }
    },
  },
  created() {
    axios
      .get(`//localhost:3001/editor/${this.$route.params.id}`)
      .then(({ data }) => {
        this.content = data;
      });
  },
};
</script>

<style lang="scss" scoped>
.chapter {
  margin: 0 !important;
  padding: 0 !important;
  // background-color: aliceblue;
  flex-wrap: nowrap;
}
.series {
  // background-color: black;
  margin-bottom: 30px;
  padding: 0px 10px 0px 10px;
}
.no-series {
  font-size: 4em;
  // background-color: antiquewhite;
  float: left;
  padding-right: 10px;
}
input {
  min-width: 75%;
  // background-color: #ff2d2d;
  -ms-box-sizing: border-box; /* ie8 */
  -khtml-box-sizing: border-box; /* konqueror */
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  box-sizing: border-box; /* css3 rec */
}
input:focus {
  outline: none;
}

.series-chapter {
  // background-color: #ff2d2d;
  display: block;
}
.series-title {
  font-size: 2em;
  padding-left: 10px;
}
.no-chapter {
  font-size: 1.5em;
  // background-color: #616161;
  padding-right: 10px;
}
.chapter-title {
  // background-color: aqua;
  font-size: 1.5em;
}
.about {
  padding: 30px 20px 20px 20px;
}
::v-deep {
  /* Basic editor styles */
  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
  }

  .content {
    padding: 1rem 0 0;

    h3 {
      margin: 1rem 0 0.5rem;
    }

    pre {
      border-radius: 5px;
      color: #333;
    }

    code {
      display: block;
      white-space: pre-wrap;
      font-size: 0.8rem;
      padding: 0.75rem 1rem;
      background-color: #e9ecef;
      color: #495057;
    }
  }
}
.btn {
  float: right;
  margin: 30px 15px 0px 15px;
  color: white;
}
</style>
