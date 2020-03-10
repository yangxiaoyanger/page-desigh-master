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
      <div class="panel-label">tooltip配置</div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />

      <div class="panel-value">
        <codemirror :value="tooltip" :options="cmOptions" @input="tooltipChange"></codemirror>
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">series配置</div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />

      <div class="panel-value">
        <codemirror :value="series" :options="cmOptions" @input="onSeriesChange"></codemirror>
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">xAxis配置</div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />

      <div class="panel-value">
        <codemirror :value="xAxis" :options="cmOptions" @input="xAxisChange"></codemirror>
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
      },
      series: JSON.stringify(this.activeElement.option.series),
      xAxis: JSON.stringify(this.activeElement.option.xAxis),
      tooltip: JSON.stringify(this.activeElement.option.tooltip)
    };
  },
  methods: {
    onSeriesChange(newCode) {
      this.activeElement.option.series = JSON.parse(newCode);
      this.$parent.$vpd.commit("updateWidgets", this.activeElement);
    },
    tooltipChange(newCode) {
      this.activeElement.option.tooltip = JSON.parse(newCode);
      this.$parent.$vpd.commit("updateWidgets", this.activeElement);
    },
    xAxisChange(newCode) {
      this.activeElement.option.xAxis = JSON.parse(newCode);
    }
  }
};
</script>
