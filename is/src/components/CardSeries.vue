<template>
  <div>
    <v-container>
      <div class="card-container">
        <div v-for="chapter in series" :key="chapter._id">
          <div class="card-container-gap">
            <!-- <div v-for="sid in chapter.series_id" :key="sid._id"> -->
            <!-- <v-card class="mx-auto" max-width="374" outlined>
            <div class="card-align">
              <v-card-text>
                <v-avatar color="primary avatar-margin" size="107">
                  <span class="white--text text-h5">DS</span></v-avatar
                >

                <div class="avatar-margin">
                  {{ series.uid.username }}
                </div>
                <div class="text--primary box">
                  <h2>
                    <router-link
                      class="series-title"
                      :to="{ name: 'Series', params: { id: series._id } }"
                      >{{ series.s_title }}
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
          </v-card> -->
            <div class="card">
              <div v-if="chapter.series_id.uid.u_img">
                <img class="u_img" v-bind:src="chapter.series_id.uid.u_img" />
              </div>

              <div v-else>
                <v-icon size="34" class="u_img">$vuetify.icons.img_icon</v-icon>
              </div>
              <div>
                <span class="save_icon">
                  <v-icon size="42" class="follower-claps-count"
                    >$vuetify.icons.save_btn</v-icon
                  >
                </span>
                <div class="row-gap">
                  <h3 v-if="typeof series !== null">
                    <router-link
                      class="series-title"
                      :to="{
                        name: 'Series',
                        params: {
                          id: chapter.series_id._id,
                          chapter_id: chapter._id,
                        },
                      }"
                      >{{ chapter.c_title }}
                    </router-link>
                  </h3>

                  <h4 v-if="typeof series !== null">
                    <router-link
                      class="series-title"
                      :to="{
                        name: 'Series',
                        params: {
                          id: chapter.series_id._id,
                          chapter_id: chapter._id,
                        },
                      }"
                      >{{ chapter.series_id.s_title }}
                    </router-link>
                  </h4>

                  <div class="username" v-if="typeof series !== null">
                    <router-link
                      class="series-title"
                      :to="{
                        name: 'User',
                        params: {
                          id: chapter.series_id.uid._id,
                        },
                      }"
                      ><strong> by {{ chapter.series_id.uid.username }}</strong>
                      @Infinite
                    </router-link>
                  </div>
                  <span
                    ><span v-for="(tag, index) in chapter.tags" :key="index"
                      ><span class="tag"
                        ><v-btn
                          color="yellow darken-3 white--text"
                          rounded
                          x-small
                          depressed
                          >{{ tag.tag }}</v-btn
                        ></span
                      ></span
                    ></span
                  >
                </div>
                <div>
                  <v-icon size="40" class="icon"
                    >$vuetify.icons.steps_btn</v-icon
                  ><span
                    ><small># {{ chapter.chapter_no }} step | </small></span
                  >
                  <span>
                    <small>{{
                      new Date(
                        parseInt(chapter._id.toString().substring(0, 8), 16) *
                          1000
                      )
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        .replace(/ /g, " ")
                    }}</small>
                  </span>
                </div>
                <span class="claps-followers">
                  <v-icon size="35"> $vuetify.icons.follower_btn</v-icon
                  ><span class="follower-claps-count">{{
                    chapter.series_id.followers.length
                  }}</span>
                </span>
                <span class="claps-followers">
                  <v-icon size="35" class="follower-claps-count"
                    >$vuetify.icons.claps_btn</v-icon
                  >
                  <span class="follower-claps-count">
                    {{ chapter.claps.length }}</span
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["series"],
};
</script>

<style scoped>
.u_img {
  width: 65px;
  height: 65px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.save_icon {
  float: right;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  grid-column-start: auto;
  grid-gap: 10px;
}

.card-container-gap {
  display: grid;
  grid-gap: 10px;
}

.card {
  border-radius: 6px;

  grid-auto-rows: minmax(250px, auto);

  display: grid;

  grid-template-columns: 0.8fr 2fr;
}

.username {
  font-size: 15px;
}
.tag {
  margin-right: 10px;
}

.card div:first-child {
  text-align: end;
  margin-right: 20px;
}

.row-gap {
  display: grid;
  row-gap: 1ch;
}

.series-title {
  text-decoration: none;
  color: #2f2a2a;
}
.card-align {
  text-align: center;
}
.avatar-margin {
  margin-bottom: 8px;
}
.claps-followers {
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
