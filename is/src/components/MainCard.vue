<template>
  <v-container class="maincard">
    <v-row no-gutters>
      <v-col cols="6">Hello</v-col>
      <v-col cols="6">
        <div v-for="(chapter, index) in chapters" :key="index">
          <div class="step-container">
            <span class="dot">
              <span class="c-no c-vertical">{{ chapter.chapter }}</span>
            </span>
            <span class="c-title c-vertical">{{ chapter.c_title }}</span>
          </div>
          <div class="vl"></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      chapters: [
        {
          _id: {
            $oid: "60a7a0682b0f2d262c9dd344",
          },
          content: [
            {
              h1: "hello h1",
              h2: "hello h2",
            },
          ],
          tags: ["hello", "world"],
          series_id: {
            $oid: "60a79be94f518f2358b46d08",
          },
          chapter: 1,
          c_title: "Chapter Title 1",
          update: {
            $date: "2021-05-21T11:58:32.605Z",
          },
          __v: 0,
        },
        {
          _id: {
            $oid: "60a7a0b2744c291b9c9b8992",
          },
          content: [
            {
              h1: "hello h1",
              h2: "hello h2",
            },
          ],
          tags: ["hello", "world"],
          series_id: {
            $oid: "60a79be94f518f2358b46d08",
          },
          chapter: 2,
          c_title: "Chapter Title 2",
          update: {
            $date: "2021-05-21T11:59:46.363Z",
          },
          __v: 0,
        },
        {
          _id: {
            $oid: "60a7a0bf744c291b9c9b8993",
          },
          content: [
            {
              h1: "hello h1",
              h2: "hello h2",
            },
          ],
          tags: ["hello", "world"],
          series_id: {
            $oid: "60a79be94f518f2358b46d08",
          },
          chapter: 3,
          c_title: "Chapter Title 3",
          update: {
            $date: "2021-05-21T11:59:59.877Z",
          },
          __v: 0,
        },
      ],
    };
  },
};
</script>

<style scoped>
/* .maincard {
  background-color: aqua;
} */
.c-no {
  width: 25px;
  margin: 0 0 0 -12.5px;
}
.dot {
  height: 25px;
  width: 25px;
  text-align: center;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
.vl {
  border-left: 1px solid rgb(82, 82, 82);
  top: 50%;
  height: 25px;
  margin: 5px 0px 5px 12.5px !important;
}
.c-vertical {
  position: absolute;
  top: 50%;
  height: 25px;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.c-title {
  margin: 0 0 0 15px;
}
.step-container {
  height: 25px;
  position: relative;
}
</style>
