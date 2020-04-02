<template>
  <Table
    :class="[playState ? 'anm-' + val.animationName : '']"
    :stripe="val.stripe"
    :columns="string2JSON(val.columns)"
    :data="string2JSON(val.data)"
    :border="val.border"
    :show-header="val.showHeader"
    :width="val.width"
    :height="val.height"
    :max-height="val.maxHeight"
    :loading="val.loading"
    :disabled-hover="val.disabledHover"
    :highlight-row="val.highlightRow"
    :size="val.size"
    :no-data-text="val.noDataText"
    :no-filtered-data-text="val.noFilteredDataText"
    :draggable="val.draggable"
    :span-method="val.spanMethod"
    :show-summary="val.showSummay"
    :sum-text="val.sumText"
    :summary-method="val.summaryMethod"
    :indent-size="val.indentSize"
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      color: val.color
    }"
  ></Table>
</template>

<script>
import stylec from "./style.vue";
const WIDGET_NAME = "braid-table";

export default {
  name: WIDGET_NAME,
  icon: {
    type: "ios-apps"
  },
  title: "表格",
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    draggable: true,
    resizable: true,
    name: "表格",
    width: 1280,
    height: 250,
    left: 0,
    top: 0,
    z: 0,
    bgColor: "#fff",
    backPic: "",
    backPicUrl: "",
    color: "",
    text: "表格",
    belong: "page",
    animationName: "",
    columns: JSON.stringify([
      {
        title: "Name",
        key: "name"
      },
      {
        title: "Age",
        key: "age"
      },
      {
        title: "Address",
        key: "address"
      }
    ]),
    data: JSON.stringify([
      {
        name: "John Brown",
        age: 18,
        address: "New York No. 1 Lake Park",
        date: "2016-10-03"
      },
      {
        name: "Jim Green",
        age: 24,
        address: "London No. 1 Lake Park",
        date: "2016-10-01"
      },
      {
        name: "Joe Black",
        age: 30,
        address: "Sydney No. 1 Lake Park",
        date: "2016-10-02"
      },
      {
        name: "Jon Snow",
        age: 26,
        address: "Ottawa No. 2 Lake Park",
        date: "2016-10-04"
      }
    ])
  },
  props: ["h", "val", "playState"],

  methods: {
    string2JSON: function(params) {
      if (params) {
        return JSON.parse(params);
      }
    }
  }
};
</script>

<style scoped>
.lz-container {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
