// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import vueBeauty from 'vue-beauty'
import ZkTable from 'vue-table-with-tree-grid'
// import './components/changeTheme/theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import 'font-awesome/css/font-awesome.css';
import 'vue-beauty/package/style/vue-beauty.min.css' //vue-beauty 的css样式,做权限管理树状表格
import './assets/css/common.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(vueBeauty)//不支持ie浏览器.所以没用
Vue.use(ZkTable)//树状表格

/* eslint-disable no-new */

router.beforeEach((to, from, next ) => {
  console.log(to)
  if(to.path == '/Login') {
     sessionStorage.removeItem('user')
  }
  let user = JSON.stringify(sessionStorage.getItem('user'))
  console.log(user == 'null')
  if(user == 'null' && to.path != '/Login') {
    next({path: '/Login'})
  } else {
    next()
  }
})
window.app =  new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
