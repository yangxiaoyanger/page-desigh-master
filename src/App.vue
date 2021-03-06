/* eslint-disable space-before-function-paren */
<template>
  <div class="app">
    <navbar />
    <div class="body container grid-xl">
      <preview v-show="showPreview" />
      <div
        v-show="hidePreview"
        class="columns col-gapless">
        <toolbar
          :zoom="zoom"
          class="toolbar column" />
        <div class="viewport column">
          <viewport :zoom="zoom" />
          <div class="zoom-wrap">
            <vpd-slider
              :value="zoom"
              :step="1"
              :tuning="false"
              @input="dozoom" />
            <div class="zoom-value">{{ zoom }}%</div>
          </div>
        </div>
        <panel class="control-panel column" />
      </div>
    </div>
    <vpd-uploader
      :upload="upload"
      :upload-option="uploadOption" />
    <vpd-toast />
  </div>
</template>

<script>
import Vue from 'vue';
import widget from './plugins/widget';
import navbar from './components/navbar.vue';
import toolbar from './components/toolbar.vue';
import panel from './components/panel/index.vue';
import viewport from './components/viewport/index.vue';
import preview from './components/preview/index.vue';
import loadSprite from './utils/load-sprite';
import vpd from './mixins/vpd';
import toast from './components/toast.vue';
import uploader from './components/uploader.vue';
import slider from './components/slider.vue';

export default {
  name: 'VuePageDesigner',
  components: {
    navbar, // 顶部导航栏
    toolbar, // 左侧菜单栏
    panel, // 右侧参数面板
    viewport, // 页面画布
    [toast.name]: toast, // 提示组件
    [uploader.name]: uploader, // 上传组件
    [slider.name]: slider,
    preview
  },
  mixins: [vpd],
  props: {
    value: Object,
    widgets: Object,
    upload: Function,
    uploadOption: Object
  },

  computed: {
    zoom () {
      return this.$vpd.state.zoom;
    },
    showPreview () {
      return this.$vpd.state.previewstatus;
    },
    hidePreview () {
      return !this.$vpd.state.previewstatus;
    }
  },
  watch: {
    value: {
      deep: true, // 深度监听
      handler (newVal, oldVal) {
        this.$vpd.replaceState(newVal);
      }
    }
  },
  beforeCreate () {
    // TODO: custom svg path by config
    // loadSprite("//unpkg.com/vue-page-designer/dist/icons.svg", "svgspriteit");
  },
  created () {
    // 注册 widgets
    Vue.use(widget, {
      widgets: this.widgets
    });
    // // 初始化已有数据
    // if (this.value) {
    //   this.$vpd.replaceState(this.value);
    // }
    this.$vpd.$on('save', () => {
      this.$emit('save', this.$vpd.state);
    });
  },
  mounted () {
    // 初始化选中元件（将页面作为初始选中元件）
    this.$vpd.commit('initActive');
  },

  methods: {
    dozoom (val) {
      this.$vpd.commit('zoom', val);
    }
  }
};
</script>

<style lang="scss">
.body {
  width: 100%;
  height: calc(100% - 56px);
  overflow: hidden;
  flex-direction: row;
  &.container {
    padding: 0;
  }

  &.container.grid-xl {
    width: 100%;
    max-width: none;
  }
}
.columns {
  height: 100%;
}
.toolbar,
.viewport,
.control-panel {
  height: 100%;
}
.toolbar {
  background: #fff;
  user-select: none;
  box-sizing: content-box;
  &.column {
    flex: none;
    width: 200px;
  }
}
.viewport {
  position: relative;
  overflow: hidden;
}
.control-panel {
  background: #fff;
  user-select: none;
  &.column {
    flex: none;
    width: 400px;
  }
}
.zoom-wrap {
  width: 200px;
  height: 30px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}
.viewport:hover .zoom-wrap {
  opacity: 1;
}
.zoom-value {
  position: absolute;
  top: 4px;
  left: -36px;
}
#svgspriteit {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
</style>
