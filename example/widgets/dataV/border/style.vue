<template>
  <div>
    <hr />
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">边框类型</div>
      <!-- <div class="panel-value">{{ activeElement.buttonType }}</div> -->
      <div class="panel-value">
        <Select v-model="activeElement.borderType">
          <Option
            v-for="item in borderTypeList"
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
  name: "DataVBorderStyle",
  props: ["activeElement"],
  data() {
    return {
      borderTypeList: [
        {
          value: "dvBorderBox-1",
          label: "dvBorderBox-1"
        },
        {
          value: "dvBorderBox-3",
          label: "dvBorderBox-3"
        },
        {
          value: "dvBorderBox-4",
          label: "dvBorderBox-4"
        },
        {
          value: "dvBorderBox-7",
          label: "dvBorderBox-7"
        },
        {
          value: "dvBorderBox-8",
          label: "dvBorderBox-8"
        },
        {
          value: "dvBorderBox-10",
          label: "dvBorderBox-10"
        },
        {
          value: "dvBorderBox-11",
          label: "dvBorderBox-11"
        },
        {
          value: "dvBorderBox-12",
          label: "dvBorderBox-12"
        },
        {
          value: "dvBorderBox-13",
          label: "dvBorderBox-13"
        }
      ]
    };
  },
  methods: {
    addPic() {
      this.$parent.$vpd.$emit("upload", payload => {
        this.$parent.$vpd.commit("addContainerBackPic", payload);
      });
    }
  }
};
</script>
