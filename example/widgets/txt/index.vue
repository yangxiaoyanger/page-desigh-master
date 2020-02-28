<template>
  <div
    class="txt"
    v-html="val.text"
    :class="[playState ? 'anm-' + val.animationName : '']"
    contenteditable="true"
    @blur="(e) => updateText(e, val.uuid)"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      left: val.belong === 'page' ? val.left / 12.8 + '%' : '0',
      top: val.belong === 'page' ? val.top / h * 100 + '%' : '0',
      width: val.width / 12.8 + '%',
      minHeight: val.height / h * 100 + '%',
      backgroundColor: val.bgColor,
      zIndex: val.z,
      lineHeight: val.lineHeight,
      fontSize: val.fontSize + 'rem',
      color: val.color,
      textAlign: val.textAlign,
      fontWeight: val.fontWeight ? 'bold': 'normal'
    }"
  ></div>
</template>

<script>
import braidTxtStyle from "./style.vue";
const WIDGET_NAME = "braid-txt";

export default {
  name: WIDGET_NAME,
  icon: {
    type: "ios-paper"
  },
  title: "文本",
  panel: braidTxtStyle,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    draggable: true,
    resizable: true,
    width: 650,
    bgColor: "",
    height: 100,
    name: "文本",
    left: 50,
    top: 0,
    z: 0,
    lineHeight: 1.6,
    fontSize: 1.2,
    fontWeight: false,
    color: "#000000",
    textAlign: "left",
    text: "文本",
    href: "",
    belong: "page",
    animationName: ""
  },
  // 属性含义参照 widgets/pic/index.vue
  props: ["val", "h", "w", "playState"],

  methods: {
    updateText(e, uuid) {
      console.log(this, 76666);
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
.txt {
  outline: none;
  font-size: 28px;
}
</style>
