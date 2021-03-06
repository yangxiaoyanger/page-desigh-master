const generate = require('nanoid/generate')
import echarts from "echarts";

export default {
  // 选中元件与取消选中
  select(state, payload) {
    state.uuid = payload.uuid
    if (payload.uuid === -1) {
      state.activeElement = state.page
      state.type = 'page'
    } else {
      let widget = state.widgets.find(w => w.uuid === payload.uuid)
      state.activeElement = widget
      state.type = widget.type
    }
  },

  // 设置 mousemove 操作的初始值
  initmove(state, payload) {
    state.startX = payload.startX
    state.startY = payload.startY
    state.originX = payload.originX
    state.originY = payload.originY
    state.originOffsetX = payload.originOffsetX
    state.originOffsetY = payload.originOffsetY
    state.moving = true
  },

  // 元件移动结束
  stopmove(state) {
    state.moving = false
  },

  // 移动元件
  move(state, payload) {
    var target = state.activeElement
    var dx = payload.x - state.startX
    var dy = payload.y - state.startY
    var left = state.originX + Math.floor(dx * 100 / state.zoom)
    var top = state.originY + Math.floor(dy * 100 / state.zoom)
    var offsetLeft = state.originOffsetX + Math.floor(dx * 100 / state.zoom)
    var offsetTop = state.originOffsetY + Math.floor(dy * 100 / state.zoom)

    target.left = left > 0 ? left : 0
    target.top = top > 0 ? top : 0
    target.offsetTop = offsetTop > 0 ? offsetTop : 0
    target.offsetLeft = offsetLeft > 0 ? offsetLeft : 0

  },

  // 调整元件尺寸
  resize(state, payload) {
    var dx = payload.x - state.startX
    var dy = payload.y - state.startY
    var value
    // 如果是echarts插件就要重绘
    if (state.activeElement.isEcharts) {
      let dom = echarts.getInstanceByDom(document.querySelector('#viewport .g-active'))
      dom.resize()
    }

    if (payload.type === 'right') {
      value = state.originX + Math.floor(dx * 100 / state.zoom)
      state.activeElement.width = value > 10 ? value : 10
      return
    }

    if (payload.type === 'down') {
      value = state.originX + Math.floor(dy * 100 / state.zoom)
      state.activeElement.height = value > 10 ? value : 10
      return
    }

    if (payload.type === 'left') {
      var left = state.originX + Math.floor(dx * 100 / state.zoom)
      var width = state.originY - Math.floor(dx * 100 / state.zoom)
      state.activeElement.left = left > 0 ? left : 0
      state.activeElement.offsetLeft = left > 0 ? left : 0
      state.activeElement.width = width > 10 ? width : 10
      return
    }

    if (payload.type === 'up') {
      var top = state.originX + Math.floor(dy * 100 / state.zoom)
      var height = state.originY - Math.floor(dy * 100 / state.zoom)
      state.activeElement.top = top > 0 ? top : 0
      state.activeElement.offsetTop = top > 0 ? top : 0
      state.activeElement.height = height > 10 ? height : 10
    }
  },

  // 复制元件
  copy(state, payload) {
    if (state.type !== 'page') {
      var copy = Object.assign({}, state.activeElement, {
        top: state.top,
        uuid: state.activeElement + generate('1234567890abcdef', 10)
      })

      // 由于容器的名称必须是唯一的，故复制容器需作处理
      if (state.activeElement.isContainer) {
        var name = state.activeElement.name
        if (name) {
          // 设置容器副本的名称
          var copyName = name.split('-')[0] + '-' + state.counter
          copy.name = copyName

          // 复制容器内的图片和文本
          for (var i = 0, len = state.widgets.length; i < len; i++) {
            if (state.widgets[i].belong === name) {
              state.widgets.push(
                Object.assign({}, state.widgets[i], {
                  belong: copyName
                })
              )
            }
          }

          state.counter += 1
        }
      }

      state.widgets.push(copy)
    }
  },

  // 更新元件初始 top 值
  updateSrollTop(state, top) {
    state.top = top
  },
  updateWidgets(state, widgets) {
    let result = []
    if (!Array.isArray(widgets)) {
      widgets = [widgets]
    }
    widgets.forEach(widget => {
      // 更新的组件的位置会因为belong的改变而发生变化
      widget.belong = widget.belong == null ? 'page' : widget.belong
      if (widget.belong == 'page') {
        widget.offsetLeft = widget.left;
        widget.offsetTop = widget.top;
      } else {
        var parentWidget = state.widgets.filter(item => {
          return item.uuid == widget.belong;
        })
        widget.offsetLeft = parentWidget[0].offsetLeft + widget.left;
        widget.offsetTop = parentWidget[0].offsetTop + widget.top;
      }
      // 循环现有的widgets
      state.widgets.forEach(stateItem => {
        if (stateItem.uuid == widget.uuid) {
          result.push(widget)
          if (state.activeElement.uuid == widget.uuid) {
            state.activeElement = widget
          }
          // 如果是当前的焦点元素就更新下
          if (state.activeElement.uuid == widget.uuid) {
            state.activeElement = widget
          }
        } else {
          result.push(stateItem)
        }
      })
    })
    state.widgets = result;
  },
  // 页面缩放
  zoom(state, val) {
    state.zoom = val
  },

  // 初始化选中对象
  initActive(state) {
    state.activeElement = state.page
  },
  preview(state, val) {
    state.previewstatus = val
  },

  // 删除选中元件
  delete(state) {
    var type = state.type
    if (type === 'page') return

    // 如果删除的是容器，须将内部元件一并删除
    if (state.activeElement.isContainer) {
      var name = state.activeElement.name

      for (var i = 0; i < state.widgets.length; i++) {
        if (state.widgets[i].belong === name) {
          state.widgets.splice(i, 1)
        }
      }
    }

    // 删除元件
    state.widgets.splice(state.index, 1)

    // 重置 activeElement
    state.activeElement = state.page
    // state.type = 'page'
    state.uuid = -1
  },

  // 添加组件
  addWidget(state, {
    data: data = null,
    item
  }) {
    let def = {
      // top: state.top,
      uuid: item.setting.name + generate('1234567890abcdef', 10)
    }
    let setting = JSON.parse(JSON.stringify(item.setting))

    if (setting.isContainer) {
      setting.name = def.uuid
    }
    if (data) {
      data.forEach(function (val) {
        state.widgets.push(Object.assign(setting, val, def))
      })
    } else {
      state.widgets.push(Object.assign(setting, def))
    }
  },

  refreshChildrenWidget(state, {
    widgets
  }) {
    if (widgets.length > 0 && widgets[0].setting.belong != 'page') {
      state.widgets = state.widgets.filter(item => { return item.belong != widgets[0].setting.belong })
      widgets.forEach(item => {
        let def = {
          top: state.top,
          uuid: item.setting.name + generate('1234567890abcdef', 10)
        }
        let setting = JSON.parse(JSON.stringify(item.setting))

        if (setting.isContainer) {
          setting.name = def.uuid
        }
        console.log(item, 'refreshChildrenWidget')
        state.widgets.push(Object.assign(setting, def))
      })
    }
  },
  // 替换图片
  replaceImage(state, payload) {
    state.activeElement.width = payload[0].width
    state.activeElement.url = payload[0].url
  },

  // 添加容器背景图
  addContainerBackPic(state, payload) {
    state.activeElement.backPic = payload[0].url
    state.activeElement.backPicUrl = payload[0].src
    state.activeElement.width = payload[0].width
    state.activeElement.height = payload[0].height
  },

  // 添加背景图
  addBackPic(state, payload) {
    state.activeElement.backPic = payload[0].url
    state.activeElement.backPicUrl = payload[0].src
  },

  // 添加动画
  addAnimation(state) {
    state.animation.push({
      name: '',
      duration: 3,
      delay: 0,
      iteration: 1,
      timing: 'linear',
      direction: 'normal',
      fill: 'none',
      keyframes: [{
        stop: 0,
        css: ''
      }]
    })
  },

  // 为动画添加 keyframe
  addkeyframe(state, name) {
    state.animation.map(val => {
      if (val.name === name) {
        val.keyframes.push({
          stop: 0,
          css: ''
        })
      }
    })
  },

  // 动画的播放与停止
  setAnimation(state, status) {
    state.playState = status
  },

  // 更新数据
  updateData(state, {
    uuid,
    key,
    value
  }) {
    let widget = state.widgets.find(w => w.uuid === uuid)
    widget[key] = value
  }
}
