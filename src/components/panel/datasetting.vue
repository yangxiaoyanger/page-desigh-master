<template>
  <div v-if="tab === 2" class="panel-wrap">
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">数据绑定方式</div>
      <!-- <div class="panel-value">{{ activeElement.buttonType }}</div> -->
      <div class="panel-value">
        <Select v-model="activeElement.dataSetType">
          <Option
            v-for="item in dataSetTypeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>

    <div v-show="activeElement.dataSetType == 1">
      <div class="panel-row">
        <vpd-icon name="target" />
        <div class="panel-label">API地址</div>
        <div class="panel-value">
          <Input v-model="activeElement.apiAdrr" @on-change="getTableData" />
        </div>
      </div>
    </div>
    <div v-show="activeElement.dataSetType == 2">
      <div class="panel-row">
        <vpd-icon name="target" />
        <div class="panel-label" style="width: 100%;">表格数据</div>
      </div>

      <div class="panel-row">
        <vpd-icon name="target" />
        <div class="panel-value">
          <codemirror v-model="activeElement.data" :options="cmOptions"></codemirror>
          <!-- <Input v-model="activeElement.data" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["activeElement", "tab"],
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
      dataSetTypeList: [
        {
          value: "1",
          label: "API拉取"
        },
        {
          value: "2",
          label: "静态JSON"
        },
        {
          value: "3",
          label: "SQL建模"
        }
      ]
    };
  },
  methods: {
    getTableData() {
      console.log("getData");
      return axios
        .request({
          url: this.activeElement.apiAdrr,
          method: "get"
        })
        .then(res => {
          console.log(res, 7666);
        });
    }
  }
};
</script>
