// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'
import timeago from 'timeago.js'
import Vuex from 'vuex'
import ZkTable from 'vue-table-with-tree-grid'
import uploader from 'vue-simple-uploader'


// import './components/changeTheme/theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import 'font-awesome/css/font-awesome.css';
 import './assets/css/common.scss'
 import store from '@/store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(timeago)//时间转化的格式
Vue.use(Vuex)
Vue.use(ZkTable)//树状表格
Vue.use(uploader)//vue 上传


router.beforeEach((to, from, next ) => {
    const status=sessionStorage.getItem('progresstype')
    console.log(status)
    if( status=='success' ){
        if(to.path == '/Codeupload' ){
              to.meta.keepAlive=false
        }else{
            
        }
    }
  if(to.path == '/Login') {
     sessionStorage.removeItem('user')
  }
  let user = JSON.stringify(sessionStorage.getItem('user'))
  if(user == 'null' && to.path != '/Login') {
    next({path: '/Login'})
  } else {
    next()
  }
})
window.app =  new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
