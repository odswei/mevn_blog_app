import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import CustomIcon from "@/components/CustomIcon.vue";
import DeleteIcon from "@/components/DeleteIcon.vue";

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
    },
  },
});
