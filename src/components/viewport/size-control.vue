<template>
  <div v-show="elm">
    <!-- 左 -->
    <div
      :style="{
        height: elm.height + 'px',
        top: elm.offsetTop + 'px',
        left: elm.offsetLeft + 'px'
      }"
      class="verti"
      @mousedown="handlemousedown($event, 'left', 'left', 'width')"
    >
      <div class="square" />
    </div>

    <!-- 右 -->
    <div
      :style="{
        height: elm.height + 'px',
        top: elm.offsetTop + 'px',
        left: elm.offsetLeft + Number(elm.width) + 'px'
      }"
      class="verti"
      @mousedown="handlemousedown($event, 'right', 'width')"
    >
      <div class="square" />
    </div>

    <!-- 上 -->
    <div
      :style="{
        width: elm.width + 'px',
        top: elm.offsetTop + 'px',
        left: elm.offsetLeft + 'px'
      }"
      class="horiz"
      @mousedown="handlemousedown($event, 'up', 'top', 'height')"
    >
      <div class="square" />
    </div>

    <!-- 下 -->
    <div
      :style="{
        width: elm.width + 'px',
        top: elm.offsetTop + Number(elm.height) + 'px',
        left: elm.offsetLeft + 'px'
      }"
      class="horiz"
      @mousedown="handlemousedown($event, 'down', 'height')"
    >
      <div class="square" />
    </div>
  </div>
</template>

<script>
import vpd from '../../mixins/vpd';
export default {
  mixins: [vpd],
  data () {
    return {
      type: '' // 调整方向 left | right | up | down
    };
  },
  computed: {
    elm () {
      var target = this.$vpd.state.activeElement;
      // 重新计算offsetTop和offsetLeft，因为当改变父容器的位置，子元素的offsetTop和offsetLeft会发生变化
      if (!target.page && target.belong !== 'page') {
        var parentWidget = this.$vpd.state.widgets.filter(item => {
          return item.uuid == target.belong;
        });
        if (parentWidget && parentWidget[0]) {
          target.offsetLeft = parentWidget[0].offsetLeft + target.left;
          target.offsetTop = parentWidget[0].offsetTop + target.top;
        }
      }

      if (!target.resizable) return '';
      return target;
    }
  },

  methods: {
    handlemousedown (e, type, originX, originY) {
      e.stopPropagation();
      this.type = type;
      this.$vpd.commit('initmove', {
        startX: e.pageX,
        startY: e.pageY,
        originX: this.elm[originX],
        originY: this.elm[originY]
      });

      document.addEventListener('mousemove', this.handlemousemove, true);
      document.addEventListener('mouseup', this.handlemouseup, true);
    },

    handlemousemove (e) {
      e.stopPropagation();
      e.preventDefault();

      this.$vpd.commit('resize', {
        x: e.pageX,
        y: e.pageY,
        type: this.type
      });
    },

    handlemouseup () {
      document.removeEventListener('mousemove', this.handlemousemove, true);
      document.removeEventListener('mouseup', this.handlemouseup, true);
      this.$vpd.commit('stopmove');
    }
  }
};
</script>

<style scoped>
.verti,
.horiz {
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.verti {
  width: 0;
  cursor: ew-resize;
}
.horiz {
  height: 0;
  cursor: ns-resize;
}
.square {
  width: 10px;
  height: 10px;
  border: 1px solid #2196f3;
  background-color: #fff;
  flex-shrink: 0;
}
</style>
