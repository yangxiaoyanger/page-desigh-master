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
      @contextmenu.stop.prevent="handleRightClick($event)"
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
        :w="width"
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
          :w="width"
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

      <slot name="scale">
        <scale :width="boardWidth" :height="boardHeight"></scale>
      </slot>

      <!-- 右键菜单 -->
      <!-- <context-menu></context-menu> -->
    </div>
  </div>
</template>

<script>
import ref from "./ref-lines.vue";
import widgetRefLine from "./widget-ref-lines.vue";
import control from "./size-control.vue";
import { move } from "../../mixins";
import vpd from "../../mixins/vpd";
import { cumulativeOffset, checkInView } from "../../utils/offset";
import scale from "./scale.vue";
// import contextMenu from "../contextMenu";
import bus from "../../utils/bus";

export default {
  name: "Viewport",
  components: {
    ref: ref, // 参考线
    control: control, // 尺寸控制
    widgetRefLine: widgetRefLine, // 界限
    scale // 刻度尺
    // contextMenu // 右键菜单
  },

  mixins: [move, vpd],

  props: ["zoom"],

  data() {
    return {
      // 画板宽度
      boardWidth: 0,
      // 画板高度
      boardHeight: 0
    };
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
    // 画布宽度
    width() {
      return this.$vpd.state.page.width;
    },

    // 页面背景色
    backgroundColor() {
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
    let _t = this;
    _t.boardWidth = _t.$el.offsetWidth;
    _t.boardHeight = _t.$el.offsetHeight;
    console.log("boardWidth", _t.$el.offsetWidth, _t.$el.offsetHeight);

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
        activeTarget = target;
      } else if (target.closest("[data-type]")) {
        activeTarget = target.closest("[data-type]");
      }
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
    },

    // 桌面右键点击
    handleRightClick: function(event) {
      let _t = this;
      let xpeEl = document.querySelector("#xpe");
      let xVal;
      let yVal;
      if (xpeEl) {
        xVal = event.clientX - xpeEl.offsetLeft;
        yVal = event.clientY - xpeEl.offsetTop;
      } else {
        xVal = event.offsetX;
        yVal = event.offsetY;
      }
      // 菜单信息
      let contextMenuInfo = {
        isShow: true,
        x: xVal,
        y: yVal,
        target: "XPE_board",
        list: [
          {
            name: "expand",
            icon: {
              type: "icon-expand",
              style: "",
              category: "iconfont"
            },
            text: "展开",
            enable: _t.isExpand,
            action: {
              type: "bus",
              handler: "XPE/expand/toggle/all",
              params: false
            }
          },
          {
            name: "fold",
            icon: {
              type: "icon-fold",
              style: "",
              category: "iconfont"
            },
            text: "折叠",
            enable: !_t.isExpand,
            action: {
              type: "bus",
              handler: "XPE/expand/toggle/all",
              params: true
            }
          },
          {
            name: "showGuides",
            icon: {
              type: "",
              style: "",
              category: "iconfont"
            },
            text: "显示 / 隐藏参考线",
            enable: true,
            action: {
              type: "bus",
              handler: "XPE/scale/guides/toggle"
            }
          },
          {
            name: "showToolTip",
            icon: {
              type: "",
              style: "",
              category: "iconfont"
            },
            text: "显示 / 隐藏参考线坐标",
            enable: true,
            action: {
              type: "bus",
              handler: "XPE/scale/guides/toolTip/toggle"
            }
          },
          {
            name: "clear",
            icon: {
              type: "",
              style: "",
              category: "iconfont"
            },
            text: "清空编辑器画板",
            enable: false,
            action: {
              type: "bus",
              // FIXME 需添加confirm 回调操作
              handler: "XPE/board/clear"
            }
          }
        ]
      };
      // 广播事件
      bus.$emit("XPE/contextMenu/show", contextMenuInfo);
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
