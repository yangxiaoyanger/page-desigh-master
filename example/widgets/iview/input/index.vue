<template>
  <Input
    :placeholder="val.placeholder"
    :type="val.inputType"
    :value="val.inpuValue"
    :size="val.size"
    :clearable="val.clearable"
    :disabled="val.disabled"
    :readonly="val.readonly"
    :maxlength="val.maxlength"
    :icon="val.inputIcon"
    :prefix="val.prefix"
    :suffix="val.suffix"
    :search="val.search"
    :number="val.number"
    :rows="val.rows"
    :autofocus="val.autofocus"
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
  />
</template>

<script>
import stylec from "./style.vue";
const WIDGET_NAME = "braid-input";

export default {
  name: WIDGET_NAME,
  icon: {
    type: "ios-create"
  },
  title: "输入框",
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    draggable: true,
    resizable: true,
    name: "输入框",
    width: 250,
    height: 20,
    left: 50,
    top: 0,
    z: 0,
    bgColor: "#fff",
    backPic: "",
    backPicUrl: "",
    color: "",
    text: "输入框",
    belong: "page",
    animationName: ""
  },
  props: ["h", "val", "playState"],

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
