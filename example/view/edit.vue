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
import generate from 'nanoid/generate'

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
      let uuid = generate('1234567890abcdef', 16);
      let requestData = {
        pageid: uuid,
        pagename: data.page.title,
        url: uuid,
        widgets: JSON.stringify(data.widgets)
      }
      axios.post('http://localhost:3000/users/saveWidgets', requestData)
        .then(function (response) {
        // handle success
        console.log(response, 1111)
          if (response.data) {
            console.log(response, 8754333333333333333333)
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
