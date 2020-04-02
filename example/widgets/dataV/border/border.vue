<template>
  <component
    :is="val.borderType"
    :class="[playState ? 'anm-' + val.animationName : '']"
    :ghost="val.ghost"
    :size="val.size"
    :long="val.long"
    :disabled="val.disabled"
    :loading="val.loading"
    :icon="val.icon"
    :custom-icon="val.customIcon"
    :target="val.target"
    :html-type="val.htmlType"
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor
    }"
  >dv-border-box-8</component>
</template>

<script>
const WIDGET_NAME = "dataV-border";
import stylec from "./style.vue";

export default {
  name: WIDGET_NAME,
  icon: {
    type: "ios-albums"
  },
  title: "边框",
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: true,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    draggable: true,
    resizable: true,
    name: "边框",
    width: 250,
    height: 60,
    left: 50,
    top: 0,
    z: 0,
    bgColor: "#fff",
    backPic: "",
    backPicUrl: "",
    text: "边框",
    belong: "page",
    animationName: "",
    borderType: "dvBorderBox-1"
  },
  props: ["h", "val", "playState"]
};
</script>

<style scoped>
</style>
