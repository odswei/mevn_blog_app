import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import CustomIcon from "@/components/Icons/CustomIcon.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";
import BoldIcon from "@/components/Icons/BoldIcon.vue";
import ItalicIcon from "@/components/Icons/ItalicIcon.vue";
import UnderlineIcon from "@/components/Icons/UnderlineIcon.vue";
import StrikeIcon from "@/components/Icons/StrikeIcon.vue";
import CodeIcon from "@/components/Icons/CodeIcon.vue";
import ClearIcon from "@/components/Icons/ClearIcon.vue";
import ParagraphIcon from "@/components/Icons/ParagraphIcon.vue";
import H1Icon from "@/components/Icons/H1Icon.vue";
import H2Icon from "@/components/Icons/H2Icon.vue";
import H3Icon from "@/components/Icons/H3Icon.vue";
import H4Icon from "@/components/Icons/H4Icon.vue";
import H5Icon from "@/components/Icons/H5Icon.vue";
import H6Icon from "@/components/Icons/H6Icon.vue";
import BulletIcon from "@/components/Icons/BulletIcon.vue";
import NumberIcon from "@/components/Icons/NumberIcon.vue";
import CodeBlockIcon from "@/components/Icons/CodeBlockIcon.vue";
import BlockQuoteIcon from "@/components/Icons/BlockQuoteIcon.vue";
import HRuleIcon from "@/components/Icons/HRuleIcon.vue";
import HardBreakIcon from "@/components/Icons/HardBreakIcon.vue";
import UndoIcon from "@/components/Icons/UndoIcon.vue";
import RedoIcon from "@/components/Icons/RedoIcon.vue";
import FollowerIcon from "@/components/Icons/FollowerIcon.vue";
import ClapsIcon from "@/components/Icons/ClapsIcon.vue";
import StepsIcon from "@/components/Icons/StepsIcon.vue";

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
      follower_btn: {
        // name of our custom icon
        component: FollowerIcon, // our custom component
      },
      claps_btn: {
        // name of our custom icon
        component: ClapsIcon, // our custom component
      },
      steps_btn: {
        // name of our custom icon
        component: StepsIcon, // our custom component
      },
    },
  },
});
