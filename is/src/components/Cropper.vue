<template>
  <div>
    <div class="img-input-container">
      <div>
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          class="img-input"
          @change="onSelected"
        ></v-file-input>
      </div>
      <div><button class="button-img-save" @click="onSubmit">Save</button></div>
    </div>
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
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import axios from "axios";
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
      file: null,
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
      this.file = e;
      if (this.file != undefined && this.file.size < 300000) {
        let reader = new FileReader();

        const that = this;
        reader.onload = function () {
          that.image = reader.result;
        };

        reader.readAsDataURL(this.file);
      } else {
        this.image = null;
      }
    },
    onSubmit() {
      const formData = new FormData();
      // console.log(this.file);
      formData.append("file", this.file);
      // console.log(formData);
      try {
        axios.post("/upload", formData).then((res) => {
          console.log(res);
          this.message = "uploaded!";
          this.$store.state.imgChange = true;
          console.log(this.$store.state.imgChange);
        });
      } catch (err) {
        console.log(err);
        this.message = "something went wrong!";
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

.img-input {
  width: 300px;
}
.button-img-save {
  background-color: #5c5c5c;
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
}
.img-input-container {
  display: flex;
}
</style>
