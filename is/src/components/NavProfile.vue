<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="220"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar v-bind="attrs" v-on="on" size="50">
          <img v-bind:src="image" />
        </v-avatar>
      </template>

      <v-card class="box">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar class="avatar"> <img v-bind:src="image" /></v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ info }}</v-list-item-title>
              <v-list-item-subtitle
                ><span class="username"> {{ username }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <!-- 
            <v-list-item-action>
              <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action> -->
          </v-list-item>
        </v-list>

        <!-- <v-divider></v-divider> -->

        <v-list>
          <v-list-item>
            <!-- <v-list-item-action>
              <v-switch v-model="message" color="purple"></v-switch>
            </v-list-item-action> -->
            <v-list-item-title
              ><router-link class="setting" to="/setting"
                >Setting</router-link
              ></v-list-item-title
            >
          </v-list-item>
          <!-- 
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="hints" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item> -->
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <button class="l-btn" type="button" @click="logout">Logout</button>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "",
      fav: true,
      menu: false,
      message: false,
      hints: true,
      imageBytes: null,
    };
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
    imgC() {
      return this.$store.state.imgChange;
    },
    image() {
      return this.$store.getters.getImage;
    },
    username() {
      return this.$store.getters.getUname;
    },
  },
  watch: {
    imgC() {
      this.$store
        .dispatch("getImage")
        .then(() => this.$store.dispatch("getImage"));
    },
  },
  created() {
    this.$store.dispatch("getImage");
  },
};
</script>

<style scoped>
.box {
  padding: 10px;
}
.username {
  color: rgb(34, 32, 32);
  font-size: 18px;
}
img {
  object-fit: fill;
}
.setting {
  text-decoration: none;
  color: rgb(34, 32, 32);
}
.l-btn {
  margin-right: 15px;
  margin-bottom: 5px;
}
</style>
