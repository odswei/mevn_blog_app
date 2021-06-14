<template>
  <div class="about">
    <p>Hello</p>
    {{ chapter }}
    <editor-content class="editor-content-container" :editor="editor" />
  </div>
</template>

<script>
// const json = {
//   type: "doc",
//   content: [
//     {
//       type: "paragraph",
//       content: [
//         {
//           type: "text",
//           text: "Example ",
//         },
//         {
//           type: "text",
//           marks: [
//             {
//               type: "bold",
//             },
//           ],
//           text: "Text",
//         },
//       ],
//     },
//   ],
// };
import { Editor, EditorContent } from "@tiptap/vue-2";
// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import Bold from "@tiptap/extension-bold";
// import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
export default {
  props: ["chapter"],
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
    };
  },
  // computed: {
  //   output() {
  //     return generateHTML(this.hellow, [
  //       Document,
  //       Paragraph,
  //       Text,
  //       Bold,
  //       // other extensions …
  //     ]);
  //   },
  //   hellow() {
  //     return this.contents;
  //   },
  // },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.chapter,
      editable: false,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.about {
  padding: 30px 20px 20px 20px;
}
</style>
