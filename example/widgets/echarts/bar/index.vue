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
  color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "直接访问",
      type: "bar",
      barWidth: "60%",
      data: [10, 52, 200, 334, 390, 330, 220]
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
    type: "ios-podium"
  },
  title: "柱状图",
  panel: stylec,
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    draggable: true,
    resizable: true,
    name: "柱状图",
    width: 250,
    height: 200,
    left: 50,
    top: 0,
    z: 0,
    bgColor: "#fff",
    backPic: "",
    backPicUrl: "",
    color: "",
    text: "柱状图",
    belong: "page",
    animationName: "",
    option: option,
    isEcharts: true
  },
  props: ["h", "val", "playState", "w"],

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
