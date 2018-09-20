import axios from 'axios'
import qs from 'qs'
//axios.defaults.baseURL = 'http://192.168.98.120:9999/api';
axios.defaults.baseURL = 'http://192.168.80.63:30005/api';
// axios.defaults.baseURL ="http://nedn26.natappfree.cc/api"

// 请求的拦截器
       // 判断请求的类型
       // 如果是post请求就把默认参数拼到data里面
       // 如果是get请求就拼到params里面
axios.interceptors.request.use(function (config) {
       const token = sessionStorage.getItem('token')
    //    const Username = JSON.parse(sessionStorage.getItem("user"));
      if(config.method === 'post') {
            if(config.url==="/training/create/training"){
                let data = config.data
                config.headers={'Content-type':'application/json;charset=UTF-8' };
                // console.log(data)
                config.data ={
                    ...config.data,
                   token: token
                }
                return config;
            }
          let data = qs.parse(config.data)
          config.data = qs.stringify({
              token: token,
              ...data
          })
      
      } else if(config.method === 'get') {
          config.params = {
            // userAccount: Username.name,
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
//权限操作相关删除接口
export const permissiondelete =(parms) =>{
    return axios
    .get('/permission/delete',{params : parms})
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
//获取文件大小
export const getfileSize =(parms) =>{
    return axios
    .get('/project/get/fileSize',{params : parms})
}
//上传文件的时候显示进度
export const projectprocess =(parms) =>{
    return axios
    .get('/project/process',{params:parms})
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
//获取模型分类
export const modeltype =(parms) =>{
    return axios
    .get('/training/model/type',{params : parms})
}
//获取镜像名称
export const findimage =(parms) =>{
    return axios
    .get('/training/find/image',{params : parms})
}
//解析code的值
export const paramanalysis =(parms) =>{
    return axios
    .get('/training/param/analysis',{params : parms})
}
//验证模块名称是否存在
export const checktrainingName =(parms) =>{
    return axios
    .get('/training/check/trainingName',{params : parms})
}


//创建模块数据
export const createtraining =(parms) =>{
    return axios
    .post('/training/create/training', parms,)
}

//启用项目的时候的打印日志
export const findlog =(parms) =>{
    return axios
    .get('/training/find/logs',{params : parms})
}
//训练详情
export const finddetai =(parms) =>{
    return axios
    .get('/training/find/detail',{params : parms})
}


// 模块列表
export const findpage=(parms) =>{
    return axios
    .get('/training/find/page',{params : parms})
}


//创建模块的项目列表
export const findprojects =(parms) =>{
    return axios
    .get('/training/find/projects',{params : parms})
}

//启动训练模块
export const trainingstart =(parms) =>{
    return axios
    .get('/training/start',{params : parms})
}



//上传文件项目 
// export const projectupload =(parms) =>{
//     return axios
//     .post('/project/upload',  parms,{headers: {'Content-Type': 'multipart/form-data'}})
// }
//删除文件,
export const deletefile =(parms) =>{
    return axios
    .get('/project/delete/file',{params : parms})
}
//创建角色
export const roleadd =(parms) =>{
    return axios
    .post('/role/add', parms,)
}
//角色查询
export const rolelist =(parms) =>{
    return axios
    .get('/role/list',{params : parms})
}
//角色删除
export const roledelete =(parms) =>{
    return axios
    .get('/role/delete',{params : parms})
}
//全局资源配置管理-->训练资源配置
export const configget =(parms) =>{
    return axios
    .get('/config/get/1',{params : parms})
}
//修改全局资源配置
export const configupdate =(parms) =>{
    return axios
    .post('/config/update',parms)
}