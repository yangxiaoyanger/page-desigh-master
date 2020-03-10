<template>
  <div id="viewportPreview" class="holder">
    <div
      :style="{
        backgroundColor: backgroundColor,
        height: height + 'px',
        transform: 'scale(' + zoom / 100 + ')'
      }"
      class="screen"
    >
      <!-- 组件 -->
      <component
        v-for="val in widgetStore"
        :is="val.type"
        :data-title="val.type"
        :class="{'g-active': id === val.uuid}"
        :key="val.uuid"
        :val="val"
        :h="height"
        :w="750"
        :data-type="val.type"
        :data-uuid="val.uuid"
        :play-state="playState"
        class="layer"
      >
        <component
          v-for="child in getChilds(val.name)"
          :is="child.type"
          :data-title="child.type"
          :class="{'g-active': id === child.uuid}"
          :key="child.uuid"
          :val="child"
          :h="height"
          :w="750"
          :data-type="child.type"
          :data-uuid="child.uuid"
          :play-state="playState"
          class="layer layer-child"
        />
      </component>

      <!-- 参考线 -->
      <ref />

      <widgetRefLine />

      <!-- 尺寸控制器 -->
      <control />
    </div>
  </div>
</template>

<script>
import ref from "../viewport/ref-lines.vue";
import widgetRefLine from "../viewport/widget-ref-lines.vue";
import control from "../viewport/size-control.vue";
import { move } from "../../mixins";
import vpd from "../../mixins/vpd";

export default {
  name: "Preview",
  components: {
    ref: ref, // 参考线
    control: control, // 尺寸控制
    widgetRefLine: widgetRefLine // 界限
  },

  mixins: [move, vpd],

  props: ["zoom"],

  data() {
    return {};
  },

  computed: {
    // 已添加的组件
    widgetStore() {
      return this.$vpd.state.widgets.filter(item => item.belong === "page");
    },

    // 画布高度
    height() {
      return this.$vpd.state.page.height;
    },

    // 页面背景色
    backgroundColor() {
      console.log(this.$vpd.state.page);
      return this.$vpd.state.page.backgroundColor;
    },

    // 选中项id
    id() {
      // var type = this.$vpd.state.type
      // var index = this.$vpd.state.index
      // index = index >= 0 ? index : ''
      // return type + index
      return this.$vpd.state.uuid;
    },

    // 动画播放状态
    playState() {
      return this.$vpd.state.playState;
    }
  },

  mounted() {},

  methods: {
    // 获取子组件
    getChilds(name) {
      return this.$vpd.state.widgets.filter(item => item.belong === name);
    }
  }
};
</script>

<style scoped>
.holder {
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: auto;
  font-size: 0;
  border: 1px solid #f5f5f5;
  border-width: 0 1px;
  background-image: linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    ),
    linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    );
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
}
.screen {
  width: 1280px;
  margin: 25px auto;
  transform-origin: center top;
  position: relative;
}
</style>
