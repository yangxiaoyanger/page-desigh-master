<template>
  <div v-show="moving" class="guides">
    <!-- 横线 -->
    <div v-show="showLine" :key="target.id" :style="{top: target.top + 'px'}" class="horiz-dashed" />

    <!-- 下横线 -->
    <div
      v-show="showLine"
      :key="target.id"
      :style="{top: target.bottom + 'px'}"
      class="horiz-dashed"
    />

    <!-- 竖线 -->
    <div
      v-show="showLine"
      :key="target.id"
      :style="{left: target.left + 'px'}"
      class="verti-dashed"
    />

    <!-- 右竖线 -->
    <div
      v-show="showLine"
      :key="target.id"
      :style="{left: target.right + 'px'}"
      class="verti-dashed"
    />
  </div>
</template>

<script>
import vpd from "../../mixins/vpd";

export default {
  name: "WidgetRefLines",
  mixins: [vpd],
  computed: {
    moving() {
      return this.$vpd.state.moving;
    },
    // 移动元素上下边坐标
    target() {
      var activeElement = this.$vpd.state.activeElement;
      let target = false;
      if (activeElement) {
        var h = Math.round(activeElement.height);
        var w = Math.round(activeElement.width / 2);
        target = {
          uuid: activeElement.uuid,
          width: activeElement.width,
          height: activeElement.height,
          top: activeElement.top,
          bottom: activeElement.top + h,
          left: activeElement.left,
          right: activeElement.left + w * 2
        };
      }
      return target;
    }
  },
  methods: {
    showLine(value) {
      return this.target !== false;
    }
  }
};
</script>

<style scoped>
.guides {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}
.verti-dashed {
  position: absolute;
  width: 1px;
  height: 100%;
  /* top: -50px; */
  border: 1px dashed #2196f3;
}
.horiz-dashed {
  position: absolute;
  height: 0.5px;
  width: 100%;
  /* left: -500%; */
  border: 1px dashed #2196f3;
}
</style>
