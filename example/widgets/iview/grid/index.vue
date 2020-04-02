<template>
  <Row
    :class="[playState ? 'anm-' + val.animationName : '']"
    :gutter="val.gutter"
    :type="val.rowType"
    :align="val.align"
    :justify="val.justify"
    :class-name="val.className"
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
  >
    <Col v-for="child in getColItems" :span="child.span"></Col>
  </Row>
</template>

<script>
import stylec from "./style.vue";
import styleCol from "../column/style.vue";
const COL_WIDGET_NAME = "braid-column";
const WIDGET_NAME = "braid-grid";

export default {
  name: WIDGET_NAME,
  icon: {
    type: "ios-grid-outline"
  },
  title: "栅格",
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: true,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    draggable: true,
    resizable: true,
    name: "栅格",
    width: 12.8 * 100,
    height: 100,
    left: 0,
    top: 0,
    z: 0,
    bgColor: "#fff",
    backPic: "",
    backPicUrl: "",
    color: "",
    text: "row",
    belong: "page",
    animationName: "",
    colItems: "12, 12"
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
  },
  computed: {
    getColItems() {
      if (this.$vpd.state.activeElement.uuid == this.val.uuid) {
        console.log(this.$vpd.state.activeElement, 78777);
        let colArr = this.val.colItems.split(",");
        let nodeInfos = [];
        colArr.forEach(item => {
          let nodeInfo = {
            name: COL_WIDGET_NAME,
            icon: {
              type: "ios-grid-outline"
            },
            span: item,
            title: "列",
            panel: styleCol,
            setting: {
              type: COL_WIDGET_NAME,
              isContainer: true,
              isUpload: false,
              hasGuide: true,
              isChild: true,
              draggable: true,
              resizable: true,
              name: "列",
              width: 100,
              height: 20,
              left: 50,
              top: 0,
              z: 0,
              bgColor: "",
              backPic: "",
              backPicUrl: "",
              color: "",
              text: "row",
              belong: this.val.uuid,
              animationName: ""
            }
          };
          nodeInfos.push(nodeInfo);
        });
        this.$vpd.dispatch("refreshChildrenWidget", nodeInfos);
        return nodeInfos;
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
