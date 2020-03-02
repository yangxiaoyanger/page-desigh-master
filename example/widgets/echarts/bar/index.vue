<template>
  <Card>
    <div
      ref="line"
      :style="{
        position: 'absolute',
        width: val.width / 12.8 + '%',
        height: val.height / h * 100 + 'px',
        left: val.left / 12.8 + '%',
        top: val.top / h * 100 + '%',
        zIndex: val.z,
        backgroundColor: val.bgColor,
        backgroundImage: 'url(' + val.backPic + ')',
        color: val.color
      }"
    />
  </Card>
</template>

<script>
import stylec from "./style.vue";
import echarts from "echarts";
// import { on, off } from "@/libs/tools";
const WIDGET_NAME = "echarts-bar";
const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  grid: {
    top: "3%",
    left: "1.2%",
    right: "1%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }
  ],
  yAxis: [
    {
      type: "value"
    }
  ],
  series: [
    {
      name: "运营商/网络服务",
      type: "line",
      stack: "总量",
      areaStyle: {
        normal: {
          color: "#2d8cf0"
        }
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "银行/证券",
      type: "line",
      stack: "总量",
      areaStyle: {
        normal: {
          color: "#10A6FF"
        }
      },
      data: [257, 358, 278, 234, 290, 330, 310]
    },
    {
      name: "游戏/视频",
      type: "line",
      stack: "总量",
      areaStyle: {
        normal: {
          color: "#0C17A6"
        }
      },
      data: [379, 268, 354, 269, 310, 478, 358]
    },
    {
      name: "餐饮/外卖",
      type: "line",
      stack: "总量",
      areaStyle: {
        normal: {
          color: "#4608A6"
        }
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: "快递/电商",
      type: "line",
      stack: "总量",
      label: {
        normal: {
          show: true,
          position: "top"
        }
      },
      areaStyle: {
        normal: {
          color: "#398DBF"
        }
      },
      data: [820, 645, 546, 745, 872, 624, 258]
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
    type: "logo-youtube"
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
    height: 400,
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
