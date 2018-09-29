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
           
            <el-form   :inline="true"    :model="formInline" class="demo-form-inline"  label-width="120px" :rules="rules"  ref="formInline">
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
                </div>
         </el-form>
          <div> 
              <el-button size="small" type="primary" style="float:right;margin-right: 50px ;50px;50px;" @click="submitappliction" > 
                  提交申请
              </el-button>
        </div>
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
                       projectId:""

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
                 //下拉框选中事件
             selectGet(vId){//这个vId也就是value值
                         console.log(vId)
                        let obj = {};
                        obj = this.projectdata.find((item)=>{//这里的projectdata就是上面遍历的数据源
                            return item.projectId === vId;//筛选出匹配数据
                        });
                        console.log(obj);//我这边的name就是对应label的
                        this.formInline.cpu=obj.publishCpu
                        this.formInline.storge=obj.publishMemory
                        },
                 getapprovegetpublish(){
                       approvegetpublish().then(res=>{
                              console.log("---------------------")
                             console.log(res)
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
                                memory:this.formInline.storge
                       }

                   this.$refs['formInline'].validate((valid) =>{
                             if(valid){
                               approveadd(parms).then(res=>{
                               console.log("=====shenqing======")
                               console.log(res)
                                if(res.data.code==0){
                                      this.$message({
                                          type:"success",
                                          message:"已提交申请"
                                      })
                                        this.$refs['formInline'].resetFields();
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
      .publishResoureapply{
              
      }
</style>