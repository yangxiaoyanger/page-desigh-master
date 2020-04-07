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
import widgets from '../widgets';
// import axios from '../../src/plugins/axios/api.request';
import axios from 'axios'

export default {
  data () {
    return {
      value: null,
      widgets,
      uploadOption: {
        url: 'https://jsonplaceholder.typicode.com/photos'
      }
    };
  },

  created () {
    let data = window.localStorage.getItem('vpd-data');
    let that = this;
    // if (data) {
    //   this.value = JSON.parse(data);
    //   console.log(this.value, 54444)
    // }
    axios.get('http://localhost:3000/users/getWidgets')
      .then(function (response) {
        // handle success
        console.log(response.data, 1111);
        if (response.data) {
          that.value = response.data;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  },

  methods: {
    handleSave (data) {
      console.log('saving:', data);
      console.log(this, 888);
      window.localStorage.setItem('vpd-data', JSON.stringify(data));
    },
    handleUpload (files) {
      console.log('uploading:', files);
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
