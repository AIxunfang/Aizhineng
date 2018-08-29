<template>
  <el-row class="NewDrill"> 
      <el-col :span='24'>
             <div class="navigationbar"> 
               <span class="navigationname">模块管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                       新建训练
                </span>
            </div>
             <div class="modeldataname"> <span style="margin-left:20px;">单机训练模块参数一</span></div>
      </el-col>
       <el-col :span="24">
              <el-form :inline="true" :model="modelparameter" class="modelfrom" label-width="120px" :rules="modelrules">
                     <div>
                          <el-form-item label="模块名称:">
                                <el-input v-model="modelparameter.modelname" placeholder="填写模块名称"></el-input>
                          </el-form-item>
                          <el-form-item label="所属项目:">
                            <el-select v-model="modelparameter.projectid" placeholder="选择项目"  @change="changedata($event)"  >
                                <el-option  
                                   v-for="(item,index) in projectdata"
                                  :key="index"
                                  :label="item.projectNameZh"
                                  :value="item.projectId"
                                 ></el-option>
                            </el-select>
                          </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="模型类别:">
                              <el-select v-model="modelparameter.projectsort" placeholder="选择类别">
                                  <el-option label="区域一" value="shanghai"></el-option>
                                  <el-option label="区域二" value="beijing"></el-option>
                              </el-select>  
                        </el-form-item>
                        <el-form-item label="镜像名称:">
                               <el-select v-model="modelparameter.projectmirror" placeholder="选择镜像名">
                                  <el-option label="区域一" value="shanghai"></el-option>
                                  <el-option label="区域二" value="beijing"></el-option>
                              </el-select>     
                        </el-form-item>
                      </div>
                      <div>
                        <el-form-item label="模型描述:">
                                  <el-input
                                    type="textarea"
                                    :rows="8"
                                    placeholder="描述模块作用"
                                    v-model="modelparameter.modeldescribe">
                                  </el-input>
                        </el-form-item>
                               <div style="width:400px;display:inline-block">
                                <el-form-item label="CPU:">
                                    <el-input v-model="modelparameter.cpu" readonly="readonly"></el-input>
                              </el-form-item>
                                <el-form-item label="内存:">
                                    <el-input v-model="modelparameter.memory"  readonly="readonly" ></el-input>
                              </el-form-item>
                                <el-form-item label="GPU:">
                                    <el-input v-model="modelparameter.gpu"  readonly="readonly" ></el-input>
                              </el-form-item>
                             </div>
                      </div>
                       <div>
                          <el-form-item label="需要训练的脚本:">
                             <el-select v-model="modelparameter.ActionScript" placeholder="选择需要训练的脚本">
                                  <el-option label="区域一" value="shanghai"></el-option>
                                  <el-option label="区域二" value="beijing"></el-option>
                              </el-select>    
                          </el-form-item>
                          <el-form-item>
                                 <el-button type="primary" size="small">解析参数</el-button>
                          </el-form-item>
                       </div>
                       <div>
                           <el-form-item label="使用数据">
                                       <el-radio-group v-model="modelparameter.resource">
                                            <el-radio border   label="1">公有数据</el-radio>
                                            <el-radio border  label="2">私有数据</el-radio>
                                      </el-radio-group>
                           </el-form-item>
                          </div>
                         <div>
                          <el-form-item>
                                   <el-input v-model="modelparameter.path"  readonly="readonly"></el-input>
                          </el-form-item>
                          <el-form-item>
                                   <el-input v-model="modelparameter.path"  placeholder="参数名称" ></el-input>
                          </el-form-item>


                           <el-form-item label="路径值:">
                                  <span v-if="this.modelparameter.resource==1" >/home/nfs-share</span>
                                  <span v-if="this.modelparameter.resource==2" >/home/nfs-share/yaolianhua/e9162912fb</span>
                                 <el-select v-model="modelparameter.path" placeholder="选择根目录下路径">
                                  <el-option label="区域一" value="shanghai"></el-option>
                                  <el-option label="区域二" value="beijing"></el-option>
                              </el-select> 
                           </el-form-item>
                       </div>
                        <div>
                             <el-form-item>
                                      <el-input v-model="modelparameter.path"  readonly="readonly"></el-input>
                             </el-form-item>
                             <el-form-item>
                                      <el-input v-model="modelparameter.path"  placeholder="参数名称"></el-input>
                             </el-form-item>
                             <el-form-item label="值:">
                                      <el-input v-model="modelparameter.path"></el-input> 
                             </el-form-item>
                       </div>
                       <div>
                            <el-form-item>
                                   <el-button type="primary" size="small">创建模型</el-button>
                            </el-form-item>
                       </div>

                </el-form>  
              


       </el-col>


  </el-row>
</template>
<script>
import {projectlist} from "@/api/api"
export default {
        data(){
            return{
                projectdata:[],
                modelparameter:{
                            modelname:"", 
                            projectid:"", 
                            projectsort:"",
                            projectmirror:"",
                            modeldescribe:"",
                            cpu:"1",
                            memory:'4',
                            gpu:"2",
                            ActionScript:'',
                            resource:'',
                            path:'',

                    },
                 modelrules:{

                 }
               }
        },
        methods:{
               getprojectlist(){
                      var parms={
                            currPage:1,
                            pageSize:200
                      }
                    projectlist(parms).then(res=>{
                          console.log("-----列表-----")
                          console.log(res)
                          if(res.data.code==0){
                                 this.projectdata=res.data.data.list
                          }
                    })
                },
               changedata(index){
                      console.log("xiabiao")
                      console.log(index)

               },

        },
        mounted(){
              this.getprojectlist()
        }


}
</script>
<style lang="scss" scoped>
      .NewDrill{
        .modeldataname{
              font-family: "Microsoft YaHei";
              color:#666666;
              line-height: 40px;
              border: 1px solid #e4e4e4;
              height: 40px;
              background: #efefef;
        }  
       .modelfrom{
            margin: 20px 0px 0px 20px;
            .el-input{
                 width:217px;
            }
            .el-textarea{
                 width:217px;
            }
       }

      }
</style>
