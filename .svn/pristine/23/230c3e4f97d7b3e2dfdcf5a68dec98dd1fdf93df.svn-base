<template>
  <el-row class="Addproject">
      <el-col :span='24'>
             <div class="navigationbar"> 
              <span class="navigationname">项目管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                  编辑项目
              </span>
            </div>
      </el-col>
      <el-col :span="24" >
               
            <div class="projectconcent">
              <el-form  :model="addprojectfrom"  label-width="120px"  class="addprojectfrom" :rules="addprojectrules" ref="addprojectrules">
                    <el-form-item label="项目中文标题:"  prop="projectNameZh">
                        <el-input v-model="addprojectfrom.projectNameZh" placeholder="请输入项目中文名称"></el-input>
                    </el-form-item>
                    <el-form-item label="项目英文名:" prop="projectNameEn">
                            <el-input v-model="addprojectfrom.projectNameEn" placeholder="初次可以指定,创建不能修改"  disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="数据目录">
                           <el-radio-group v-model="addprojectfrom.dataDirectory">
                              <el-radio :label="0">私有</el-radio>
                              <el-radio :label="1">公有</el-radio>
                         </el-radio-group>   
                    </el-form-item>



                    <el-form-item  label="项目描述:" >
                              <el-input
                                      type="textarea"
                                      :rows="8"
                                      placeholder="请输入项目功能作用等描述"
                                      v-model="addprojectfrom.projectDesc">
                                  </el-input> 
                    </el-form-item>
                     <div style="text-align:center"> <el-button  type="primary" size="small"  @click="editpproject" >编辑项目</el-button>   </div>
             </el-form>
           </div>
      </el-col>
  </el-row>
</template>
<script>
import qs from 'qs'
import {editproject} from '@/api/api'
export default {
            data(){
              return{
                 addprojectfrom:{//创建项目表单
                      projectNameZh:'',
                      projectNameEn:"",
                      projectDesc:"",
                      dataDirectory:''
                 },
                 addprojectrules:{
                     projectNameZh:[{ required: true, message: "输入项目中文名称", trigger: "blur" }],
                     projectNameEn:[
                       { required: true, message: "输入项目英文名称", trigger: "blur" },
                       { pattern: /^[a-zA-Z0-9_]{0,}$/, message: "不能输入中文" }
                       ]
                 },
                 editdisabled:false,
                 addproject:true,
              }
            },
            methods:{
             editpproject(){
                        var _this =this
                         var parms=this.addprojectfrom 
                         var parms={
                              projectId:this.addprojectfrom.projectId ,
                              projectNameEn:this.addprojectfrom.projectNameEn,
                              projectNameZh:this.addprojectfrom.projectNameZh,
                              projectDesc:this.addprojectfrom.projectDesc,
                              dataDirectory:this.addprojectfrom.dataDirectory
                         }
               this.$refs['addprojectrules'].validate((valid)=>{
                    if(valid){
                       editproject(parms).then(res=>{
                                if(res.data.code==0){
                                     _this.$message({
                                          message: '编辑成功',
                                          type: 'success'
                                        }); 
                                    setTimeout(()=>{
                                          this.$router.push('/Uploadpage')
                                    },1000)              
                                 }else{
                                      _this.$message({
                                         message:"编辑失败",
                                         type:'error'
                                      })
                                 }
                        })  
                       }
                   })
               
               },

            },
            mounted(){
                        this.addprojectfrom= JSON.parse(this.$route.params.id)                   
      }
}
</script>
<style lang="scss" scoped>
       .Addproject{
             .addprojectfrom{
                   width: 500px;
                   height: 400px;
                   margin: 50px 0px 0px 50px;
                  
             }  
       }
</style>


