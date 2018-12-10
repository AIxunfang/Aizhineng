<template>
  <el-row class="publishResoureapply">
      <el-col :span='24'>
            <div class="navigationbar"> 
               <span class="navigationname">资源申请<i class="el-icon-arrow-right" aria-hidden="true"></i>
                     训练修改申请
                </span>
            </div>
      </el-col>
      <el-col :span="24">
           
            <el-form   :inline="true"    :model="formInline" class="demo-form-inline"  label-width="120px" :rules="rules" ref="formInline">
                    <div style="margin:20px;">
                        <el-form-item label="选择项目" prop="projectId">
                            <el-select v-model="formInline.projectId" placeholder="选择项目" @change="selectGet" >
                                <el-option 
                                   v-for="item in projectdata"
                                  :label="item.projectNameZh"
                                  :key="item.projectId"
                                  :value="item.projectId"
                                 ></el-option>
                            </el-select>
                        </el-form-item>
                  </div>
                <div  style="margin:20px;">  
                        <el-form-item label="CPU" prop="cpu">
                            <el-input v-model="formInline.cpu" ></el-input>
                        </el-form-item>
                         <el-form-item label="内存" prop="storge">
                            <el-input v-model="formInline.storge"></el-input>
                        </el-form-item>
                         <el-form-item label="GPU" prop="gpu">
                            <el-input v-model="formInline.gpu"></el-input>
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
import{approvegetproject,approveupdataapprove} from  '@/api/api'
export default {
             data(){
                  return{
                      projectdata:[],
                      formInline:{
                           projectId:'',
                           cpu:'',
                           gpu:"",
                           storge:'',
                      },
             rules:{
                 projectId:[
                     { required: true, message: "选择项目", trigger: 'blur' },
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
                    getapprovegetproject(){ 
                          approvegetproject().then(res=>{
                                  console.log("===========")
                                  console.log(res)
                                  if(res.data.code==0){
                                       this.projectdata=res.data.data    
                                  }
                            })  
                    },
                 selectGet(vId){
                        let obj = {};
                        obj = this.projectdata.find((item)=>{//这里的projectdata就是上面遍历的数据源
                            return item.projectId === vId;//筛选出匹配数据
                        });
                        console.log(obj);//我这边的name就是对应label的
                        this.formInline.cpu=obj.projectCpu
                        this.formInline.storge=obj.projectMemory
                        this.formInline.gpu=obj.projectGpu
                        },
                     submitappliction(){
                           var parms={
                                projectId:this.formInline.projectId,
                                cpu:this.formInline.cpu,
                                gpu:this.formInline.gpu,
                                auditType:1,
                                memory:this.formInline.storge
                            }

                        this.$refs['formInline'].validate((valid)=>{
                       if(valid){
                             approveupdataapprove(parms).then(res=>{
                                 if(res.data.code==0){
                                       this.$message({
                                           type:"success",
                                           message:"已提交申请"
                                       })
                                       this.$refs['formInline'].resetFields();
                                 }else{
                                      this.$message.error(res.data.message)
                                   }
                                }) 
                        }
                     })
                 }
             },
             mounted(){
                    this.getapprovegetproject()
                    this.formInline.projectId=this.$route.params.id
                    this.formInline.cpu=this.$route.params.cpu;
                     this.formInline.gpu=this.$route.params.gpu;
                      this.formInline.storge=this.$route.params.memory
             }
}
</script>
<style lang="scss" scoped>

</style>