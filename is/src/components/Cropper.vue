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
          width: 200,
          height: 200,
        }"
        image-restriction="stencil"
      />
      <img
        class="img"
        :src="img"
        alt="image"
        v-show="filename ? false : true"
      />
    </div>
    <div class="img-input-container">
      <div>
        <v-file-input
          v-model="filename"
          :rules="rules"
          small-chips
          class="img-input"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Your Picture"
          @change="onSelected"
          @click="isShowed = true"
          truncate-length="14"
        ></v-file-input>
      </div>
      <div class="btn-img">
        <button class="btn-img-save" @click="onSubmit">Change</button>
      </div>
    </div>

    <div class="profile">
      <div>
        <div class="username">Change Username</div>

        <input
          type="text"
          v-model="username"
          @input="updateUsername(username)"
          placeholder="username"
        />
      </div>
      <div>
        <div class="work-at">Change Work At</div>
        <input
          type="text"
          v-model="work_at"
          @input="updateWorkAt(work_at)"
          placeholder="username"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import axios from "axios";
import { mapGetters } from "vuex";
import _ from "lodash";

const chimney = localStorage.getItem("xhtrvbq");
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  Accept: "application/json",
  "Content-Type": "application/json",
});

apiClient.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + chimney;
  return config;
});
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
          "Avatar size should be less than 300KB!",
      ],
      image: null,
      preview: null,
      file: null,
      coordinates: null,
      isShowed: false,
      filename: null,
      afterResize: null,
      // user: {
      // username: null,
      work_at: null,

      username: null,
      timeout: null,
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
    ...mapGetters({
      img: "getImage",
      uname: "getUname",
      w_a: "getWorkAt",
    }),

    // uname() {
    //   this.user.username = this.$store.getters.getUname;
    //   return this.user.username;
    // },

    // work_at: {
    //   get: function () {
    //     return this.w_at;
    //   },
    //   set: function (val) {
    //     this.user.work_at = val;
    //   },
    // },
  },
  created() {
    this.username = this.uname;
    this.work_at = this.w_a;
  },

  methods: {
    // update() {
    //   console.log(this.user);
    //   if (this.user.username && this.user.work_at) {
    //     axios.post("/update/u", this.user).then((res) => {
    //       console.log(res);
    //     });
    //   }
    // },
    updateUsername: _.debounce(function (username) {
      if (username) {
        axios.post("/update/un", { username }).then(() => {
          this.$store.dispatch("setUsername", username);
        });
      }
    }, 2500),

    updateWorkAt: _.debounce(function (work_at) {
      if (work_at) {
        axios.post("/update/uw", { work_at }).then(() => {
          this.$store.dispatch("setWorkAt", work_at);
        });
      }
    }, 2500),

    change({ coordinates, canvas }) {
      this.coordinates = coordinates;
      this.beforescale = canvas;
      this.preview = canvas.toDataURL(this.file.type, 0.08);
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
.username {
  font-size: 0.8em;
  color: #5c5c5c;
}

.work-at {
  font-size: 0.8em;
  color: #5c5c5c;
}

.img-container {
  margin: auto;
  width: 200px;
  height: 200px;
  position: relative;

  /* margin: 0 auto; */
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
  margin: 0 auto;

  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.cropper {
  height: 200px;
  width: 200px;
  object-fit: cover;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  overflow: hidden;
  perspective: 1px;
  border-radius: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

img {
  width: 200px;
  height: 200px;
  border-radius: 50% !important;
}

.img-input {
  width: 180px;
  /* text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; */
}
.btn-img-save {
  background-color: #5c5c5c;
  color: white;
  padding: 2px 10px;
  font-size: 0.8em;
  border-radius: 20px;
}
.img-input-container {
  display: flex;
  max-width: 250px;
  justify-content: center;
}
.btn-img {
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile {
  padding-top: 30px;
}

.profile div {
  margin-bottom: 10px;
}
input {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid rgb(214, 214, 214);
}

input:focus {
  outline: none;
  border: none;
  border-bottom: 1px solid rgb(142, 186, 233);
}
</style>
