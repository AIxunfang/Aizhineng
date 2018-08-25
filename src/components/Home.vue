<template>
<el-container>
            <el-aside :width="adisewidth">
                <el-menu
                      :collapse="isCollapse"
                      :default-active='$route.path' 
                      active-text-color="#f18f17"
                      text-color='#758c97'
                      :unique-opened="true" 
                      router>
                  <div class="collapseicon"><span  class="logoname"  v-show="this.isCollapse==false" > 讯方AI云平台</span></div>
                   <!-- <el-menu-item index='/Firstpage'>
                        <span>首页</span>  
                    </el-menu-item>  
                    <el-submenu index='1'>
                        <template slot='title'>
                            <span>项目管理</span>
                        </template>
                        <el-menu-item index='/AddProject'>
                            添加项目
                        </el-menu-item>
                        <el-menu-item index='/Uploadpage'>
                            项目列表
                        </el-menu-item>
                    </el-submenu> -->
                    <template v-for=" (item,index) in routerurl">
                      <el-menu-item :key="item[0].routeUrl" :index='item[0].routeUrl' v-if="item[0].secondPermissionList.length==0" >
                            <template slot='title'>
                                <span>{{item[0].permissionName}}</span>
                            </template>
                        </el-menu-item>
                            <el-submenu  :key="item.id"  :index='String(index)'   v-if="item[0].secondPermissionList.length !==0" >
                             <template slot='title'>
                                <span >{{item[0].permissionName}}</span>
                            </template>
                            <el-menu-item :key="item.id"  :index='item.routeUrl' v-for="item in item[0].secondPermissionList">
                                   {{item.permissionName}}
                            </el-menu-item>
                        </el-submenu> 
                    </template>
                </el-menu>
            </el-aside>
    <el-container>
        <el-header  >
                <i  class="fa fa-outdent"  aria-hidden="true"  @click="foldmenu" ></i>
                  <div class='Exitoutfather'>
                      <!-- <el-button  size="mini"  class="Exitoutchidren"     > 退出</el-button>   -->
                        <span class="UserName">{{Username.name}}</span>
                        <el-dropdown  @command="handleCommand"  trigger="click">   
                          <span class="el-dropdown-link">
                           <i class="fa fa-user-circle fa-2x Exitoutchidren" aria-hidden="true"  ></i> 
                          </span>
                            <el-dropdown-menu slot="dropdown">  
                                <el-dropdown-item command="个人信息"><i class="fa fa-user-o dropmessage" aria-hidden="true"></i>个人信息</el-dropdown-item>
                                <el-dropdown-item command="退出登录" divided><i class="fa fa-power-off dropmessage" aria-hidden="true"></i>退出登录</el-dropdown-item>   
                            </el-dropdown-menu>
                        </el-dropdown>
                  </div>
        </el-header>
        <el-main>
            <router-view></router-view>
            <el-dialog 
               title="个人信息"
               :visible.sync="dialogmessage"
                width="30%">
                  <el-form :model="formInline" :rules="passwordrules"  ref="passwordrules"    class="demo-form-inline" label-width="100px">
                    <el-form-item label="用户名">
                        <el-input  v-model="formInline.UserName" :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item  label="原始密码"  prop="oldpassword">
                          <el-input   v-model="formInline.oldpassword"  type="password"  placeholder="6~20位非空白字符"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码"    prop="newpassword">
                           <el-input   v-model="formInline.newpassword" placeholder="6~20位非空白字符" ></el-input>
                    </el-form-item>

                </el-form>
                   <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogmessage = false" size="mini">取 消</el-button>
                        <el-button type="primary" size="mini" @click="Submitpassword"  >确 定</el-button>
                    </span>
            </el-dialog>
        </el-main>
    </el-container>
</el-container>
</template>
<script>

//import ChangeTheme from '@/components/changeTheme/changeTheme'
 import {menulist} from '@/api/api'
