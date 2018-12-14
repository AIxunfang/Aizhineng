<template>
  <el-row class="publishResoureapply">
      <el-col :span='24'>
            <div class="navigationbar"> 
               <span class="navigationname">资源申请<i class="el-icon-arrow-right" aria-hidden="true"></i>
                   发布申请
                </span>
            </div>
      </el-col>
            <el-col :span="24">
            <el-form      :model="formInline" class="forminline"  label-width="120px" :rules="rules"  ref="formInline">
                    <div style="margin:20px;">
                        <el-form-item label="发布名称"  prop="projectId">
                            <el-select v-model="formInline.projectId" placeholder="选择发布名称" @change="selectGet" >
                                <el-option 
                                  v-for="item in projectdata"
                                  :label="item.publishName"
                                  :key="item.projectId"
                                  :value="item.projectId"
                                 ></el-option>
                            </el-select>
                        </el-form-item>
                  </div>
                <div  style="margin:20px;">  
                        <el-form-item label="CPU" prop="cpu">
                            <el-input v-model="formInline.cpu"></el-input>
                        </el-form-item>
                         <el-form-item label="内存" prop="storge" >
                            <el-input v-model="formInline.storge"></el-input>
                        </el-form-item>
                        <el-form-item label='备注'>
                               <el-input type='textarea' v-model='formInline.applyMessage'    placeholder="输入备注内容"></el-input>
                        </el-form-item>

                </div>
                <div  style="margin:20px;">  
                <el-form-item>
                    <el-button size="small" type="primary" style="float:right;" @click="submitappliction" > 
                        提交申请
                    </el-button>
                </el-form-item>
                </div>
         </el-form>
      </el-col>
  </el-row>
</template>
<script>
import{approvegetpublish,approveadd} from '@/api/api'
export default {
        data(){
            return{
               projectdata:[],
                formInline:{
                       cpu:'',
                       storge:'',
                       projectId:"",
                       applyMessage:''
                },
              rules:{
                 projectId:[
                     { required: true, message: "选择发布名称", trigger: 'blur' },
                 ],
                cpu:[
                       { required: true, message: "不能为空", trigger: 'blur' },
                       { pattern: /^([1-9]\d*|[0]{1,1})$/, message: "大于-1的正整数" }
                ],
                storge:[
                         { required: true, message: "不能为空", trigger: 'blur'},
                         { pattern: /^[1-9]+\d*$/, message: "大于0的正整数"}
                ],
                gpu:[
                          { required: true, message: "不能为空", trigger: 'blur'},
                         { pattern: /^[1-9]+\d*$/, message: "大于0的正整数"}
                  ]
              },
            }
        },
        methods:{
             selectGet(vId){
                         console.log(vId)
                        let obj = {};
                        obj = this.projectdata.find((item)=>{//这里的projectdata就是上面遍历的数据源
                            return item.projectId === vId;
                        });
                        this.formInline.cpu=obj.publishCpu
                        this.formInline.storge=obj.publishMemory
                        },
                 getapprovegetpublish(){
                       approvegetpublish().then(res=>{
                              if(res.data.code==0){
                                   this.projectdata=res.data.data
                              }
                       })
                 },

               submitappliction(){
                       var parms={
                                projectId:this.formInline.projectId,
                                cpu:this.formInline.cpu,
                                gpu:0,
                                auditType:2,
                                memory:this.formInline.storge,
                                applyMessage:this.formInline.applyMessage
                       }

                   this.$refs['formInline'].validate((valid) =>{
                             if(valid){
                               approveadd(parms).then(res=>{
                                if(res.data.code==0){
                                      this.$message({
                                          type:"success",
                                          message:"已提交申请"
                                      })
                                        this.$refs['formInline'].resetFields();
                                        this.formInline.applyMessage=''
                                }else{
                                     this.$message.error("该发布名称已提交申请")
                                }
                            })  
                       }
                   })                   
            } 
        },
        mounted(){
               this.getapprovegetpublish()
        }
}
</script>
<style lang="scss" scoped>
      .forminline{
          margin-top:60px;
      }
</style>
<style>
        .forminline .el-form-item__content{
              width: 500px;  
           
      }
       .forminline  .el-select{
           width:500px;
       }
</style>
