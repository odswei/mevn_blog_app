<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar v-bind="attrs" v-on="on" color="red" size="50">
          <span class="white--text headline"
            >{{ JSON.stringify(info).charAt(1).toUpperCase() }}
          </span></v-avatar
        >
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar color="red" size="36">
                <span class="white--text headline"
                  >{{ JSON.stringify(info).charAt(1).toUpperCase() }}
                </span></v-avatar
              >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ info }}</v-list-item-title>
              <v-list-item-subtitle
                >Founder of Infinite Series</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="message" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="hints" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <button type="button" @click="logout">Logout</button>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: "",
      fav: true,
      menu: false,
      message: false,
      hints: true,
    };
  },
  mounted() {
    const token = this.$store.state.user.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("//localhost:3001/p/test")
        .then(({ data }) => (this.info = data.username));
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },

  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>
