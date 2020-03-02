<template>
  <header class="header">
    <div class="navbar container grid-xl">
      <section class="logo navbar-section">
        <vpd-icon name="anchor" />&nbsp;&nbsp;页面编辑器
      </section>
      <section class="logo navbar-section">
        <Dropdown>
          <a href="javascript:void(0)">
            报表组件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <ul class="widget-list columns">
              <li
                v-for="item in widgets"
                :key="item.name"
                class="menu-item column col-3"
                draggable="true"
                @dragstart="handleDragStart(item, $event)"
              >
                <Icon
                  :type="item.icon.type"
                  :size="item.icon.size"
                  :color="item.icon.color"
                  :custom="item.icon.custom"
                />
                <span class="menu-caption">{{ item.title }}</span>
              </li>
            </ul>
          </DropdownMenu>
        </Dropdown>
      </section>
      <section v-show="previewHideStatus">
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="复制元件 Ctrl + C"
          @click="copyWidget"
        >
          <vpd-icon name="copy" />复制
        </a>
        <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="删除元件 Delete" @click="dele">
          <vpd-icon name="trash-2" />删除
        </a>
        <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="保存 Ctrl + S" @click="save">
          <vpd-icon name="save" />保存
        </a>
        <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="预览" @click="preview">
          <vpd-icon name="preview" />预览
        </a>
      </section>
      <section v-show="previewShowStatus">
        <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="取消预览" @click="hidePreview">
          <vpd-icon name="preview" />取消预览
        </a>
      </section>
    </div>
  </header>
</template>

<script>
import vpd from "../mixins/vpd";
import widget from "../plugins/widget";
export default {
  mixins: [vpd],
  data() {
    return {};
  },
  computed: {
    widgets() {
      return widget.getWidgets();
    },
    show() {
      return this.$vpd.state.type !== "page";
    },
    previewShowStatus() {
      return this.$vpd.state.previewstatus;
    },
    previewHideStatus() {
      return !this.$vpd.state.previewstatus;
    }
  },
  mounted() {
    // Ctrl + C 复制元件
    document.addEventListener(
      "keyup",
      e => {
        e.stopPropagation();
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
          this.copyWidget();
        }
      },
      true
    );

    // Delete 删除选中元件
    document.addEventListener(
      "keyup",
      e => {
        e.stopPropagation();
        if (e.keyCode === 46) {
          this.dele();
        }
      },
      true
    );

    // Ctrl + S 保存
    document.addEventListener(
      "keyup",
      e => {
        e.stopPropagation();
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
          this.save();
        }
      },
      true
    );
  },

  methods: {
    // 为确保添加的元件出现在可视区内，用画布向上滚动距离作为元件初始 top 值
    updateSrollTop() {
      var top =
        (document.getElementById("viewport").scrollTop / this.zoom) * 100;
      this.$vpd.commit("updateSrollTop", top);
    },
    handleDragStart(item, e) {
      console.log(item, e, "handleDragStart");
      e.dataTransfer.setData("node", JSON.stringify(item));
    },
    // 保存
    save() {
      this.$vpd.dispatch("save");
    },

    // 复制元件
    copyWidget() {
      this.$vpd.commit("copy");
    },

    // 删除元件
    dele() {
      this.$vpd.commit("delete");
    },
    // 预览
    preview() {
      this.$vpd.commit("preview", true);
    },
    hidePreview() {
      this.$vpd.commit("preview", false);
    }
  }
};
</script>

<style lang="scss">
@import "../_variables.scss";
.header {
  background-color: #39f;
  padding: 12px 0;
  color: #eee;
  a,
  a:active,
  a:hover,
  a:visited {
    color: #eee !important;
  }
}
.ivu-dropdown-menu {
  li {
    list-style: none;
    color: #000;
  }
}
.navbar {
  .svg-icon {
    svg {
      vertical-align: middle;
    }
  }
  .btn.btn-link {
    color: #eee;
    margin-right: 15px;
  }
  .btn.btn-link:hover {
    color: $light-color;
  }
  .logo {
    font-size: 20px;
    .svg-icon {
      width: 30px;
      text-align: center;
      background-color: $light-color;
      border-radius: 50%;
    }
  }
}
</style>
