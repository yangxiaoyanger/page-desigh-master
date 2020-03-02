<template>
  <div>
    <hr />
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">标题</div>
      <div class="panel-value">
        <Input v-model="activeElement.option.title" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">表格列配置</div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />

      <div class="panel-value">
        <codemirror v-model="activeElement.columns" :options="cmOptions"></codemirror>
        <!-- <Input v-model="activeElement.columns" /> -->
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">间隔斑马纹</div>
      <div class="panel-value">
        <Switch v-model="activeElement.stripe" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">是否显示纵向边框</div>
      <div class="panel-value">
        <Switch v-model="activeElement.border" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">是否显示表头</div>
      <div class="panel-value">
        <Switch v-model="activeElement.showHeader" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">表格宽度（px）</div>
      <div class="panel-value">
        <Input v-model="activeElement.width" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EchartsBarStyle",
  props: ["activeElement"],
  data() {
    return {
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: {
          name: "javascript",
          json: true
        },
        theme: "base16-dark",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
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
