<template>
  <div>
    <hr />
    <!-- <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label" style="width: 100%;">表格数据</div>
    </div>

    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-value">
        <codemirror v-model="activeElement.data" :options="cmOptions"></codemirror>
      </div>
    </div>-->

    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">表格列配置</div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />

      <div class="panel-value">
        <!-- <codemirror v-model="activeElement.columns" :options="cmOptions"></codemirror> -->
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
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">表格高度（px）</div>
      <div class="panel-value">
        <Input v-model="activeElement.height" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">表格最大高度（px）</div>
      <div class="panel-value">
        <Input v-model="activeElement.maxHeight" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">是否加载中</div>
      <div class="panel-value">
        <Switch v-model="activeElement.loading" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">是否支持单选</div>
      <div class="panel-value">
        <Switch v-model="activeElement.highlightRow" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">表格尺寸</div>
      <div class="panel-value">
        <Input v-model="activeElement.size" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">数据为空时提示</div>
      <div class="panel-value">
        <Input v-model="activeElement.noDataText" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">筛选数据为空时提示</div>
      <div class="panel-value">
        <Input v-model="activeElement.noFilteredDataText" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">是否可拖拽调整行</div>
      <div class="panel-value">
        <Switch v-model="activeElement.draggable" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">合并行列计算方法</div>
      <div class="panel-value">
        <Input v-model="activeElement.spanMethod" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">表尾是否显示合计行</div>
      <div class="panel-value">
        <Input v-model="activeElement.showSummary" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <Tooltip content="使按钮背景透明">
        <div class="panel-label">合计行第一列文本</div>
      </Tooltip>
      <div class="panel-value">
        <Input v-model="activeElement.sumText" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">合计计算方法</div>
      <div class="panel-value">
        <Input v-model="activeElement.summaryMethod" />
      </div>
    </div>
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">树形数据缩进宽度</div>
      <div class="panel-value">
        <Input v-model="activeElement.indentSize" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BraidTableStyle",
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
  methods: {}
};
</script>
