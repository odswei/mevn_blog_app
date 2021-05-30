<template>
  <div class="editor-container">
    <!-- <div class="checkbox">
      <input type="checkbox" id="editable" v-model="editable" />
      <label for="editable">editable</label>
    </div> -->

    <div class="toolbar-container" v-if="editor">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.bold_btn</v-icon>
      </button>

      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.italic_btn</v-icon>
      </button>

      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.strike_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.code_btn</v-icon>
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        <v-icon size="35" class="icon">$vuetify.icons.clear_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.paragraph_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.h1_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.h2_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.h3_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.h4_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.h5_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.h6_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.bullet_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.number_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.codeblock_btn</v-icon>
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        <v-icon size="35" class="icon">$vuetify.icons.blockquote_btn</v-icon>
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        <v-icon size="35" class="icon">$vuetify.icons.hrule_btn</v-icon>
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">
        <v-icon size="35" class="icon">$vuetify.icons.hardbreak_btn</v-icon>
      </button>
      <button @click="editor.chain().focus().undo().run()">
        <v-icon size="35" class="icon">$vuetify.icons.undo_btn</v-icon>
      </button>
      <button @click="editor.chain().focus().redo().run()">
        <v-icon size="35" class="icon">$vuetify.icons.redo_btn</v-icon>
      </button>
    </div>
    <editor-content class="editor-content-container" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      editor: null,
      // editable: false,
      preview: null,
    };
  },

  watch: {
    value(value) {
      // HTML
      // const isSame = this.editor.getHTML() === value;

      // JSON
      const isSame = this.editor.getJSON().toString() === value.toString();

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(this.value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      // editable: this.editable,
      extensions: [StarterKit, Placeholder],
      content: this.value,
      onUpdate: () => {
        // HTML
        //this.$emit("input", this.editor.getHTML());

        // JSON
        this.$emit("input", this.editor.getJSON());
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.editor-content-container {
  padding: 10px;
  background-color: #fff;
  //background-color: antiquewhite;
}
.editor-content-container :focus {
  outline: none;
}
.toolbar-container {
  margin-bottom: 20px;
  // background-color: #616161;
}
.icon {
  margin-right: 10px;
}
.editor-container {
  // background-color: aqua;
}
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #1d1c1c;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
  font-size: 1.3em;
  margin-top: -3px;
}
</style>
