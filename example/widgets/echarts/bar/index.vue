<template>
  <div
    ref="line"
    :style="{
        position: 'absolute',
        width: val.width + 'px',
        height: val.height + 'px',
        left: val.left + 'px',
        top: val.top + 'px',
        zIndex: val.z,
        backgroundColor: val.bgColor,
        backgroundImage: 'url(' + val.backPic + ')',
        color: val.color
      }"
  />
</template>

<script>
import stylec from "./style.vue";
import echarts from "echarts";
// import { on, off } from "@/libs/tools";
const WIDGET_NAME = "echarts-bar";
const option = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: 10,
    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: "center"
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "30",
            fontWeight: "bold"
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ]
    }
  ]
};
export default {
  data() {
    return {
      dom: null
    };
  },
  name: WIDGET_NAME,
  icon: {
    type: "ios-pizza"
  },
  title: "饼状图",
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    draggable: true,
    resizable: true,
    name: "饼状图",
    width: 250,
    height: 200,
    left: 50,
    top: 0,
    z: 0,
    bgColor: "#fff",
    backPic: "",
    backPicUrl: "",
    color: "",
    text: "饼状图",
    belong: "page",
    animationName: "",
    option: option
  },
  props: ["h", "val", "playState"],

  methods: {
    // resize() {
    //   this.dom.resize();
    // }
  },
  mounted() {
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.line);
      this.dom.setOption(this.val.option);
      // on(window, "resize", this.resize);
    });
  },
  beforeDestroy() {
    // off(window, "resize", this.resize);
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
