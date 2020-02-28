<template>
  <div>
    <hr />
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">输入框类型</div>
      <div class="panel-value">
      <Select v-model="activeElement.inputType">
          <Option
            v-for="item in inputTypeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">绑定的值</div>
      <div class="panel-value">
        <Input v-model="activeElement.inpuValue" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">尺寸</div>
      <div class="panel-value">
        <Select v-model="activeElement.size">
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
      <div class="panel-label">占位文本</div>
      <div class="panel-value">
        <Input v-model="activeElement.placeholder" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">是否显示清空按钮</div>
      <div class="panel-value">
        <Switch v-model="activeElement.clearable" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">是否禁用</div>
      <div class="panel-value">
        <Switch v-model="activeElement.diabled" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">是否只读</div>
      <div class="panel-value">
        <Switch v-model="activeElement.readonly" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">最大输入长度</div>
      <div class="panel-value">
        <Input v-model="activeElement.maxlength" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">尾部图标（只在text下有效）</div>
      <div class="panel-value">
        <Input v-model="activeElement.icon" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">头部图标</div>
      <div class="panel-value">
        <Input v-model="activeElement.prefix" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">尾部图标</div>
      <div class="panel-value">
        <Input v-model="activeElement.suffix" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">是否为搜索型输入框</div>
      <div class="panel-value">
        <Switch v-model="activeElement.search" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">文本域默认行数</div>
      <div class="panel-value">
        <Input v-model="activeElement.rows" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">Number类型转换</div>
      <div class="panel-value">
        <Switch v-model="activeElement.number" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">自动获取焦点</div>
      <div class="panel-value">
        <Switch v-model="activeElement.autofocus" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BraidInputStyle",
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
      inputTypeList: [
        {
          value: "text",
          label: "text"
        },
        {
          value: "password",
          label: "password"
        },
        {
          value: "textarea",
          label: "textarea"
        },
        {
          value: "url",
          label: "url"
        },
        {
          value: "email",
          label: "email"
        },
        {
          value: "date",
          label: "date"
        },
        {
          value: "number",
          label: "number"
        },
        {
          value: "tel",
          label: "tel"
        }
      ]
    };
  },
  methods: {
  }
};
</script>
