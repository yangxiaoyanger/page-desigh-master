<template>
  <div>
    <hr />
    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="栅格的占位格数，可选值为0~24的整数，为 0 时，相当于display:none">
        <div class="panel-label">占位格数</div>
      </Tooltip>
      <div class="panel-value">
        <Input v-model="activeElement.span" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="栅格的顺序，在flex布局模式下有效">
        <div class="panel-label">栅格顺序</div>
      </Tooltip>
      <div class="panel-value">
        <Input v-model="activeElement.order" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="栅格左侧的间隔格数，间隔内不可以有栅格">
        <div class="panel-label">间隔格数</div>
      </Tooltip>
      <div class="panel-value">
        <Input v-model="activeElement.offset" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="栅格向右移动格数">
        <div class="panel-label">右移格数</div>
      </Tooltip>
      <div class="panel-value">
        <Input v-model="activeElement.push" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="栅格向坐移动格数">
        <div class="panel-label">左移格数</div>
      </Tooltip>
      <div class="panel-value">
        <Input v-model="activeElement.pull" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">class名称</div>
      <div class="panel-value">
        <Input v-model="activeElement.className" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BraidColumnStyle",
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
