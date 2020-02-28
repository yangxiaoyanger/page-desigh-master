<template>
  <div v-if="!activeElement.page && tab === 1" class="panel-wrap">
    <!-- 公共属性 -->
    <div class="panel-row">
      <vpd-icon name="layers" />
      <div class="panel-label">层级</div>
      <div class="panel-value">
          <Input v-model="activeElement.z" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="more-horizontal" />
      <div class="panel-label">宽度</div>
      <div class="panel-value">
          <Input v-model="activeElement.width" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="more-vertical" />
      <div class="panel-label">高度</div>
      <div class="panel-value">
          <Input v-model="activeElement.height" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="arrow-right" />
      <div class="panel-label">横坐标</div>
       <div class="panel-value">
          <Input v-model="activeElement.left" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="arrow-down" />
      <div class="panel-label">纵坐标</div>
      <div class="panel-value">
          <Input v-model="activeElement.top" />
      </div>
    </div>

    <!-- 组件样式 -->
    <component
      v-for="(item, i) in widgetStyle"
      v-if="item.type === activeElement.type"
      :is="widgetStyle[i]"
      :key="i"
      :active-element="activeElement"
    />

    <!-- 自定义样式 -->
    <div>
      <hr />
      <div class="panel-row">
        <vpd-icon name="layout" />
        <div class="panel-label">自定义样式</div>
      </div>
       <div class="panel-row">
        <vpd-icon name="layout" />
        <div class="panel-value"><codemirror v-model="activeElement.mystyle" :options="cmOptions"></codemirror></div>
      </div>
      
  </div>

    <!-- 添加到容器 -->
    <div v-if="activeElement.isChild">
      <hr />
      <div class="panel-row">
        <vpd-icon name="layout" />
        <div class="panel-label">元素名称</div>
        <div class="panel-value">
          <Input v-model="activeElement.name" />
        </div>
      </div>
      <div class="panel-row">
        <vpd-icon name="layout" />
        <div class="panel-label">所属容器</div>
        <div class="panel-value">
          <select v-model="activeElement.belong">
            <option>page</option>
            <option v-for="(val, index) in containerName" :key="index">{{ val }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import widget from "../../plugins/widget";
import vpd from "../../mixins/vpd";

export default {
  name: "PanelStyle",
  mixins: [vpd],
  props: ["activeElement", "tab"],
  data() {
    return {
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: {
          name: 'javascript',
          json: true
        },
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  },

  computed: {
    widgetStyle() {
      console.log(widget.getWidgetStyle(), 'widget.getWidgetStyle()')
      return widget.getWidgetStyle();
    },
    // 页面高度
    height() {
      return this.$vpd.state.page.height;
    },

    // 容器名称
    containerName() {
      var arr = [];
      this.$vpd.state.widgets.map(
        val => val.isContainer && val.name && arr.push(val.name)
      );

      return arr;
    }
  }
};
</script>
