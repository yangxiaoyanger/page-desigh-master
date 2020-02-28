<template>
  <div id="viewport" class="holder edit-viewport">
    <div
      :style="{
        backgroundColor: backgroundColor,
        height: height + 'px',
        transform: 'scale(' + zoom / 100 + ')'
      }"
      class="screen"
      @dblclick="replaceImage"
      @drop.stop.prevent="handleDropOnCanvas('', $event)"
      @dragover.stop.prevent
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
        draggable="true"
        @dragstart.native="handleDragStart(val, $event)"
        @mouseover.native.stop.prevent="handleMouseOverOnNode(val, $event)"
        @drop.native.stop.prevent="handleDropOnNode(val, $event)"
        @dragover.stop.prevent
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
          draggable="true"
          @dragstart.native="handleDragStart(child, $event)"
          @mouseover.native.stop.prevent="handleMouseOverOnNode(child, $event)"
          @drop.native.stop.prevent="handleDropOnNode(child, $event)"
          @dragover.stop.prevent
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
import ref from "./ref-lines.vue";
import widgetRefLine from "./widget-ref-lines.vue";
import control from "./size-control.vue";
import { move } from "../../mixins";
import vpd from "../../mixins/vpd";

export default {
  name: "Viewport",
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

  mounted() {
    // 采用事件代理的方式监听元件的选中操作
    document
      .getElementById("viewport")
      .addEventListener("mousedown", this.handleSelection, false);

    // 绑定键盘上下左右键用于元件的移动
    document.addEventListener(
      "keydown",
      e => {
        e.stopPropagation();
        var target = this.$vpd.state.activeElement;

        // 左
        if (e.keyCode === 37 && target.left) {
          target.left -= 1;
          return;
        }
        // 上
        if (e.keyCode === 38 && target.top) {
          e.preventDefault();
          target.top -= 1;
          return;
        }
        // 右
        if (e.keyCode === 39 && target.left) {
          target.left += 1;
          return;
        }

        // 下
        if (e.keyCode === 40 && target.top) {
          e.preventDefault();
          target.top += 1;
        }
      },
      true
    );
  },

  methods: {
    handleDragStart(item, e) {
      this.initmovement(e);
      console.log(this.$vpd.state.activeElement, 7777);
      // e.dataTransfer.setData("node", JSON.stringify(item));
    },
    handleMouseOverOnNode(node, e) {
      // console.log("handleMouseOverOnNode", node, e);
    },
    handleDropOnNode(parentNode, e) {
      // 如果是可以嵌套的
      if (parentNode.isContainer && parentNode.name) {
        // 当时从左侧组件库中drop进来
        if (event.dataTransfer.getData("node")) {
          let nodeInfo = JSON.parse(event.dataTransfer.getData("node"));
          console.log(nodeInfo, "从左侧的组件库中来 handleDropOnNode");
          nodeInfo.setting.belong = parentNode.uuid;
          console.log("handleDropOnNode", parentNode, nodeInfo);
          this.$vpd.dispatch("addWidget", nodeInfo);
        } else {
          // let nodeInfo = this.$vpd.state.activeElement;
          // nodeInfo.belong = parentNode.uuid;
          // this.$vpd.dispatch("updateWidgets", [nodeInfo]);
        }
      } else {
        this.$Message.error("该节点不支持嵌套");
      }
    },
    handleDropOnCanvas(node, event) {
      let nodeInfo = JSON.parse(event.dataTransfer.getData("node"));
      let offsetX = event.offsetX;
      let offsetY = event.offsetY;
      let setting = {
        left: offsetX,
        top: offsetY
      };
      // console.log('style', style)
      nodeInfo.setting = {
        ...nodeInfo.setting,
        ...setting
      };
      this.$vpd.dispatch("addWidget", nodeInfo);
    },
    handleSelection(e) {
      var target = e.target;
      let activeTarget;
      if (target.getAttribute("data-type")) {
        activeTarget = target
      } else if (target.closest("[data-type]")) {
        activeTarget = target.closest("[data-type]")
      }

      console.log(activeTarget, 9999)
      
      if (activeTarget) {
        var type = activeTarget.getAttribute("data-type");
        if (type) {
          var uuid = activeTarget.getAttribute("data-uuid");

          // 设置选中元素
          this.$vpd.commit("select", {
            uuid: uuid || -1
          });

          // 绑定移动事件：只有从属于 page 的，除背景图以外的元件才能移动
          activeTarget = this.$vpd.state.activeElement;
          if (activeTarget.belong === "page" && activeTarget.draggable) {
            this.initmovement(e); // 参见 mixins
          }
        } else {
          // 取消选中元素
          this.$vpd.commit("select", {
            uuid: -1
          });
        }
      } else {
          // 取消选中元素
          this.$vpd.commit("select", {
            uuid: -1
          });
        }

      
    },

    // 替换图片
    replaceImage(e) {
      if (this.$vpd.state.activeElement.isUpload) {
        this.$vpd.$emit("upload", payload => {
          this.$vpd.commit("replaceImage", payload);
        });
      }
    },

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
