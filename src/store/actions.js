export default {
  addWidget({ state, commit, store }, item) {
    console.log('commit addwidget', state.widgets, 8777)
    if (item.setting.isUpload) {
      store.$emit('upload', (payload) => {
        console.log('payload', payload, item)
        commit('addWidget', { data: payload, item })
      }, true)
    } else {
      commit('addWidget', { item })
      // 设置选中
      commit('select', {
        uuid: state.widgets[state.widgets.length - 1].uuid
      })
    }
  },
  save({ state, store }) {
    store.$emit('save', state)
  },
  refreshChildrenWidget({ state, commit, store }, widgets) {
    commit('refreshChildrenWidget', { widgets })
  },
  updateWidgets({ state, commit, store }, widgets) {
    commit('updateWidgets', widgets)
  }
}
