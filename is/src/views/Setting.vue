<template>
  <div>
    <!-- <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label>

        <input
          type="file"
          id="file"
          class="custom-file-input"
          @change="onSelect"
        />
      </div>
      <div class="fields">
        <button>Submit</button>
      </div>
    </form> -->
    <cropper />
    <!-- {{ message }} -->
    <!-- <img :src="'data:image/jpeg;base64,' + image" /> -->
  </div>
</template>

<script>
// import axios from "axios";
import Cropper from "../components/Cropper.vue";
export default {
  components: { Cropper },
  data() {
    return {
      // file: "",
      // message: "",
      // image: null,
    };
  },
  methods: {
    // onSelect(event) {
    //   this.file = event.target.files[0];
    //   //console.log({ file: this.file });
    // },
    // async onSubmit() {
    //   const formData = new FormData();
    //   formData.append("file", this.file);
    //   console.log(formData);
    //   try {
    //     await axios.post("//localhost:3001/upload", formData).then((res) => {
    //       console.log(res);
    //     });
    //     this.message = "uploaded!";
    //   } catch (err) {
    //     console.log(err);
    //     this.message = "something went wrong!";
    //   }
    // },
  },
  created() {
    // axios.get("//localhost:3001/image").then(({ data }) => {
    //   //   console.log(data);
    //   this.image = data;
    // });
  },
};
</script>

<style scopped></style>
