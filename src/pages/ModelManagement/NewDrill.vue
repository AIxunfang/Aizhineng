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
                            <el-select v-model="modelparameter.projectid" placeholder="选择项目"  @change="changedataname($event)"  >
                                <el-option  
                                   v-for="(item,index) in projectdata"
                                  :key="index"
                                  :label="item.projectNameZh"
                                  :value="item.projectId"
                                 ></el-option>
                            </el-select>
                          </el-form-item>
                        <el-form-item>
                                   <el-radio-group v-model="modelparameter.radio3">
                                          <el-radio-button label="1">CPU</el-radio-button>
                                          <el-radio-button label="2">GPU</el-radio-button>
                                    </el-radio-group>   
                        </el-form-item>
 

                      </div>
                      <div>
                        <el-form-item label="模型类别:">
                              <el-select v-model="modelparameter.projectsort" placeholder="选择类别">
                                  <el-option label="区域一" value="shanghai"></el-option>
                                  <el-option label="区域二" value="beijing"></el-option>
                              </el-select>  
                        </el-form-item>
                        <!-- <el-form-item label="镜像名称:">
                               <el-select v-model="modelparameter.projectmirror" placeholder="选择镜像名">
                                  <el-option label="区域一" value="shanghai"></el-option>
                                  <el-option label="区域二" value="beijing"></el-option>
                              </el-select>     
                        </el-form-item> -->
                      </div>
                      <div>
                        <el-form-item label="模型描述:">
                                  <el-input
                                    type="textarea"
                                   :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="描述模块作用"
                                    v-model="modelparameter.modeldescribe">
                                  </el-input>
                        </el-form-item>

                      </div>
                       <div>
                          <el-form-item label="需要训练的脚本:">
                                          <el-cascader
                                              v-model="selectedOptionsscript"
                                             :options="optionsscript"
                                              :show-all-levels="false"
                                               @active-item-change="handleItemChange"
                                          ></el-cascader>
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
                          <el-form-item label="变量名称">
                                   <el-input v-model="modelparameter.path"  readonly="readonly"></el-input>
                          </el-form-item>
                           <el-form-item label="值:">
                                  <span v-if="this.modelparameter.resource==1" >/home/nfs-share</span>
                                  <span v-if="this.modelparameter.resource==2" >/home/nfs-share/yaolianhua/e9162912fb</span>
                                 <el-select v-model="modelparameter.path" placeholder="选择根目录下路径">
                                  <el-option label="区域一" value="shanghai"></el-option>
                                  <el-option label="区域二" value="beijing"></el-option>
                              </el-select> 
                           </el-form-item>
                       </div>
                        <div>
                             <el-form-item label="变量名称">
                                      <el-input v-model="modelparameter.path"  readonly="readonly"></el-input>
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
import qs from 'qs'
import {projectlist,dirsAndFiles} from "@/api/api"
export default {
        data(){
            return{
              meupath:'',
               selectedOptionsscript:[],//选择的值.
               optionsscript:[
                        {
                       value:"code",
                       label:"code",
                        children:[
                              //  {
                              //      value: 'zhinan',
                              //     label: '指南',
                              //  children: [{
                              //             value: 'yizhi',
                              //             label: '一致'
                              //             }, {
                              //             value: 'fankui',
                              //             label: '反馈'
                              //             },]
                              //  },
                              //  {
                              //          value: 'kekong',
                              //          label: '可控' ,
                              //          children: [{
                              //             value: 'cexiangdaohang',
                              //             label: '侧向导航'
                              //             }, {
                              //             value: 'dingbudaohang',
                              //             label: '顶部导航',
                              //             children:[
                              //                   {
                              //                         label:'最后',
                              //                         value:"zhusk"
                              //                   }
                              //             ]
                              //             }]
                              //  }

                        ], 
                       }
               ],
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
                            radio3:"1",
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
               changedataname(index){
                      console.log("xiabiao")
                      console.log(index)
                      
               },

              handleChangescript(value){//改变选中的值
                  console.log("--change")
                  console.log(value)
                  console.log(this.selectedOptionsscript)
              },
              handleItemChange(val){
                     console.log("active-change")
                       console.log(val)
                      this.meupath='';
                      this.meupath=val.join('/') 

                      console.log(this.meupath)
                      //this.optionsscript.children
             //点击选择项目获得解析
                     var parms={
                              currentPath:this.meupath,
                              projectId:this.modelparameter.projectid
                             }  
                             
                         // if(val.indexofindexOf())      



                    dirsAndFiles(parms).then(res=>{
                             console.log("----code----")
                             console.log(res)         
                   if(res.data.code==0){
                           for(var i=0;i<res.data.data.dirs.length;i++){
                                   this.optionsscript[0].children.push({
                                             value:res.data.data.dirs[i],
                                             label:res.data.data.dirs[i],
                                             children:[i]
                                   })      
                             
                           }
                           for(var k=0;k<res.data.data.files.length;k++){  
                                     this.optionsscript[0].children.push({
                                             value:res.data.data.files[k],
                                             label:res.data.data.files[k]
                                     })
                            }
                       }
                     console.log("现在的数组")
                    console.log(this.optionsscript)
                     })   
                     
                     
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
