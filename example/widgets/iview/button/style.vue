<template>
  <div>
    <hr />
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">按钮类型</div>
      <!-- <div class="panel-value">{{ activeElement.buttonType }}</div> -->
      <div class="panel-value">
        <Select v-model="activeElement.buttonType">
          <Option
            v-for="item in buttonTypeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="使按钮背景透明">
        <div class="panel-label">幽灵属性</div>
      </Tooltip>
      <div class="panel-value">
        <Switch v-model="activeElement.ghost" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">按钮大小</div>
      <div class="panel-value">
        <Select v-model="activeElement.sizeType">
          <Option
            v-for="item in sizeTypeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">按钮形状</div>
      <div class="panel-value">
        <Input v-model="activeElement.shape" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">long</div>
      <div class="panel-value">
        <Switch v-model="activeElement.long" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">原生type</div>
      <div class="panel-value">
        <Input v-model="activeElement.htmlType" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">禁用状态</div>
      <div class="panel-value">
        <Switch v-model="activeElement.disabled" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">加载状态</div>
      <div class="panel-value">
        <Switch v-model="activeElement.loading" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">图标类型</div>
      <div class="panel-value">
        <Input v-model="activeElement.icon" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">自定义图标</div>
      <div class="panel-value">
        <Input v-model="activeElement.customIcon" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">target属性</div>
      <div class="panel-value">
        <Input v-model="activeElement.target" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="image" />
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div
          :style="{ backgroundImage: 'url(' + activeElement.backPic + ')' }"
          class="panel-preview"
          @click="addPic"
        >
          <Icon type="md-photos" v-show="!activeElement.backPic" name="plus" />
        </div>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="edit-3" />
      <div class="panel-label">文字颜色</div>
      <div class="panel-value">
        <input v-model="activeElement.color" type="color" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BraidButtonStyle",
  props: ["activeElement"],
  data() {
    return {
      sizeTypeList: [
        {
          value: "small",
          label: "small"
        },
        {
          value: "default",
          label: "default"
        },
        {
          value: "large",
          label: "large"
        }
      ],
      // 可选值为 default、primary、dashed、text、info、success、warning、error或者不设置
      buttonTypeList: [
        {
          value: "default",
          label: "default"
        },
        {
          value: "primary",
          label: "primary"
        },
        {
          value: "dashed",
          label: "dashed"
        },
        {
          value: "text",
          label: "text"
        },
        {
          value: "info",
          label: "info"
        },
        {
          value: "success",
          label: "success"
        },
        {
          value: "warning",
          label: "warning"
        },
        {
          value: "error",
          label: "error"
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
