<template>
  <div
    class="chapter"
    v-on:mouseleave="hover = false"
    v-on:mouseenter="hover = true"
  >
    <span class="chapter-index">{{ chapter.chapter_no }}</span
    ><span class="chapter-title"> {{ chapter.c_title }}</span>
    <span class="published" v-if="chapter.published == true">Published</span>
    <span v-if="hover">
      <button class="live">Live</button>
      <router-link
        :to="{
          name: 'Editor',
          params: { id: chapter._id },
        }"
        ><button class="edit">Edit</button></router-link
      >
      <button class="private">Private</button>
      <button class="delete">Delete</button>
    </span>
  </div>
</template>

<script>
export default {
  props: ["chapter"],
  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style scoped>
.published {
  background-color: #000000;
  color: white;
  font-size: 8.8px;
  padding: 2px 8px;
  border-radius: 10px;

  font-weight: bold;
}

.delete,
.private,
.edit,
.live {
  padding: 0px 8px;
  border-radius: 10px;
  color: white;
  font-size: 10px;
  margin-left: 6px;
  font-weight: bold;
}
.delete {
  background-color: #ff0000;
}
.private {
  background-color: #5c5c5c;
}
.edit {
  background-color: #ff9900;
}
.live {
  background-color: #6efa00;
}
.chapter {
  font-size: 16px;
  margin: 5px 0px 5px 30px;
}

.chapter-index {
  margin-right: 10px;
}
.chapter-title {
  margin-right: 10px;
}
</style>
