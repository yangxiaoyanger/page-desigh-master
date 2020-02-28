<template>
  <Col
    :class="[playState ? 'anm-' + val.animationName : '']"
    :span="val.span"
    :order="val.order"
    :offset="val.offset"
    :push="val.push"
    :pull="val.pull"
    :class-name="val.className"
    :style="{
      position: 'absolute',
      width: val.width / 12.8 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / 12.8 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      color: val.color
    }"
  >
    <!-- 子组件 -->
    <slot></slot>
  </Col>
</template>

<script>
import stylec from "./style.vue";
const WIDGET_NAME = "braid-column";

export default {
  name: WIDGET_NAME,
  icon: {
    type: "ios-barcode"
  },
  title: "列",
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    draggable: true,
    resizable: true,
    name: "列",
    width: 500,
    height: 400,
    left: 50,
    top: 0,
    z: 0,
    bgColor: "#ccc",
    backPic: "",
    backPicUrl: "",
    color: "",
    text: "row",
    belong: "page",
    animationName: ""
  },
  props: ["h", "val", "playState"],
  computed: {},

  methods: {
    updateText(e, uuid) {
      let text = e.target.innerHTML;
      this.$vpd.commit("updateData", {
        uuid: uuid,
        key: "text",
        value: text
      });
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
