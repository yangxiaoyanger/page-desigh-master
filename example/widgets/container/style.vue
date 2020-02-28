<template>
  <div>
    <hr />
    <div class="panel-row">
      <vpd-icon name="credit-card" />
      <div class="panel-label">容器名称</div>
      <div class="panel-value">
        <Input v-model.trim="activeElement.name" placeholder="容器名称必填" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="grid" />
      <div class="panel-label">display</div>
      <div class="panel-value">
        <Select v-model="activeElement.displayTypeLsit">
          <Option
            v-for="item in displayTypeLsit"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>

    <div class="panel-row" v-show="activeElement.display === 'flex'">
      <vpd-icon name="shuffle" />
      <div class="panel-label">主轴方向</div>
      <div class="panel-value">
        <Select v-model="activeElement.dirTypeList">
          <Option v-for="item in dirTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div>

    <div class="panel-row" v-show="activeElement.display === 'flex'">
      <vpd-icon name="align-justify" />
      <div class="panel-label">主轴分布</div>
      <div class="panel-value">
        <Select v-model="activeElement.justifyTypeList">
          <Option
            v-for="item in justifyTypeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>

    <div class="panel-row" v-show="activeElement.display === 'flex'">
      <vpd-icon name="align-center" />
      <div class="panel-label">侧轴分布</div>
      <div class="panel-value">
        <Select v-model="activeElement.alignTypeList">
          <Option
            v-for="item in alignTypeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
    </div>

    <hr />
    <div class="panel-row">
      <vpd-icon name="target" />
      <div class="panel-label">背景色</div>
      <div class="panel-value">
        <input type="color" v-model="activeElement.bgColor" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="image" />
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div
          class="panel-preview"
          @click="addPic"
          :style="{ backgroundImage: 'url(' + activeElement.backPic + ')' }"
        >
          <Icon type="md-photos" v-show="!activeElement.backPic" />
        </div>
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="square" />
      <div class="panel-label">圆角</div>
      <div class="panel-value">
        <Input v-model="activeElement.radius" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="maximize" />
      <div class="panel-label">边的宽度</div>
      <div class="panel-value">
        <Input v-model="activeElement.borderWidth" />
      </div>
    </div>

    <div class="panel-row">
      <vpd-icon name="edit-3" />
      <div class="panel-label">边的颜色</div>
      <div class="panel-value">
        <input type="color" v-model="activeElement.borderColor" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "braid-container-style",
  props: ["activeElement"],
  data() {
    return {
      displayTypeLsit: [
        {
          value: "flex",
          label: "flex"
        },
        {
          value: "block",
          label: "block"
        }
      ],
      dirTypeList: [
        {
          value: "row",
          label: "row"
        },
        {
          value: "row-reverse",
          label: "row-reverse"
        },
        {
          value: "column",
          label: "column"
        },
        {
          value: "column-reverse",
          label: "column-reverse"
        }
      ],
      justifyTypeList: [
        {
          value: "flex-start",
          label: "flex-start"
        },
        {
          value: "space-between",
          label: "space-between"
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
          value: "flex-end",
          label: "flex-end"
        }
      ],
      alignTypeList: [
        {
          value: "flex-start",
          label: "flex-start"
        },
        {
          value: "center",
          label: "center"
        },
        {
          value: "flex-end",
          label: "flex-end"
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
