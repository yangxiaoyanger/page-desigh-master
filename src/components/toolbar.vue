<template>
  <div class="menu-bar">
    <details open>
      <summary>
        <vpd-icon name="list" />可用组件
      </summary>
      <ul class="widget-list columns" @mousedown="updateSrollTop">
        <li
          v-for="item in widgets"
          :key="item.name"
          class="menu-item column col-6"
          draggable="true"
          @dragstart="handleDragStart(item, $event)"
        >
          <Icon
            :type="item.icon.type"
            :size="item.icon.size"
            :color="item.icon.color"
            :custom="item.icon.custom"
          />
          <!-- <vpd-icon :svg="item.icon" :title="item.title" /> -->
          <span class="menu-caption">{{ item.title }}</span>
        </li>
      </ul>
    </details>
    <details open>
      <summary>
        <vpd-icon name="layers" />已加组件
      </summary>
      <tree :nodes="layers" :setting="setting" ref="widgetTree" style="margin-top:15px;"/>

      <!-- <ul class="layer-list">
        <li
          v-for="layer in layers"
          :class="{'layer-active': layer === activeElement}"
          :key="layer.uuid"
          @click="(e) => {activeLayer(e, layer)}"
        >{{ getWidgetTitle(layer.type) }}</li>
      </ul>-->
    </details>
  </div>
</template>

<script>
import widget from "../plugins/widget";
import { move } from "../mixins";
import { cumulativeOffset, checkInView } from "../utils/offset";
import vpd from "../mixins/vpd";
import tree from "vue-giant-tree";

export default {
  mixins: [move, vpd],
  components: { tree },
  props: ["zoom"],
  data() {
    return {
      setting: {
        edit: {
          enable: true,
          drag: {
            isCopy: false, //所有操作都是move
            isMove: true,
            prev: true,
            next: true,
            inner: true
          }
        },
        data: {
          key: {
            name: "name"
          },
          simpleData: {
            enable: true,
            idKey: "uuid",
            pIdKey: "belong",
            rootPId: null
          }
        },
        check: {
          enable: false,
          chkStyle: "checkbox",
          chkboxType: { Y: "s", N: "s" }
        },
        callback: {
          onClick: this.activeLayer,
          onDrop: this.zTreeOnDrop
        },
        view: {
          showIcon: false,
          dblClickExpand: true
        }
      }
    };
  },
  computed: {
    widgets() {
      return widget.getWidgets();
    },
    layers() {
      // let treeObj = this.$refs.widgetTree.ztreeObj
      // let treeNodes = this.$refs.widgetTree.ztreeObj.getNodes()
      // for (let i = 0; i < treeNodes.length; i++) {
      //   // 设置节点展开
      //   treeObj.expandNode(treeNodes[i], true, false, false)
      // }
      return this.$vpd.state.widgets;
    },
    activeElement() {
      return this.$vpd.state.activeElement;
    }
  },
  methods: {
    handleDragStart(item, e) {
      console.log(item, e, "handleDragStart");
      e.dataTransfer.setData("node", JSON.stringify(item));
    },

    // 为确保添加的元件出现在可视区内，用画布向上滚动距离作为元件初始 top 值
    updateSrollTop() {
      var top =
        (document.getElementById("viewport").scrollTop / this.zoom) * 100;
      this.$vpd.commit("updateSrollTop", top);
    },

    activeLayer(e, treeId, item) {
      this.$vpd.commit("select", {
        uuid: item.uuid
      });
      let viewport = document.querySelector("#viewport");
      let target = viewport.querySelector(`[data-uuid='${item.uuid}']`);
      if (target && !checkInView(target)) {
        viewport.scrollTop =
          ((cumulativeOffset(target).top - 50) * this.zoom) / 100;
      }
    },

    getWidgetTitle(type) {
      return this.widgets[type].title || "";
    },
    zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
      console.log(treeNodes, targetNode);
      this.$vpd.commit("updateWidgets", treeNodes);
      let treeObj = this.$refs.widgetTree.ztreeObj;
      treeObj.expandAll()
      console.log(treeObj, 888)
      // let treeNodes = this.$refs.widgetTree.ztreeObj.getNodes()
      // for (let i = 0; i < treeNodes.length; i++) {
      //   // 设置节点展开
      //   treeObj.expandNode(treeNodes[i], true, false, false)
      // }
    }
  }
};
</script>

<style lang="scss">
@import "../_variables.scss";
.menu-bar {
  ul {
    list-style: none;
    margin: 0;
  }
  details {
    padding: 10px;
  }
  summary {
    padding: 5px 0;
    border-bottom: 1px solid #f5f5f5;
    .svg-icon {
      margin-right: 5px;
    }
  }
}
.widget-list {
  padding: 0;
}
.menu-item {
  text-align: center;
  cursor: pointer;
  padding: 15px 0 8px;
  transition: all 0.2s;
  position: relative;
  &:hover {
    transform: scale(1.2);
  }
  .svg-icon {
    font-size: 24px;
  }
  .menu-caption {
    display: block;
    font-size: 12px;
    width: 100%;
  }
}
.layer-list {
  padding: 10px;
  li {
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    line-height: 24px;
    padding-left: 5px;
    &:hover {
      background: #f5f5f5;
    }
    &::before {
      content: "› ";
    }
    &.layer-active {
      color: $light-color;
      background: $primary-color;
    }
  }
}
</style>
