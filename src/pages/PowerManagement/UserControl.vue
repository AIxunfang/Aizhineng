<template>
     <el-row>
           <el-col :span='24'>
             <div class="navigationbar"> 
               <span class="navigationname">权限管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                    用户管理
                </span>
            </div>
            <div class="seachframe">
                 <div  class="formdata">
                        <el-form :inline="true"  size="mini">
                              <el-form-item  >
                                    <el-input v-model="roleseach"></el-input>         
                              </el-form-item>
                              <el-form-item>
                                <el-button type="primary" icon="el-icon-search"   size="mini"  >查询</el-button>
                              </el-form-item>
                        </el-form>
                   </div>
            </div>
            <div style="margin:20px 0px 0px 20px"> <el-button icon="el-icon-plus" type="primary"  size="mini"  @click="addueser" >新增</el-button></div>
         </el-col>
         <el-col :span="24">
                 <el-dialog
                    title="提示"
                    :visible.sync="UserdialogVisible"
                    width="600px"
                    >
                    <el-form  :model="formuserAdd"  ref="formuserAdd"   :inline="true"  class="adduserform" size="mini" label-width="80px" :rules="rules">
                        <el-form-item label="登录帐号" prop="userAccount">
                            <el-input v-model="formuserAdd.userAccount" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                                 <el-input v-model="formuserAdd.password" placeholder="默认密码admin"></el-input>

                        </el-form-item>
                          <el-form-item label="真实姓名">
                            <el-input v-model="formuserAdd.username" placeholder="真实姓名"></el-input>
                        </el-form-item>                 
                        <el-form-item label="用户身份" prop="userIdentity">
                            <el-select v-model="formuserAdd.userIdentity" placeholder="选择用户身份">
                                <el-option label="学生" value="1"></el-option>
                                <el-option label="老师" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用户状态" prop="userStatus">
                            <el-select v-model="formuserAdd.userStatus" placeholder="选择用户状态">
                                <el-option label="启用" value="0"></el-option>
                                <el-option label="禁止" value="1"></el-option>
                                <el-option label="其他" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="用户类型" prop="userType">
                              <el-select v-model="formuserAdd.userType" placeholder="选择用户状态">
                                  <el-option label="普通用户" value="0"></el-option>
                                  <el-option label="管理员" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="userEmail">
                            <el-input v-model="formuserAdd.userEmail" placeholder="邮箱"></el-input>
                        </el-form-item>  
                        <el-form-item label="手机" prop="userMobile">
                            <el-input v-model="formuserAdd.userMobile" placeholder="手机号"></el-input>
                        </el-form-item>  
                      </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button  size="mini">取消</el-button>
                      <el-button type="primary" size="mini" @click="savadata">保存</el-button>
                    </span>
                 </el-dialog>
         </el-col>
         <el-col :span="24">
                <div  style="margin:20px">
                       <el-table
                          :data="usertableData"
                          stripe
                          style="width: 100%">
                          <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                          </el-table-column>
                          <el-table-column
                            prop="address"
                            label="地址">
                          </el-table-column>
                    </el-table> 

                </div>
         </el-col>
     </el-row>
</template>
<script>
import{userAdd,userlistpage} from '@/api/api'
export default {
           data(){
               return{
                    
                     roleseach:'',
                     UserdialogVisible:false,
                     formuserAdd:{
                              userAccount:'',
                              username:"",
                              userIdentity:'1',
                              userStatus:'0',
                              userType:"0",
                              password:"",

                     },
                     rules:{
                           userAccount:[
                                 { required: true, message: "输入登录帐号", trigger: 'blur' },
                                  {pattern:/^[0-9a-zA-Z_]{1,}$/,message:"由数字英文字母或下划线组成"}
                                ],
                            userEmail:[
                                   {pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,message:"邮箱验证不通过"}
                            ],
                           userMobile:[
                                  {pattern:/^1(3|4|5|6|7|8)\d{9}$/,message:"手机号码格式错误"}
                           ]
                     }



               }
           },
         methods:{
             addueser(){
                 this.UserdialogVisible=true 
               },
              savadata(){
                       this.formuserAdd.userIdentity=Number(this.formuserAdd.userIdentity)
                       this.formuserAdd.userStatus=Number(this.formuserAdd.userStatus) 
                       this.formuserAdd.userType=Number(this.formuserAdd.userType) 
                       var parms=this.formuserAdd
                    this.$refs['formuserAdd'].validate((valid)=>{
                             if(valid){
                                  userAdd(parms).then(res=>{
                                        console.log("-zengjia--")
                                        console.log(res)
                                        if(res.data.code==0){
                                              this.UserdialogVisible=false
                                              
                                        }
                                  })   
                             }


                    })





              }
         },
         mounted(){

         }
  

}
</script>
<style lang="scss" scoped>

</style>
<style>
       .adduserform .el-input__inner{
              width: 178px;
       }
</style>
