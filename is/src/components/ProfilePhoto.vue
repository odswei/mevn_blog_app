<template>
  <div id="app">
    <!-- <v-file-input
      @change="onFileChange"
      
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      label="Avatar"
    ></v-file-input> -->
    <input
      type="file"
      :rules="rules"
      accept="image/png, image/jpeg, image/bmp"
      @change="onFileChange"
      height="50px"
      width="50px"
    />
    <div id="preview">
      <img v-if="url" :src="url" />
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    url: null,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
  }),
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      console.log(file);
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>

<style scoped>
body {
  background-color: #e2e2e2;
}

#app {
  padding: 20px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
