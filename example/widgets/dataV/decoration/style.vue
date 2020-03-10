<template>
  <div>
    <hr />
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">边框类型</div>
      <!-- <div class="panel-value">{{ activeElement.buttonType }}</div> -->
      <div class="panel-value">
        <Select v-model="activeElement.decorationType">
          <Option
            v-for="item in decorationTypeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">颜色</div>
      <div class="panel-value">
        <input type="color" v-model="activeElement.color" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataVDecorationStyle",
  props: ["activeElement"],
  data() {
    return {
      decorationTypeList: [
        {
          value: "dvDecoration-1",
          label: "dvDecoration-1"
        },
        {
          value: "dvDecoration-3",
          label: "dvDecoration-3"
        },
        {
          value: "dvDecoration-4",
          label: "dvDecoration-4"
        },
        {
          value: "dvDecoration-7",
          label: "dvDecoration-7"
        },
        {
          value: "dvDecoration-8",
          label: "dvDecoration-8"
        },
        {
          value: "dvDecoration-10",
          label: "dvDecoration-10"
        },
        {
          value: "dvDecoration-11",
          label: "dvDecoration-11"
        },
        {
          value: "dvDecoration-12",
          label: "dvDecoration-12"
        },
        {
          value: "dvDecoration-13",
          label: "dvDecoration-13"
        }
      ]
    };
  },
  methods: {}
};
</script>
