import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/pages/Login/Login'
import AddProject from '@/pages/ProiectManagement/AddProject'//项目管理-->添加项目
import Uploadpage from '@/pages/ProiectManagement/Uploadpage' //项目管理-->项目列表
import editproject from '@/pages/ProiectManagement/editproject'//项目管理-->项目编辑
import projectdetail from '@/pages/ProiectManagement/projectdetail'//项目管理-->项目详情
import  Codeupload from '@/pages/ProiectManagement/Codeupload' //项目-上传
import Firstpage from '@/pages/Homepage/Firstpage'  //首页
import  Managefristpage from '@/pages/Homepage/Managefristpage'//管理员首页
import  HdfsManagement from '@/pages/CommonData/HdfsManagement'//公共数据管理-->HDfs管理
import  FileManagement from '@/pages/CommonData/FileManagement'//文件管理
import DrillList from '@/pages/Trainmanagement/DrillList' //训练管理 -->训练列表
import Trainstart from '@/pages/Trainmanagement/Trainstart'//训练管理训练页面
import NewDrill from '@/pages/Trainmanagement/NewDrill'//训练管理-->新建训练
import Addmodel from '@/pages/ModelManagement/Addmodel'//模块管理-->新建模块
import Modelform from '@/pages/ModelManagement/Modelform'//模块管理-->模块列表
import ModelformDetail from '@/pages/ModelManagement/ModelformDetail'//模块管理-->模块详情
import NewShare from '@/pages/ProjectShare/NewShare'//项目分享--->新建项目
import ShareList from '@/pages/ProjectShare/ShareList'//项目分享--->项目列表
import Userinfo from '@/pages/PersonalCenter/Userinfo'//个人中心--用户资料\
import Announcement from '@/pages/PersonalCenter/Announcement' //个人中心--通知管理
import LogManagement from '@/pages/PersonalCenter/LogManagement' //个人中心--日志管理
import FormationDrill from '@/pages/Modeldispatch/FormationDrill'//模块调度管理-调度列表
import Releasequeue from '@/pages/Modeldispatch/Releasequeue'//模块调度管理-发布队列
import MenuManagement from '@/pages/PowerManagement/MenuManagement'//权限管理-->菜单管理
import CharacterManagement from '@/pages/PowerManagement/CharacterManagement'//权限管理-->角色管理
import UserControl from '@/pages/PowerManagement/UserControl'//权限管理-->用户管理
import ComShareList from '@/pages/ProjectSharingManagement/ComShareList'//管理员项目分享管理-->分享列表
import DocumentApproval from '@/pages/ProjectSharingManagement/DocumentApproval'//管理员项目分享管理-->审批管理
import SharedHistory from '@/pages/ProjectSharingManagement/SharedHistory'//管理员项目分享管理-->分享历史
import WholePublish from '@/pages/GlobalParameter/WholePublish' //全局参数管理-->发布资源配置
import WholeDrillRouceAllcation from '@/pages/GlobalParameter/WholeDrillRouceAllcation' //全局参数管理-->训练资源配置
import ModelCategorySettings from '@/pages/GlobalParameter/ModelCategorySettings' //全局参数管理-->模块类别配置
import DispatchingList from '@/pages/DispatchingManagement/DispatchingList'//调度管理-->调度列表
import ApplyRouceList from '@/pages/ResoureApprovingManagement/ApplyRouceList' //资源审批管理--> 申请列表
import HositryRouceList from '@/pages/ResoureApprovingManagement/HositryRouceList' //资源审批管理--> 历史列表
import trainingResourceApply from '@/pages/ResourceApplication/trainingResourceApply' //资源审批-->训练申请
import publishResourceApply from '@/pages/ResourceApplication/publishResourceApply' //资源审批-->发布申请
import trainingResourceApplyedit from '@/pages/ResourceApplication/trainingResourceApplyedit' //资源审批-->训练编辑申请
import publishResourceApplyedit from '@/pages/ResourceApplication/publishResourceApplyedit' //资源审批-->发布编辑申请i
import CourseStructure from "@/pages/CourseResoureces/CourseStructure"//课程体系
import CourseClassification from "@/pages/CourseResoureces/CourseClassification"//课程分类
import CourseContent from "@/pages/CourseResoureces/CourseContent"//课程内容
import VideoResource from "@/pages/CourseResoureces/VideoResource"//课程视频
import CourseMaterial from "@/pages/CourseResoureces/CourseMaterial"//课程资料
import classifycourse from "@/pages/Homepage/classifycourse" //课程分类
import chunkcou from "@/pages/Homepage/chunkcou"//课程模块
import videoclass from "@/pages/Homepage/videoclass"//课程视频
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
         
        { path: 'AddProject', name: 'AddProject', component: AddProject },
        {path:'/editproject/:id',name:'editproject',component:editproject},
        { path: 'Uploadpage', name: 'Uploadpage', component: Uploadpage },
        { path: 'Firstpage', name: ' Firstpage', component: Firstpage },
        {path:'Managefristpage',name:'Managefristpage',component:Managefristpage},
        { path: '/HdfsManagement/:id', name: 'HdfsManagement', component: HdfsManagement,
        meta: {
           keepAlive: true // 需要被缓存
         }
        },
        { path:'/FileManagement/:id',name:'FileManagement',component:FileManagement,
        meta: {
          keepAlive: true // 需要被缓存
         }
         },
        { path: 'DrillList', name: 'DrillList', component: DrillList},
        { path: 'NewDrill', name: 'NewDrill', component: NewDrill},  
        { path: 'Addmodel', name: 'Addmodel', component: Addmodel}, 
        { path: 'Modelform', name: 'Modelform', component: Modelform},   
        { path: 'NewShare', name: 'NewShare', component: NewShare},  
        { path: 'ShareList', name: 'ShareList', component: ShareList},  
        { path: 'Userinfo', name: 'Userinfo', component: Userinfo},  
        { path: 'Announcement', name: 'Announcement', component: Announcement},  
        { path: 'LogManagement', name: 'LogManagement', component: LogManagement},  
        { path: 'FormationDrill', name: 'FormationDrill', component: FormationDrill},  
        { path: 'Releasequeue', name: 'Releasequeue', component: Releasequeue},  
        { path: 'MenuManagement', name: 'MenuManagement', component: MenuManagement},   
        { path: 'CharacterManagement', name: 'CharacterManagement', component: CharacterManagement},  
        { path: 'UserControl', name: 'UserControl', component: UserControl}, 
        { path: 'ComShareList', name: 'ComShareList', component: ComShareList}, 
        { path: 'DocumentApproval', name: 'DocumentApproval', component: DocumentApproval}, 
        { path: 'SharedHistory', name: 'SharedHistory', component: SharedHistory}, 
        { path: 'WholePublish', name: 'WholePublish', component: WholePublish}, 
        { path: 'WholeDrillRouceAllcation', name: 'WholeDrillRouceAllcation', component: WholeDrillRouceAllcation}, 
        { path: 'ModelCategorySettings', name: 'ModelCategorySettings', component: ModelCategorySettings}, 
        { path: 'ApplyRouceList', name: 'ApplyRouceList', component: ApplyRouceList}, 
        { path: 'HositryRouceList', name: 'HositryRouceList', component: HositryRouceList}, 
        {path:'projectdetail' ,name:"projectdetail", component:projectdetail},
        {path:'/Trainstart/:id/:type' ,name:"Trainstart", component:Trainstart},
        {path:"/ModelformDetail/:id/:projectId/:isshare",name:"ModelformDetail",component:ModelformDetail},
        {path:'trainingResourceApply',name:"trainingResourceApply",component:trainingResourceApply},
        {path:"publishResourceApply",name:'publishResourceApply',component:publishResourceApply},
        {path:'/trainingResourceApplyedit/:id/:cpu/:gpu/:memory',name:"trainingResourceApplyedit",component:trainingResourceApplyedit},
        {path:"/publishResourceApplyedit/:id/:cpu/:gpu/:memory",name:'publishResourceApplyedit',component:publishResourceApplyedit},
        {path:'DispatchingList',name:"DispatchingList",component:DispatchingList},
        {path:'/CourseStructure/:isadd',name:"CourseStructure",component:CourseStructure},
        {path:'CourseClassification',name:"CourseClassification",component:CourseClassification},
        {path:"CourseContent",name:"CourseContent",component:CourseContent},
        {path:"VideoResource",name:"VideoResource",component:VideoResource},
        {path:'CourseMaterial',name:"CourseMaterial",component:CourseMaterial},
        {path:"/classifycourse/:id",name:"classifycourse",component:classifycourse},
        {path:"/chunkcou/:id",name:"chunkcou",component:chunkcou},
        {path:'/videoclass/:videoid/:CourseDesc',name:"videoclass",component:videoclass},
        {path:'Codeupload' ,name:"Codeupload", component:Codeupload,
       },
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
       path:"/",
       redirect:'/Login',//访问时候,使用重定向redirect,默认跳转到首页,
       component: Login
    }
  ]
})
