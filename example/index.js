import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import vuePageDesigner from '../src'
import 'view-design/dist/styles/iview.css';
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// import routers from './router/routers.js'
import Router from 'vue-router'
import Preview from './view/preview.vue'
import Edit from './view/edit.vue'

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', component: Edit },
  { path: '/preview', component: Preview }
]
const router = new Router({
  routes
})

Vue.use(vuePageDesigner)
Vue.use(ViewUI)
Vue.use(VueCodemirror)
Vue.use(Router)

new Vue({ // eslint-disable-line no-new
  // el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
