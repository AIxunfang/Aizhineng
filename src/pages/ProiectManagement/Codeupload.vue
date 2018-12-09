<template>
    <el-row class="Codeupload">
         <el-col :span='24'>
             <div class="navigationbar"> 
              <span class="navigationname">项目管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                     项目上传
              </span>
            </div>
         </el-col>
          <el-col :span="24">
                  <div class="codehead"> 
                      <span class="Codeprojectname">   {{ projectNameZh}}: {{this.routefilesubstr}}   </span>  
                      <div class="getback"><el-button  type="primary"  size="small" @click="goback">返回</el-button></div>
                  </div>
                 <div class="uploadfile">
                <div style="width:600px" >
                     
                       
                    <div style="margin-bottom:20px; width:500px;display:inline-block " v-show='progressshow' >
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="this.percentage" status="success"></el-progress>  
                    </div>
                     <p style="display:inline-block" v-show="noiceuser">
                     <span style="font-size:10px;"> 解压中请稍等</span>
                     <i class="el-icon-loading"> </i>
                     </p>
  
                </div>
                     <div style="display:inline-block">
                          <div style="display:inline-block">
                            <el-upload  
                             id="fileform"
                             :action="projectupload"
                            :limit="1"
                             :on-progress="progressfunc"
                            :data='dataformcode'
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            accept=".zip,.py"
                            :on-change="changefilename"
                            :headers='headers'
                            :before-upload="beforeRemovecode"
                            >
                          <el-button size="mini" type="primary"   ref="codeUpload" :disabled="disabledupload">
                                    <i class="el-icon-upload el-icon--right"></i>上传代码 code 
                                </el-button>
                            </el-upload>
                        </div>
                      </div> 
                      <div style="margin-top:20px;display:inline-block"   v-show="this.public ==0"  >
                          <div style="display:inline-block">
                            <el-upload  
                            :action="projectupload"
                            :limit="1"
                             :on-progress="progressfunc"
                            :data='dataformdata'
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                             accept=".zip"
                            :headers='headers'
                            :before-upload="beforeRemovedata"
                            
                            >
                                <el-button size="mini" type="primary"   ref="codeUpload" :disabled="disabledupload">
                                    <i class="el-icon-upload el-icon--right"></i>上传数据 data 
                                </el-button>
                            </el-upload>
                        </div>
                      </div>
                      <div style="color:#909399;font-size:12px;margin-top:10px">文件名不能有中文或者含特殊符号</div>
                 </div>
          </el-col>
          <el-col :span="24">
                <div class="uploaddata">
                <el-table border style="widtth:100%"  :data="codedata"   v-loading="loading"   element-loading-text="请稍等">
                         <el-table-column label="名称">
                                <template slot-scope="scope">
                                    <i class="fa fa-file" aria-hidden="true"></i>
                                     <span style="margin-left: 10px">{{ scope.row.type==1?'code':'data' }}</span>
                                </template>
                         </el-table-column>
                         <el-table-column label="更新时间" prop="time">
                         </el-table-column>
                         <el-table-column label="大小" prop="fileSize">
                         </el-table-column>
                         <el-table-column label="操作">
                                 <template slot-scope="scope">
                                       <el-button icon="el-icon-delete" type="primary" size="mini"  @click="delectfile(scope.$index,scope.row)"  :disabled="scope.row.dataType==1"  >删除</el-button>
                                 </template>
                         </el-table-column>
                </el-table>
              </div>
          </el-col>
    </el-row>
