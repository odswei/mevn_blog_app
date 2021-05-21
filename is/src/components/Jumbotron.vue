<template>
     <div class="jumbotron" v-if="!loggedIn">
      <div class="box">
        <div class="j-title">Show and Share with the world!</div>
      </div>
    </div>
</template>

<script>
export default {
    computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
}
</script>

<style scoped>
.jumbotron {
  height: 600px;
  background-color: #dd2c00;
}

.box {
  position: relative;

  max-width: 1500px;
  height: 600px;
  margin: auto;
}

.j-title {
  color: white;
  font-size: 7em;

  position: absolute;
  right: 40px;
  bottom: 0;
  width: 900px;
  text-align: end;
}
</style>