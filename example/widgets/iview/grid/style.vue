<template>
  <div>
    <hr />
    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="单位px,左右平分">
        <div class="panel-label">栅格间距</div>
      </Tooltip>
      <div class="panel-value">
        <Input v-model="activeElement.gutter" type="number" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="可选值为flex或者不选">
        <div class="panel-label">flex布局模式</div>
      </Tooltip>
      <div class="panel-value">
        <Select v-model="activeElement.rowType">
          <Option v-for="item in rowTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">垂直对齐方式</div>
      <div class="panel-value">
        <Select v-model="activeElement.align">
          <Option
            v-for="item in alignTypeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">水平排列方式</div>
      <div class="panel-value">
        <Select v-model="activeElement.justifyType">
          <Option
            v-for="item in justifyTypeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">class名称</div>
      <div class="panel-value">
        <Input v-model="activeElement.className" />>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="col分组，每个row中的col总和应该为24,以逗号隔开如12, 12或1, 3, 20等">
        <div class="panel-label">col分组</div>
      </Tooltip>
      <div class="panel-value">
        <Input v-model="activeElement.colItems" />
      </div>
    </div>
  </div>
</template>

<script>
import stylec from "../column/style.vue";
const COL_WIDGET_NAME = "braid-column";
export default {
  name: "BraidGridStyle",
  props: ["activeElement"],
  data() {
    // 	flex 布局下的垂直对齐方式，可选值为top、middle、bottom	String
    // -justify	flex 布局下的水平排列方式，可选值为start、end、center、space-around、space-between	String	-
    // class-name
    return {
      rowTypeList: [
        {
          value: "flex",
          label: "flex"
        },
        {
          value: "default",
          label: "default"
        }
      ],
      alignTypeList: [
        {
          value: "top",
          label: "top"
        },
        {
          value: "middle",
          label: "middle"
        },
        {
          value: "bottom",
          label: "bottom"
        }
      ],
      // flex 布局下的水平排列方式，可选值为start、end、center、space-around、space-between
      justifyTypeList: [
        {
          value: "start",
          label: "start"
        },
        {
          value: "end",
          label: "end"
        },
        {
          value: "center",
          label: "center"
        },
        {
          value: "space-around",
          label: "space-around"
        },
        {
          value: "space-between",
          label: "space-between"
        }
      ]
    };
  },
  methods: {}
};
</script>
