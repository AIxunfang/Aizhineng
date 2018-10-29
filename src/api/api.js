import axios from 'axios'
import qs from 'qs'
//axios.defaults.baseURL = 'http://192.168.98.120:9999/api';
axios.defaults.baseURL = 'http://192.168.80.63:30005/api';
const getip = sessionStorage.getItem('getip')
// axios.defaults.baseURL ="http://nedn26.natappfree.cc/api"
// 请求的拦截器
       // 判断请求的类型
       // 如果是post请求就把默认参数拼到data里面
       // 如果是get请求就拼到params里面
axios.interceptors.request.use(function (config) {
    
       const token = sessionStorage.getItem('token')
        console.log("=====token=====")
        console.log(token)
      const Username = JSON.parse(sessionStorage.getItem("user"));
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
            };
            if(config.url==="/publish/create/model"){
                let data = config.data
                config.headers={'Content-type':'application/json;charset=UTF-8' };
                // console.log(data)
                config.data ={
                    ...config.data,
                   token: token
                }
                return config;
            };
          let data = qs.parse(config.data)
          config.data = qs.stringify({
              token: token,
              ...data
          })
      
      } else if(config.method === 'get') {
        if(config.url==="/queue/find/page"){
            config.params ={
                  token: token,
                ...config.params,
              
            }
            return config;
        }; 
          config.params = {
               userAccount: Username.name,
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
      .post('/user/login',parms,{"headers":{"ip":getip}})  
}
//左侧菜单栏
var _this=this
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
//训练模型-->删除接口
export const trainingdelete =(parms) =>{
    return axios
    .get('/training/delete',{params : parms})
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
    .get('/config/get',{params : parms})
}
//全局资源配置发布资源管理
// export const configgetpublish =(parms) =>{
//     return axios
//     .get('/config/get',{params : parms})
// }


//修改全局资源配置
export const configupdate =(parms) =>{
    return axios
    .post('/config/update',parms)
}
//模块管理--项目列表
export const publishfindprojects =(parms) =>{
    return axios
    .get('/publish/find/projects',{params : parms})
}
//模块管理-->模型列表
export const publishfindprojectstraining =(parms) =>{
    return axios
    .get('/publish/find/project/training',{params : parms})
}
//模块发布
export const publishcreatemodel =(parms) =>{
    return axios
    .post('/publish/create/model', parms)
}
//模块管理--->发布列表
export const publishfindpage =(parms) =>{
    return axios
    .get('/publish/find/page',{params : parms})
}
//模块详情
export const publishfinddetail=(parms) =>{
    return axios
    .get('/publish/find/detail',{params : parms})
}
//模块发布接口
export const publishstart=(parms) =>{
    return axios
    .get('/publish/start',{params : parms})
}
//资源审批.-->训练列表
export const approvegetproject=(parms) =>{
    return axios
    .get('/approve/get/project',{params : parms})
}
//资源审批-->发布列表
export const approvegetpublish=(parms) =>{
    return axios
    .get('/approve/get/publish',{params : parms})
}
//资源审批-->提交
export const approveadd =(parms) =>{
    return axios
    .post('/approve/add', parms)
}
//资源申请的__>个人列表
export const approvegethistory=(parms) =>{
    return axios
    .get('/approve/get',{params : parms})
}
//管理员的(列表展示)
export const approvelist=(parms) =>{
    return axios
    .get('/approve/list',{params : parms})
}
//-->发布管理-->发布图片集合列表
export const publishimglist=(parms) =>{
    return axios
    .get('/publish/img/list',{params : parms})
}
//发布管理--检测
export const publishtestapi =(parms) =>{
    return axios
    .post('/publish/test/api', parms,)
}
//项目分享创建
export const projectShareadd =(parms) =>{
    return axios
    .post('/projectShare/add', parms,)
}
//项目分享.用户分享列表
export const projectSharelist=(parms) =>{
    return axios
    .get('/projectShare/list',{params : parms})
}
//项目分享删除
export const projectSharedelete=(parms) =>{
    return axios
    .post('/projectShare/delete',parms)
}
//项目分享--开关按钮
export const projectSharupdate =(parms) =>{
    return axios
    .post('/projectShare/update', parms,)
}
//项目分享公共资源
export const projectSharefinduserName=(parms) =>{
    return axios
    .get('/projectShare/find/userName',{params : parms})
}
//发布模型-->删除接口
export const publishdelete=(parms) =>{
    return axios
    .get('/publish/delete',{params : parms})
}
//管理员修改状态
export const approveupdata =(parms) =>{
    return axios
    .post('/approve/update', parms,)
}
//用户修改审批
export const approveupdataapprove =(parms) =>{
    return axios
    .post('/approve/update/approve', parms,)
}
//队列管理接口
export const queuefindpage=(parms) =>{
    return axios
    .get('/queue/find/page',{params : parms})
}
//队列管理删除
export const deletequeue=(parms) =>{
    return axios
    .get('/queue/delete/queue',{params : parms})
}
//队列优先级设置
export const queueupdateorder=(parms) =>{
    return axios
    .get('/queue/update/order',{params : parms})
}
//管理员新增用户
export const userAdd =(parms) =>{
    return axios
    .post('/user/add', parms,)
}
//用户编辑
export const updateaccountedit =(parms) =>{
    return axios
    .post('/user/update/account', parms,)
}


//用户列表
export const userlistpage =(parms) =>{
    return axios
    .get('/user/list/page',{params : parms})
}
//用户删除
export const deleteuid =(parms) =>{
    return axios
    .get('/user/delete/uid',{params : parms})
}
//验证是否存在登录用户
export const usercheck =(parms) =>{
    return axios
    .get('/user/check',{params : parms})
}
//系统日志接口
export const logList =(parms) =>{
    return axios
    .get('/log/list',{params : parms})
}
//角色权限查询
export const findpermissions =(parms) =>{
    return axios
    .get('/role/find/permissions',{params : parms})
}
//权限-->角色分配菜单
export const permissionlistsort =(parms) =>{
    return axios
    .get('/permission/list/sort',{params : parms})
}
//资源监控接口
export const findresource =(parms) =>{
    return axios
    .get('/monitor/find/resource',{params : parms})
}
//资源分页接口
export const monitorfindpage =(parms) =>{
    return axios
    .get('/monitor/find/page',{params : parms})
}
//个人用户查询
export const user_fing_account =(parms) =>{
    return axios
    .get('/user/find/account',{params : parms})
}
//更改管理员权限
export const updatepermission =(parms) =>{
    return axios
    .post('/role/update/permission', parms,)
}
//课程资源接口
export const courseaddcourse =(parms) =>{
    return axios
    .post('/course/add/course', parms,)
}
//课程体系分页查询
export const courseStructurepage =(parms) =>{
    return axios
    .get('/course/courseStructure/page',{params : parms})
}
//查询体系下面的分类
export const courseClassificationpage =(parms) =>{
    return axios
    .get('/course/courseClassification/page',{params : parms})
}
//查询课程内容
export const courseContentpage =(parms) =>{
    return axios
    .get('/course/courseContent/page',{params : parms})
}
//上传视频资源
export const addvideoResource =(parms) =>{
    return axios
    .post('/course/add/videoResource', parms,)
}
