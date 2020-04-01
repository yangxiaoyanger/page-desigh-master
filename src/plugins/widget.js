// 默认 widgets
import defaultWidgets from 'vue-page-designer-widgets'
import vpd from '../mixins/vpd'

var widgets
var widgetStyle = {}

const install = (Vue, config = {}) => {
  if (install.installed) return

  widgets = Object.assign({}, defaultWidgets, config.widgets)
  console.log(widgets, 'widgets', 655555)
  Object.keys(widgets).forEach(key => {
    Vue.component(key, widgets[key])
    Vue.component(key, Vue.extend(widgets[key]).extend(vpd))
    // style panel
    if (widgets[key]['panel']) {
      let panel = Object.assign({}, widgets[key]['panel'], {
        type: key
      })
      Vue.component(panel.name, Vue.extend(panel).extend(vpd))
      widgetStyle[panel.name] = panel
      // remove panel from object
      delete widgets[key]['panel']
    }
  })
}

export default {
  install,
  getWidgets(type = 'braid') {
    let result = []
    Object.keys(widgets).forEach(key => {
      if (key.indexOf(type) >= 0) {
        result.push(widgets[key])
      }
    })
    return result
  },
  getWidgetStyle() {
    return widgetStyle
  }
}
