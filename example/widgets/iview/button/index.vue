<template>
  <Button
    :class="[playState ? 'anm-' + val.animationName : '']"
    :type="val.buttonType"
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
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      color: val.color
    }"
    contenteditable="true"
    @blur="(e) => updateText(e, val.uuid)"
    v-html="val.text"
  />
</template>

<script>
import stylec from "./style.vue";
const WIDGET_NAME = "braid-button";

export default {
  name: WIDGET_NAME,
  icon: {
    type: "logo-youtube"
  },
  title: "按钮",
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    draggable: true,
    resizable: true,
    name: "按钮",
    width: 250,
    height: 60,
    left: 50,
    top: 0,
    z: 0,
    bgColor: "#fff",
    backPic: "",
    backPicUrl: "",
    color: "",
    text: "按钮",
    belong: "page",
    animationName: ""
  },
  props: ["h", "val", "playState", "w"],

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
