import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/pages/Login/Login'
import AddProject from '@/pages/ProiectManagement/AddProject'//项目管理-->添加项目
import Uploadpage from '@/pages/ProiectManagement/Uploadpage' //项目管理-->项目列表
import Firstpage from '@/pages/Homepage/Firstpage'  //首页
import  HdfsManagement from '@/pages/CommonData/HdfsManagement'//公共数据管理-->HDfs管理
import DrillList from '@/pages/ModelManagement/DrillList' //模型管理 -->训练列表
import NewDrill from '@/pages/ModelManagement/NewDrill'//模型管理-->新建训练
import DrillResourceManagement from '@/pages/ResourceManagement/DrillResourceManagement'//资源管理--->训练资源管理
import PublishResourceManagement from '@/pages/ResourceManagement/PublishResourceManagement'//资源管理--->发布资源管理
import NewShare from '@/pages/ProjectShare/NewShare'//项目分享--->新建项目
import ShareList from '@/pages/ProjectShare/ShareList'//项目分享--->项目列表
import Userinfo from '@/pages/PersonalCenter/Userinfo'//个人中心--用户资料\
import NoticeManagement from '@/pages/PersonalCenter/NoticeManagement' //个人中心--通知管理
import LogManagement from '@/pages/PersonalCenter/LogManagement' //个人中心--日志管理
import FormationDrill from '@/pages/Modeldispatch/FormationDrill'//模块调度管理-训练队列
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
import ApplyRouceList from '@/pages/ResoureApprovingManagement/ApplyRouceList' //资源审批管理--> 申请列表
import HositryRouceList from '@/pages/ResoureApprovingManagement/HositryRouceList' //资源审批管理--> 历史列表

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: 'AddProject', name: 'AddProject', component: AddProject },
        { path: 'Uploadpage', name: 'Uploadpage', component: Uploadpage },
        { path: 'Firstpage', name: ' Firstpage', component: Firstpage },
        { path: 'HdfsManagement', name: 'HdfsManagement', component: HdfsManagement},
        { path: 'DrillList', name: 'DrillList', component: DrillList},
        { path: 'NewDrill', name: 'NewDrill', component: NewDrill},  
        { path: 'DrillResourceManagement', name: 'DrillResourceManagement', component: DrillResourceManagement},  
        { path: 'PublishResourceManagement', name: 'PublishResourceManagement', component: PublishResourceManagement},  
        { path: 'NewShare', name: 'NewShare', component: NewShare},  
        { path: 'ShareList', name: 'ShareList', component: ShareList},  
        { path: 'Userinfo', name: 'Userinfo', component: Userinfo},  
        { path: 'NoticeManagement', name: 'NoticeManagement', component: NoticeManagement},  
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
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
