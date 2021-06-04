<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="series in series"
          :key="series._id"
          cols="12"
          md="4"
          sm="6"
        >
          <v-card class="mx-auto" max-width="374" outlined>
            <div class="card-align">
              <v-card-text>
                <v-avatar color="primary avatar-margin" size="107">
                  <span class="white--text text-h5">DS</span></v-avatar
                >

                <div class="avatar-margin">
                  {{
                    series.username.charAt(0).toUpperCase() +
                    series.username.slice(1)
                  }}
                </div>
                <div class="text--primary box">
                  <h2>
                    <router-link
                      class="series-title"
                      :to="{ name: 'Series', params: { id: series._id } }"
                      >{{ series.s_title }} and fullstack with another tools!!
                    </router-link>
                  </h2>
                </div>
                <div class="text--primary"><small> May 22, 2021</small></div>
                <div>
                  <v-icon size="50">$vuetify.icons.steps_btn</v-icon>
                </div>
                <v-divider class="divide"></v-divider>
                <span class="follower-claps">
                  <v-icon size="30"> $vuetify.icons.follower_btn</v-icon
                  ><span class="follower-claps-count">{{
                    series.followers.length
                  }}</span>
                </span>
                <span class="follower-claps">
                  <v-icon size="30" class="follower-claps-count"
                    >$vuetify.icons.claps_btn</v-icon
                  >
                  <span class="follower-claps-count">
                    {{ series.claps.length }}</span
                  >
                </span>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["series"],
};
</script>

<style scoped>
.series-title {
  text-decoration: none;
}
.card-align {
  text-align: center;
}
.avatar-margin {
  margin-bottom: 8px;
}
.follower-claps {
  margin: 10px;
}
.follower-claps-count {
  margin-left: 5px;
}
.divide {
  margin: 0px 20px 15px 20px;
  text-align: center;
}
.box {
  margin: 15px 0px 15px 0px;
  line-height: 2.2em;
}
</style>