</template>
<script>
import axios from 'axios'
import{projectupload,deletefile,getfileSize,projectprocess}from "@/api/api"
import {baseUrl} from '../../../static/baseurl'
export default {
     name: 'test-keep-alive',
       inject:['reload'],
       data(){
           return{
                 loading:false,
                 includedComponents: "test-keep-alive",
                 disabledupload:false,
                 baseUrl,
                 projectupload:baseUrl+'/project/upload',
                 public:'',
                  headers:{
                    token:"",
                  },
                  data_upload:"",
                  noiceuser:false,
                  progressshow:false,
                  percentage:0,
                  acceptfile:'',//接受文件类型
                  filetreams:'',//发送的文件流
                  prodetail:null,
                  projectNameZh:'',
                  filetype:"",//上传文件的类型
                  routefile:'',
                  routefilesubstr:"",
                  uploaddialogVisible:false,
                  dataformcode:{
                        type:1,
                        projectId:'',
                        token:''
                        
                  },
                  dataformdata:{
                        type:2,
                        projectId:'',
                        token:''
                  },
                  codedata:[

                  ]
           }
       },
       methods:{
              goback(){//返回上一页
                    this.$router.go(-1)
              },
            getgetfileSize(){
              this.codedata=[]
                    var parms={
                          projectId:this.prodetail.projectId
                    }
                 getfileSize(parms).then(res=>{
                          if(res.data.code==0){
                              this.loading=false
                              this.codedata=res.data.data
                          }
                 })      
            },
            beforeRemovecode(){
                   this.dataformcode.projectId=this.prodetail.projectId  
                   const token = sessionStorage.getItem("token");
                   this.dataformcode.token=token
                   this.headers.token = token;
            },
               beforeRemovedata(){
                   this.dataformdata.projectId=this.prodetail.projectId  
                   const token = sessionStorage.getItem("token");
                   this.dataformdata.token=token
                   this.headers.token = token;
            },
           changefilename(file, fileList){
           },
            handleAvatarSuccess(res, file){
                sessionStorage.setItem('progresstype', 'success')
                    if(res.code==0){
                           this.disabledupload=false
                           this.progressshow=false
                           this.noiceuser=false
                           this.reload()
                           setTimeout(()=>{
                             this.getgetfileSize()
                           },2000)


                    }else{
                          this.$message.error(res.message)
                          this.disabledupload=false
                          this.reload()
                    }
            },
            progressfunc(event, file, fileList) {
              this.progressshow=true
              this.disabledupload=true  //如果正在上传禁止上传其他的
               sessionStorage.setItem('progresstype', 'pedding')
               this.percentage = parseInt(event.percent);
           var progress= localStorage.setItem('percentage', this.percentage);
            if (this.percentage == 100) {
                   this.noiceuser=true
               }
     
            },
            delectfile(value){//删除文件 
                 let type=""
                if(value==0){
                   this.type=1
                }else{
                   this.type=2
                }
                var parms={
                     projectId:this.prodetail.projectId,
                     type:this.type
                }
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                             this.loading=true
                            deletefile(parms).then(res=>{
                                  this.loading=false
                                    if(res.data.code==0){
                                        this.$message({
                                                type:'success',
                                                message:"删除成功" 
                                        })
                                        this.getgetfileSize()
                                    }else{
                                        this.$message.error(res.data.message)
                                    }
                            })
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
                    }
       },
       mounted(){
               
                 this.prodetail=JSON.parse(sessionStorage.getItem('prodetail'))   
                 this.projectNameZh= this.prodetail.projectNameZh
                 this.routefile=this.prodetail.projectDataPath
                 this.routefilesubstr=this.routefile.substring(0,this.routefile.length-6)  
                 this.public=this.prodetail.dataDirectory
                 this.percentages = this.percentage
                 var noiceuser= localStorage.setItem('noiceuser',  this.noiceuser);
                  this.getgetfileSize()    
       }
}
</script>
<style lang="scss" scoped>
         .Codeupload{
            .codehead{
                .Codeprojectname{
                       display: inline-block;
                       width:620px;
                       height: 40px;
                       background: #f7f5f5;
                       margin-left: 20px;
                       vertical-align: middle;
                       line-height: 40px;
                       font-family: "Microsoft YaHei";
                       padding-left: 12px;
                }

               
             .getback{
                 float: right;
                 margin-right: 20px;
                }  
             }
             .uploadfile{
                  padding: 0px  20px  0px 20px;
             }
             .uploaddata{
                 text-align: center;
                 padding: 20px;
                  i{
                      color:#409eff,
                  }

             }

         }
</style>
<style>
       .uploaddata  .is-leaf{
            background: #e7edff;
            text-align: center
       }
</style>