export default {
    data () {
        return {
             isCollapse:false,
             adisewidth:'200px',
             Username:"",//显示的用户名\
             dialogmessage:false,//个人信息修改弹框
             tocken:null,
             formInline:{
                  UserName:"",
                  oldpassword:"",
                  newpassword:"",
             },
             passwordrules:{
                      oldpassword:[
                             {required: true, message: '请输入原始密码', trigger: 'blur'}
                      ],
                      newpassword:[
                          {required: true, message: '请输入新密码', trigger: 'blur'},
                          { min: 6, max: 20, message: '密码最短6位最长20位', trigger: 'blur' },
                          { pattern:/^[a-zA-Z0-9_]{0,}$/,message:"不能输入中文"}

                      ]

             },
             routerurl:{}//跳转路由的数组
        }
    },
   // components: { ChangeTheme }
   methods:{
         //折叠菜单
         foldmenu(){
               if(this.isCollapse==false){
                    this.isCollapse=true
                    this.adisewidth="65px"
               }else{
                   this.isCollapse=false
                   console.log("2222")
                   this.adisewidth="200px"
               }
         },
       handleCommand(command) {
           if(command=="退出登录"){
                this.$router.push('/Login')
           } else if(command=="个人信息"){
                   this.formInline.UserName=this.Username.name
                   this.dialogmessage=true;
           }
      },
     Submitpassword(){//提交密码
              this.$resf['passwordrules'].validate((valid) =>{
                    if(valid){
                           
                    }
              })

       },
       getmenulist(){
              var parms={
                    userAccount:this.Username.name,
                    token: this.tocken
              }
               menulist(parms).then(res=>{
                        if(res.data.code==0){
                            console.log("菜单栏")
                             console.log(res)
                             this.routerurl= res.data.data
                             console.log(this.routerurl)  
                        }

               })
               
               
       },
   },
   mounted(){
          this.Username = JSON.parse(sessionStorage.getItem("user"));
          console.log("用户名")
          console.log( this.Username)
          this.tocken = sessionStorage.getItem('token')
          console.log("tocken")
          console.log(this.tocken)
          this.getmenulist()
   }
}
</script>
<style lang="scss" scoped>
.el-container {
    height: 100%;
    .el-header {
        background:url(../assets/img/headback.png);
        color: #333;
        height: 60px;
        line-height: 60px;
              i{
                    color: #fff;
                    cursor: pointer;
                }
         .Exitoutchidren{
             
                float:right;
                margin-top: 18px;
                position: relative;
                margin-right: 15px;

           } 
           .UserName{
                    line-height: 28px;        
                    height: 28px;
                    float:right;
                    top: 25%;
                    position: relative;  
                    display: inline-block;
                    color: #fff;
                    font-family: Microsoft YaHei ! important; 
                    font-size: 16px; 
                  }
   .Exitoutfather{
            float: right;
            height: 60px;
            line-height: 60px;
         }
          .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
    .el-aside {
            height: 100%;
        	background: #3c3c3c;
            color: #fff;
            font-family: "Microsoft YaHei", "Arial Narrow", sans-serif;
        .el-menu {
                height: 100%;
                // //background-color: #232424;
                background: #021f31;
                border: none;
                
            .el-submenu {
				//	border-bottom: 1px solid #3c3c3c;
					.el-menu-item {
                         background-color: #353535;
                         font-family: "Microsoft YaHei", "Arial Narrow", sans-serif;
                        
					}
				}
				.el-menu-item.is-active {
					background:#1d2e35;
                }
               .el-submenu :hover{
                	background:#035c86;
               }  

            .collapseicon{
                height: 60px;
                text-align: center;
                //  background:url(../assets/img/headback.png);
                 background: #1b2c3e;
                 border: 1px solid #3c3c3c;
                .logoname{
                    display:inline-block;
                    height:60px; 
                    line-height:62px;
                    font-size: 18px;
                 }
            }
        }


    }
}
</style>
<style scoped>
     .dropmessage{
            display: inline-block;
            margin-right:10px;
         }

         .el-menu-item {
          /* border-bottom: 1px solid #3c3c3c; */
         }

 
</style>
<style>
             .el-menu-item :hover{
                	background:#035c86;
              }
</style>




