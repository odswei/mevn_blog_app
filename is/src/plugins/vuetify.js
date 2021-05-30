import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import CustomIcon from "@/components/CustomIcon.vue";
import DeleteIcon from "@/components/DeleteIcon.vue";
import BoldIcon from "@/components/BoldIcon.vue";
import ItalicIcon from "@/components/ItalicIcon.vue";
import UnderlineIcon from "@/components/UnderlineIcon.vue";
import StrikeIcon from "@/components/StrikeIcon.vue";
import CodeIcon from "@/components/CodeIcon.vue";
import ClearIcon from "@/components/ClearIcon.vue";
import ParagraphIcon from "@/components/ParagraphIcon.vue";
import H1Icon from "@/components/H1Icon.vue";
import H2Icon from "@/components/H2Icon.vue";
import H3Icon from "@/components/H3Icon.vue";
import H4Icon from "@/components/H4Icon.vue";
import H5Icon from "@/components/H5Icon.vue";
import H6Icon from "@/components/H6Icon.vue";
import BulletIcon from "@/components/BulletIcon.vue";
import NumberIcon from "@/components/NumberIcon.vue";
import CodeBlockIcon from "@/components/CodeBlockIcon.vue";
import BlockQuoteIcon from "@/components/BlockQuoteIcon.vue";
import HRuleIcon from "@/components/HRuleIcon.vue";
import HardBreakIcon from "@/components/HardBreakIcon.vue";
import UndoIcon from "@/components/UndoIcon.vue";
import RedoIcon from "@/components/RedoIcon.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      custom: {
        // name of our custom icon
        component: CustomIcon, // our custom component
      },
      delete_btn: {
        // name of our custom icon
        component: DeleteIcon, // our custom component
      },
      bold_btn: {
        // name of our custom icon
        component: BoldIcon, // our custom component
      },
      italic_btn: {
        // name of our custom icon
        component: ItalicIcon, // our custom component
      },
      underline_btn: {
        // name of our custom icon
        component: UnderlineIcon, // our custom component
      },
      strike_btn: {
        // name of our custom icon
        component: StrikeIcon, // our custom component
      },
      code_btn: {
        // name of our custom icon
        component: CodeIcon, // our custom component
      },
      clear_btn: {
        // name of our custom icon
        component: ClearIcon, // our custom component
      },
      paragraph_btn: {
        // name of our custom icon
        component: ParagraphIcon, // our custom component
      },
      h1_btn: {
        // name of our custom icon
        component: H1Icon, // our custom component
      },
      h2_btn: {
        // name of our custom icon
        component: H2Icon, // our custom component
      },
      h3_btn: {
        // name of our custom icon
        component: H3Icon, // our custom component
      },
      h4_btn: {
        // name of our custom icon
        component: H4Icon, // our custom component
      },
      h5_btn: {
        // name of our custom icon
        component: H5Icon, // our custom component
      },
      h6_btn: {
        // name of our custom icon
        component: H6Icon, // our custom component
      },
      bullet_btn: {
        // name of our custom icon
        component: BulletIcon, // our custom component
      },
      number_btn: {
        // name of our custom icon
        component: NumberIcon, // our custom component
      },
      codeblock_btn: {
        // name of our custom icon
        component: CodeBlockIcon, // our custom component
      },
      blockquote_btn: {
        // name of our custom icon
        component: BlockQuoteIcon, // our custom component
      },
      hrule_btn: {
        // name of our custom icon
        component: HRuleIcon, // our custom component
      },
      hardbreak_btn: {
        // name of our custom icon
        component: HardBreakIcon, // our custom component
      },
      undo_btn: {
        // name of our custom icon
        component: UndoIcon, // our custom component
      },
      redo_btn: {
        // name of our custom icon
        component: RedoIcon, // our custom component
      },
    },
  },
});
