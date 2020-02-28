<template>
  <div
    class="lz-container"
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      display: val.display,
      position: 'absolute',
      width: val.width / 12.8 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / 12.8 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align
    }"
  >
    <!-- 子组件 -->
    <slot></slot>
  </div>
</template>

<script>
import stylec from "./style.vue";
const WIDGET_NAME = "braid-container";

export default {
  name: WIDGET_NAME,
  icon: {
    type: "ios-archive"
  },
  title: "容器",
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: true,
    hasGuide: true,
    isUpload: false,
    isChild: false,
    draggable: true,
    resizable: true,
    name: "",
    width: 650,
    height: 300,
    left: 50,
    top: 0,
    z: 0,
    display: "flex",
    bgColor: "#fff",
    backPic: "",
    backPicUrl: "",
    radius: 0,
    borderColor: "",
    borderWidth: 0,
    dir: "row",
    justify: "flex-start",
    align: "flex-start",
    belong: "page",
    animationName: ""
  },
  props: ["h", "val", "playState"]
};
</script>

<style scoped>
.lz-container {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
