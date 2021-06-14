<template>
  <div class="main-area">
    <v-row class="input-area">
      <span v-for="(button, i) in buttonType" :key="i">
        <button
          :class="'icon-' + button"
          @click="addRow(button)"
          :style="{ 'margin-right': '20px' }"
        >
          {{ button.charAt(0).toUpperCase() }}
        </button></span
      >
    </v-row>
    <v-row class="input-area" v-if="error.length > 0">
      <v-alert dense border="left" type="warning">
        You need to fill the <strong>{{ error[0] }} </strong> before adding
        <strong>{{ error[1] }}</strong>
      </v-alert>
    </v-row>
    <div class="input-area">
      <div class="coba" v-for="(row, index) in rows" :key="row.id">
        <v-textarea
          class="custom"
          type="text"
          rows="1"
          no-resize
          :class="Object.keys(row)[1]"
          auto-grow
          row-height="30"
          :placeholder="'Type ' + Object.keys(row)[1] + ' here'"
          :value="rows[index][Object.keys(row)[1]]"
          v-model="rows[index][Object.keys(row)[1]]"
          @focus="hello()"
        />

        <v-fab-transition>
          <v-btn
            @click="deleteRow(index)"
            color="red"
            fab
            dark
            small
            class="button"
          >
            <v-icon size="50">$vuetify.icons.delete_btn</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-fab-transition>
          <v-btn
            @click="moveUp(index)"
            color="red"
            fab
            dark
            small
            class="button-up"
          >
            <v-icon small>mdi-thumb-up</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-fab-transition>
          <v-btn
            @click="moveDown(index)"
            color="red"
            fab
            dark
            small
            class="button-down"
          >
            <v-icon small>mdi-thumb-down</v-icon>
          </v-btn>
        </v-fab-transition>
      </div>
    </div>
    <v-btn
      class="ma-2 save-btn"
      outlined
      color="deep-orange accent-4"
      @click="sendPost"
    >
      Save
    </v-btn>
    -->
  </div>
</template>
<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      id: 100,
      buttonType: ["title", "subtitle", "paragraph"],
      error: [],
      rows: [
        {
          id: 100,
          title: "",
        },
      ],
    };
  },
  methods: {
    addRow(btnType) {
      if (
        this.rows.length != 0 &&
        this.rows.slice(-1).pop()[Object.keys(this.rows.slice(-1).pop())[1]] ===
          ""
      ) {
        return (this.error = [
          Object.keys(this.rows.slice(-1).pop())[1],
          btnType,
        ]);
      }
      this.id = this.id + 1;
      this.rows.push({ id: this.id, [btnType]: "" });
    },
    // updatecontent(id) {
    //   console.log(id);
    // },
    sendPost() {
      const content = this.rows;
      const token = this.$store.state.user.token;
      axios.defaults.headers.common["Authorization"] = token;
      axios.post("//localhost:3001/p/post", { post: content }).then(() => {
        this.$router.push({ name: "Home" });
      });
    },
    hello() {
      this.error = [];
    },
    deleteRow(index) {
      this.rows.splice(index, 1);
    },
    moveDown(index) {
      var element = this.rows[index];
      this.rows.splice(index, 1);
      this.rows.splice(index + 1, 0, element);
    },
    moveUp(index) {
      var element = this.rows[index];
      this.rows.splice(index, 1);
      this.rows.splice(index - 1, 0, element);
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 2.4em !important;
  font-weight: bold;
}
.subtitle {
  font-size: 1.5em;
  font-weight: bold;
}

.paragraph {
  font-size: 1.35em;
}

.icon-title {
  font-size: 2em;
  font-weight: bold;
  color: rgb(255, 255, 255);
  height: 40px;
  background-color: rgb(65, 58, 53);
  width: 40px;
  border-radius: 30px;
}

.icon-subtitle {
  font-size: 1.17em;
  font-weight: bold;
  color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  height: 40px;
  background-color: rgb(65, 58, 53);
  width: 40px;
  border-radius: 30px;
}

.icon-paragraph {
  font-size: 1.17em;
  color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  height: 40px;
  background-color: rgb(65, 58, 53);
  width: 40px;
  border-radius: 30px;
}

.main-area {
  margin: 50px;
}

.custom >>> .v-input__slot::before {
  border-style: none !important;
}

.custom >>> .v-input__slot::after {
  border-style: none !important;
}

.container {
  margin: 0 !important;
  padding: 0 !important;
}

.input-area {
  margin-top: 30px;
}

.custom >>> .v-input__slot {
  margin-bottom: 0 !important;
  padding-bottom: 0px !important;
}

.coba {
  position: relative !important;
}

.button {
  width: 25px;
  height: 25px;
  right: 0px;
  top: 50%;
  bottom: 50%;
  box-shadow: none;
  position: absolute;
  transform: translate(-50%, -50%);
  margin: 0;
}
.button-up {
  width: 25px;
  height: 25px;
  right: 20px;
  top: 50%;
  bottom: 50%;
  box-shadow: none;
  position: absolute;
  transform: translate(-50%, -50%);
  margin: 0;
}
.button-down {
  width: 25px;
  height: 25px;
  right: -20px;
  top: 50%;
  bottom: 50%;
  box-shadow: none;
  position: absolute;
  transform: translate(-50%, -50%);
  margin: 0;
}

.save-btn:hover {
  background-color: #dd2c00;
  color: white !important;
}
</style>
