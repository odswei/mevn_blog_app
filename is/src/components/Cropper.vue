<template>
  <div>
    <v-file-input
      :rules="rules"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick an avatar"
      prepend-icon="mdi-camera"
      label="Avatar"
      @change="onSelected"
    ></v-file-input>
    <cropper
      class="cropper"
      :src="image"
      @change="change"
      :stencil-props="{
        handlers: {},
        movable: false,
        scalable: false,
        aspectRatio: 1,
      }"
      :resize-image="{
        adjustStencil: false,
      }"
      :stencil-size="{
        width: 180,
        height: 180,
      }"
      image-restriction="stencil"
    />
    <img :src="preview" alt="image" />
    <!-- {{ img }} -->
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  components: {
    Cropper,
  },
  data() {
    return {
      rules: [
        (value) =>
          !value ||
          value.size < 300000 ||
          "Avatar size should be less than 0.3 MB!",
      ],
      image: null,
      preview: null,
    };
  },
  // computed: {
  //   img() {
  //     if (this.image) {
  //       const { imageTransforms } = this.$refs.cropper.getResult();
  //       console.log(imageTransforms);
  //       return imageTransforms;
  //     } else {
  //       return null;
  //     }
  //   },
  // },
  methods: {
    change({ coordinates, canvas }) {
      this.coordinates = coordinates;
      this.preview = canvas.toDataURL();
    },
    onSelected(e) {
      const files = e;
      if (files != undefined) {
        let reader = new FileReader();

        const that = this;
        reader.onload = function () {
          that.image = reader.result;
        };

        reader.readAsDataURL(files);
      } else {
        this.image = null;
      }
    },
  },
};

// const getBase64 = (file) =>
//   new Promise(function (resolve, reject) {
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject("Error: ", error);
//   });
</script>

<style scoped>
.cropper {
  height: 300px;
  width: 300px;
  background: #ddd;
  object-fit: cover;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
