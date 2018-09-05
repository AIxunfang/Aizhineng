import axios from 'axios'
import qs from 'qs'
//axios.defaults.baseURL = 'http://192.168.98.120:9999/api';
axios.defaults.baseURL = 'http://192.168.80.63:10005/api';
// axios.defaults.baseURL ="http://nedn26.natappfree.cc/api"

// 请求的拦截器
axios.interceptors.request.use(function (config) {
      const token = sessionStorage.getItem('token')
       // 判断请求的类型
       // 如果是post请求就把默认参数拼到data里面
       // 如果是get请求就拼到params里面
            console.log("获取tocken")
             console.log(token)
      if(config.method === 'post') {
          let data = qs.parse(config.data)
          config.data = qs.stringify({
              token: token,
              ...data
          })
      } else if(config.method === 'get') {
          config.params = {
              token: token,
              ...config.params
          }
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    })
//登陆首页
export const userlogin =(parms) =>{
      return  axios
      .post('/user/login',parms)  
}
//左侧菜单栏
export const menulist =(parms) =>{
       return axios
       .get('user/permissions/account',{params : parms})
}
//创建项目
export const projectadd =(parms) =>{
      return axios
      .post('/project/add', parms)
}
//项目列表
export const projectlist =(parms) =>{
    return axios
    .get('/project/list',{params : parms})
}
//项目删除接口
export const deleteprojectId =(parms) =>{
    return axios
    .get('/project/delete/projectId',{params : parms})
}
//项目编辑接口
export const editproject =(parms) =>{
    return axios
    .post('/project/update', parms)
}
//权限管理菜单管理增加
export const permissionlistfirst =(parms) =>{
    return axios
    .get('/permission/list/first',{params : parms})
}
//获取目录结构,
export const dirsAndFiles =(parms) =>{
    return axios
    .get('/training/structure/dirsAndFiles',{params : parms})
}
