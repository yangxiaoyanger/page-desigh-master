<template>
  <div>
    <vue-page-designer
      :value="value"
      :widgets="widgets"
      :upload="handleUpload"
      :upload-option="uploadOption"
      @save="handleSave"
    />
  </div>
</template>

<script>
import widgets from "../widgets";

export default {
  data() {
    return {
      value: null,
      widgets,
      uploadOption: {
        url: "https://jsonplaceholder.typicode.com/photos"
      }
    };
  },

  created() {
    let data = window.localStorage.getItem("vpd-data");
    if (data) {
      this.value = JSON.parse(data);
    }
  },

  methods: {
    handleSave(data) {
      console.log("saving:", data);
      console.log(this, 888);
      window.localStorage.setItem("vpd-data", JSON.stringify(data));
    },
    handleUpload(files) {
      console.log("uploading:", files);
      return new Promise(resolve => {
        resolve({
          files: files,
          status: 200
        });
      });
    }
  }
};
</script>