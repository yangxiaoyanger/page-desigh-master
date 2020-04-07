<template>
  <div
    :class="[playState ? 'anm-' + val.animationName : '']"
    :style="{
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      backgroundColor: val.bgColor,
      zIndex: val.z,
      lineHeight: val.lineHeight,
      fontSize: val.fontSize + 'rem',
      color: val.color,
      textAlign: val.textAlign,
      fontWeight: val.fontWeight ? 'bold': 'normal'
    }"
    class="txt"
    contenteditable="true"
    @blur="(e) => updateText(e, val.uuid)"
    v-html="val.text"
  />
</template>

<script>
import braidTxtStyle from './style.vue';
const WIDGET_NAME = 'braid-txt';

export default {
  name: WIDGET_NAME,
  icon: {
    type: 'ios-paper'
  },
  title: '文本',
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
    bgColor: '',
    height: 100,
    name: '文本',
    left: 50,
    top: 0,
    z: 0,
    lineHeight: 1.6,
    fontSize: 1.2,
    fontWeight: false,
    color: '#000000',
    textAlign: 'left',
    text: '文本',
    href: '',
    belong: 'page',
    animationName: ''
  },
  // 属性含义参照 widgets/pic/index.vue
  props: ['val', 'h', 'w', 'playState'],

  methods: {
    updateText (e, uuid) {
      let text = e.target.innerHTML;
      this.$vpd.commit('updateData', {
        uuid: uuid,
        key: 'text',
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
