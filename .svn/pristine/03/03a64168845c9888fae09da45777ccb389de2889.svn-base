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
                          <el-button size="small" type="primary"  @click="uploadcode"><i class="el-icon-upload el-icon--right" ></i>上传代码 </el-button>
                          <el-button size="small" type="primary" ><i class="el-icon-upload el-icon--right"></i>上传数据 </el-button>
                 </div>
                 <el-dialog
                     title="上传"
                    :visible.sync="uploaddialogVisible"
                     width="30%"
                    >
                    <el-upload
                           class="upload-demo"
                           drag
                          :on-success="uploadSuccess"
                           action="http://192.168.80.63:10005/api/project/upload"
                        >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload> 
                    <span slot="footer" class="dialog-footer">
                        <el-button size="small" >取 消</el-button>
                        <el-button type="primary" size="small">确 定</el-button>
                    </span>
                 </el-dialog> 
          </el-col>
          <el-col :span="24">
                <div class="uploaddata">
                <el-table border style="widtth:100%"  :data="codedata"  >
                         <el-table-column label="名称">
                                <template slot-scope="scope">
                                    <i class="fa fa-file" aria-hidden="true"></i>
                                     <span style="margin-left: 10px">{{ scope.row.file }}</span>
                                </template>
                         </el-table-column>
                         <el-table-column label="时间">

                         </el-table-column>
                         <el-table-column label="大小(单位/k)" prop="storage">

                         </el-table-column>
                         <el-table-column label="操作">
                                 <template slot-scope="scope">
                                       <el-button icon="el-icon-delete" type="primary" size="mini">删除</el-button>
                                 </template>
                         </el-table-column>

                </el-table>
              </div>
          </el-col>

    </el-row>
</template>
<script>
export default {
       data(){
           return{
                  prodetail:null,
                  projectNameZh:'',
                  filetype:"",
                  routefile:'',
                  routefilesubstr:"",
                  uploaddialogVisible:false,
                  codedata:[
                       {
                          file:'code',
                          time:"",
                          storage:"0"   
                       },
                     {
                          file:'data',
                          time:"",
                          storage:"0"   
                       },

                  ]
           }
       },
       methods:{
              goback(){//返回上一页
                    this.$router.go(-1)

              },
             uploadSuccess(res, file){
                 console.log("文件上传")
                   console.log(res)
                   console.log(file)

             },



              uploadcode(){//上传代码
                      this.uploaddialogVisible=true    
              },
       },
       mounted(){
               this.prodetail=JSON.parse(sessionStorage.getItem('prodetail'))   
               this.projectNameZh= this.prodetail.projectNameZh
                 this.routefile=this.prodetail.projectDataPath
                 this.routefilesubstr=this.routefile.substring(0,this.routefile.length-5)  
                console.log(this.routefilesubstr)
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
                 display: inline-block;
                 float: right;
                 margin-right: 20px;
                }  
             }
             .uploadfile{
                  padding: 20px;
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
