import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import routers from './routers'
Vue.use(Router)
const router = new Router({
  routers
})
export default router