<template>
    <pre-view
    :value="value"
      :widgets="widgets"
    />
</template>

<script>
import preView from "../../src/components/preview/index.vue";
import widgets from "../widgets";

export default {
    components: {
    preView
  },
  data() {
    return {
      value: null,
      widgets
    };
  },

  created() {
    let data = window.localStorage.getItem("vpd-data");
    if (data) {
      this.value = JSON.parse(data);
    }
  },

  methods: {
  }
};
</script>