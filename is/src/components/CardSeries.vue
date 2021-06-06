<template>
  <div>
    <v-container>
      <div class="flex-container">
        <div v-for="post in series" :key="post._id">
          <div class="card-container">
            <div v-for="chapter in post.chapters" :key="chapter._id">
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
                <div>
                  <img src="./taylor.jpg" alt="dorkas" />
                  <h4>{{ post.uid.username }}</h4>
                  <h4>@//nsery</h4>
                </div>
                <div>
                  <h3 v-if="typeof series !== null">
                    <router-link
                      class="series-title"
                      :to="{ name: 'Series', params: { id: post._id } }"
                      >{{ post.s_title }}
                    </router-link>
                  </h3>
                  <h4>{{ chapter.c_title }}</h4>
                  <div><small>May, 2021</small></div>
                  <span v-for="(tag, index) in chapter.tags" :key="index"
                    ><span class="tag"
                      ><v-btn
                        color="yellow darken-3 white--text"
                        rounded
                        x-small
                        depressed
                        >{{ tag.tag }}</v-btn
                      ></span
                    ></span
                  >
                  <div>
                    <v-icon size="40" class="icon"
                      >$vuetify.icons.steps_btn</v-icon
                    ><span> #7th steps</span>
                  </div>
                  <span class="follower-claps">
                    <v-icon size="30"> $vuetify.icons.follower_btn</v-icon
                    ><span class="follower-claps-count">{{
                      post.followers.length
                    }}</span>
                  </span>
                  <span class="follower-claps">
                    <v-icon size="30" class="follower-claps-count"
                      >$vuetify.icons.claps_btn</v-icon
                    >
                    <span class="follower-claps-count">
                      {{ post.claps.length }}</span
                    >
                  </span>
                  <span>read later</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
.flex-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-column-start: auto;
  grid-gap: 10px;
}
.card-container {
  display: grid;
  grid-gap: 10px;
}

.card {
  /* width: 320px; */
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  /* margin: 10px; */
  grid-auto-rows: 260px;
  /* border: 1px solid black; */
  display: grid;

  grid-template-columns: 0.8fr 2fr;
}
.tag {
  margin-right: 10px;
  /* background-color: brown; */
}

.card div:first-child {
  /* width: 320px; */
  /* background-color: rgb(255, 85, 85); */
  /* margin: 10px; */
  display: grid;
  justify-items: center;
  padding: 18px 9px 18px 18px;
  grid-template-rows: 1.5fr 0.4fr 0.4fr;
}

.card div:nth-child(2) {
  /* width: 320px; */
  /* background-color: red; */
  padding: 18px 18px 18px 9px;
  align-self: center;
}

.card img {
  object-fit: cover;
  width: 80%;
  border-radius: 50%;
  align-self: center;
}

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
