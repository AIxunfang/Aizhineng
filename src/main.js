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
var fundebug = require("fundebug-javascript");//监控用户行为的
fundebug.apikey = "9407f4b0567d5c2077b9ae22022cfe4457fc36b166b7efe7ed358855e5a8b0c3";
fundebug.silentVideo = false;  
function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';
  var name = vm._isVue
      ? (vm.$options && vm.$options.name) ||
        (vm.$options && vm.$options._componentTag)
      : vm.name;
  return (
      (name ? 'component <' + name + '>' : 'anonymous component') +
      (vm._isVue && vm.$options && vm.$options.__file
          ? ' at ' + (vm.$options && vm.$options.__file)
          : '')
  );
}

Vue.config.errorHandler = function(err, vm, info) {
  if (vm) {
      var componentName = formatComponentName(vm);
      var propsData = vm.$options && vm.$options.propsData;
      fundebug.notifyError(err, {
          metaData: {
              componentName: componentName,
              propsData: propsData,
              info: info
          }
      });
  } else {
      fundebug.notifyError(err);
  }
};

router.beforeEach((to, from, next ) => {
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
