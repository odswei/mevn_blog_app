<template>
  <div class="profile-container">
    <div class="img-container">
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
        v-show="isShowed"
        :resize-image="{
          adjustStencil: false,
        }"
        :stencil-size="{
          width: 180,
          height: 180,
        }"
        image-restriction="stencil"
      />
      <img class="img" :src="imgvuex" alt="image" v-show="!isShowed" />
    </div>

    <div class="img-input-container">
      <div>
        <v-file-input
          v-model="filename"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Your Picture"
          class="img-input"
          value="santania"
          @change="onSelected"
          @click="isShowed = true"
        ></v-file-input>
        <button class="button-img-save" @click="onSubmit">Save</button>
      </div>
    </div>
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
          value.size < 1000000 ||
          "Avatar size should be less than 0.1 MB!",
      ],
      image: null,
      preview: null,
      file: null,
      coordinates: null,
      isShowed: false,
      filename: null,
      afterResize: null,
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
  computed: {
    imgvuex() {
      return this.$store.getters.getImage;
    },
  },
  methods: {
    change({ coordinates, canvas }) {
      this.coordinates = coordinates;
      this.beforescale = canvas;
      this.preview = canvas.toDataURL(this.file.type, 0.1);
    },
    onSelected(e) {
      this.file = e;
      if (this.file != undefined && this.file.size < 1000000) {
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
      const apiClient = axios.create({
        baseURL: process.env.VUE_APP_BASE_URL,
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      const width = 100;
      const height = 100;
      const reader = new FileReader();
      reader.readAsDataURL(dataURItoBlob(this.preview, this.file.type));

      // console.log(this.file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        (img.onload = () => {
          const elem = document.createElement("canvas");
          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext("2d");
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, width, height);

          function getCanvas(ctx, type, name) {
            return new Promise(function (resolve) {
              ctx.canvas.toBlob((blob) => {
                resolve(
                  (that.file = new File(
                    [blob],
                    name,
                    {
                      type: type,
                      lastModified: Date.now(),
                    },
                    type,
                    1
                  ))
                );
                // console.log("dicari", that.file);
              });
            });
          }
          const type = this.file.type;
          const name = this.file.name;
          let that = this;
          // let that = this;
          const myblobv = getCanvas(ctx, type, name);
          // console.log("test this", this.image);
          myblobv.then(
            function (blob) {
              // console.log(blob);
              // console.log(that.image);
              const formData = new FormData();
              formData.append("file", blob);

              try {
                let dataResult = new Promise((resolve) => {
                  const config = {
                    headers: {
                      "content-type": "multipart/form-data",
                    },
                  };
                  apiClient.post("/image/upload", formData, config).then(() => {
                    // if (res.status === 200) {
                    toBase64(blob).then((data) => {
                      // console.log("datttaaaaa", data);
                      resolve(data);
                    });
                    // .catch((err) => {
                    //   reject(err);
                    // });
                    // }

                    // if(res.status == 200){
                    //   that.image=
                    // }
                    // that.isShowed = false;
                    // that.filename = null;

                    // const updatedImage = Buffer.from(blob).toString("base64");

                    // const contentType = type;
                    // console.log(data, image);
                    // const updatedImage = {
                    //   data: this.preview,
                    //   contentType: contentType,
                    // };
                    // console.log("updated image", updatedImage);
                    // this.$store.dispatch("setImgChange", updatedImage);
                  });
                });

                dataResult.then(function (value) {
                  // console.log(this.image);
                  that.$store.dispatch("setImgChange", value);
                  that.isShowed = false;
                  that.filename = null;
                  // console.log("helloooo", value);
                });
              } catch (err) {
                console.log(err);
              }
            },
            function (err) {
              console.log(err);
            }
          );
        }),
          (reader.onerror = (error) => console.log(error));
      };

      // console.log(this.beforescale);
      // const another = dataURItoBlob(this.afterscale, this.file.type);
      // console.log(another);

      // const thefirst = dataURItoBlob(this.preview, this.file.type);
      // console.log("file", thefirst);
      // try {
      //   axios.post("/upload", formData).then(() => {
      //     const contentType = this.file.type;
      //     // console.log(data, image);
      //     const updatedImage = {
      //       data: this.preview,
      //       contentType: contentType,
      //     };

      //     this.$store.dispatch("setImgChange", updatedImage);
      // this.isShowed = false;
      //     this.filename = null;
      //   });
      // } catch (err) {
      //   this.message = "something went wrong!";
      // }
    },
  },
};

function dataURItoBlob(dataURI, type) {
  var binary = atob(dataURI.split(",")[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  return new Blob([new Uint8Array(array)], { type: type });
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
</script>

<style scoped>
.img-container {
  width: 240px;
  height: 240px;
  position: relative;

  margin: 0 auto;
}
.img {
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.profile-container {
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.cropper {
  height: 220px;
  width: 220px;
  background: #ddd;
  object-fit: cover;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

img {
  width: 200px;
  height: 200px;
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
