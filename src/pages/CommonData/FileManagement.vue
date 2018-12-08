<template>
    <el-row class="filement">
     <div class="navigationbar"> 
                  <span class="navigationname">公共数据集管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                        文件管理
                  </span>
           </div>
         <el-col :span='24'>
                 <i class="fa fa-home fa-2x homefile" aria-hidden="true"  @click="homefile"   ></i> 
                   <span  v-for="(item,index) in routermenu" :key=index>
                     <i class="fa fa-chevron-right  fa-2x  greaterthan" aria-hidden="true"></i> 
                     <span class="crumenupath" @click="selectcurret(item,index)">
                          {{item}}
                      </span>
                     </span>
                 <el-dropdown trigger="click" style="margin:20px 0px 20px 10px ;"  size="small"  placement="bottom" @command="clickmenu">
                      <span class="el-dropdown-link">
                          <el-button  type="info" size="small">  <i class="el-icon-plus"></i> 
                          </el-button>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item   command="1">
                                <i class="el-icon-document"></i> 创建文件夹
                             </el-dropdown-item>
                              <el-dropdown-item  command="2" >
                                   <el-upload
                                     :action="`${baseUrl}`+'/common/upload'"
                                     :show-file-list="false"
                                     :on-success="handleAvatarSuccess"
                                     :headers="headers"
                                     :data="dataform"
                                     :on-progress="progressfunc"
                                     :before-upload="beforeAvatarUpload">
                                     <i class="el-icon-upload"></i> 上传文件
                                    </el-upload>
                            </el-dropdown-item>
                      </el-dropdown-menu>
                </el-dropdown>
               <div style="display:inline-block;width:620px">
               <div style="display:inline-block;width:500px" v-show="uploadshow">
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" status="success"></el-progress>
                </div>
                 <span v-show='noicewait'>解压中请稍等……</span>
              </div> 
         </el-col>
         <el-col :span='24'>
                 <div style="margin:  0px 20px 0px 20px">
                       <el-button @click="delect"  size="mini" style="margin-bottom:10px"  v-show="ischecked"  >删除</el-button>
                        <el-button @click="downfile"   size="mini" style="margin-bottom:10px"  v-show="ischecked"  >下载</el-button>
                          <el-button    size="mini" style="margin-bottom:10px"  v-show="ischecked"  @click="movefile" > 移动</el-button>
                    <el-table
                        size="mini"
                         :data="filedata"
                           @cell-click="handleCurrentChange"
                             @selection-change="handleSelectionChange"
                        style="width: 100%">
                          <el-table-column
                                 type="selection"
                                 width="55">
                            </el-table-column>     
                            <el-table-column
                                prop="fileName"
                                label="文件名称"
                               >
                              <template slot-scope="scope">
                                  <span  v-if='scope.row.isDir==false '>
                                       <span v-if="scope.row.type==1  "> 
                                             <img  src="../../assets/img/pictureimg.png"    class="picturemiddle">
                                        </span>  
                                         <span v-if=" scope.row.type==4">
                                             <img src="../../assets/img/compress.png" class="picturemiddle">
                                        </span>
                                         <span v-if=" scope.row.type==2">
                                             <img src="../../assets/img/video.png" class="picturemiddle">
                                        </span>
                                         <span v-if=" scope.row.type==3">
                                             <img src="../../assets/img/viceo.png" class="picturemiddle">
                                        </span>
                                 </span>
                                 <span v-else>
                                     <img src="../../assets/img/dir.png"  class="picturemiddle">
                                 </span>
                                  {{ scope.row.fileName }}  
                              </template> 
                            </el-table-column>
                            <el-table-column
                                width="120"
                                label="操作"
                              >
                          <template slot-scope="scope">
                                  <el-dropdown size="small"    @command='optioncommand'  trigger="click">    
                                      <i class="fa fa-ellipsis-h" aria-hidden="true" style="cursor:pointer" @click='actionfun(scope.row)' ></i>
                                        <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item  command="1" ><i class="fa fa-trash" aria-hidden="true"></i> 删除</el-dropdown-item>  
                                                <el-dropdown-item  command="2"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 重命名</el-dropdown-item>  
                                                <el-dropdown-item  command="3"><i class="fa fa-arrows" aria-hidden="true"></i> 移动</el-dropdown-item>   
                                                 <el-dropdown-item  command="4" v-show='scope.row.type==4'  ><i class="fa fa-exchange" aria-hidden="true"></i> 解压</el-dropdown-item>                    
                                          </el-dropdown-menu>
                                  </el-dropdown>
                            </template>
                            </el-table-column>
                            <el-table-column
                                width="120"
                                label="大小">
                                 <template slot-scope="scope">
                                  <span v-if='scope.row.isDir==false'> {{scope.row.size}}</span>
                                  <span v-else   >--</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                                  width="180"
                                 label="更新时间">
                                <template slot-scope="scope">
                                        <el-popover trigger="hover" placement="top">    
                                            <span>{{timeFormattershowsecod(scope.row.updateTime)}}</span>
                                            <div slot="reference" class="name-wrapper"  style="cursor:pointer">
                                                {{timeago().format(scope.row.updateTime,'zh_CN')}}
                                            </div>
                                        </el-popover>
                                </template>
                         </el-table-column>
                    </el-table>
                 </div>
         </el-col>
         <el-col :span='12'>
              <el-dialog
                  :visible.sync="filedialogVisible"
                  width="30%"
                 >
                  <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                          <el-form-item
                            label="文件名称"
                            prop="filename"
                            :rules="[
                              { required: true, message: '文件名不能为空'},
                            ]"
                          >
                            <el-input    v-model="numberValidateForm.filename" autocomplete="off"></el-input>
                          </el-form-item>
                      </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="filesubmit" size="mini">确 定</el-button>
                  </span>
                </el-dialog>
                      <el-dialog  
                   width='500'
                   :visible.sync="movementdialogvis" >
                    <span style="font-size:20px;margin-bottom:10px;display:inline-block">目标目录</span>
                    <div>
                       <i class="fa fa-home fa-2x homehdfs" aria-hidden="true"  @click="movehomeHdfs"  ></i> 
                       
                       <span  class="crumenupath" v-for='(item,index) in movecurent' :key=index >
                           <i class="fa fa-chevron-right  fa-2x  greaterthan" aria-hidden="true"></i> 
                              <span  @click="movecurrentpage(item,index)" style="cursor:pointer" >
                                {{item}}
                              </span>
                         </span>
                         
                    </div>
                        <el-table
                        :data="foldertableData"
                          @cell-click="moveCurrentChange"
                         style="width: 100%">
                        <el-table-column
                          prop="date"
                          label="文件夹"
                         >
                        <template slot-scope="scope">
                            <img src="../../assets/img/dir.png"  class="picturemiddle">
                              {{ scope.row.tableName }}
                        </template>


                        </el-table-column>
                        <el-table-column
                          width="180"
                          label='创建时间'>
                          <template slot-scope="scope">
                                   <el-popover trigger="hover" placement="top">    
                                     <span>{{timeFormattershowsecod(scope.row.updateTime)}}</span>
                                     <div slot="reference" class="name-wrapper"  style="cursor:pointer">
                                        {{timeago().format(scope.row.updateTime,'zh_CN')}}
                                     </div>
                                 </el-popover>
                          </template>
                        </el-table-column>
                      </el-table>

                     <span slot="footer" class="dialog-footer">
                      <el-button type="primary" size='mini'   @click='suremove'>确 定</el-button>
                    </span>
                </el-dialog>


         </el-col>
    </el-row>
</template>
<script>
import timeago from "timeago.js";
import { timeFormattershowsecod, bytesToSize } from "@/assets/js/common";
import {baseUrl} from '../../../static/baseurl'
import {
  commonlist,
  commoncreat,
  commonrename,
  commondelete,
  commondownload,
  commondownmove,
  commonunzip
} from "@/api/api";
export default {
    inject:['reload'],
  data() {
    return {
      noicewait:false,
       baseUrl,
       moveone:false,
       foldertableData: [],
       movecurent: [],
       movepath: "/",
      movementdialogvis:false,
      ischecked: false,
      timeago,
      timeFormattershowsecod,
      bytesToSize,
      filedialogVisible: false,
      numberValidateForm: {
        filename: ""
      },
      selectedit: false,
      routermenu: [],
      filedata: [],
      dataform: {
        filePath: ""
      },
      percentage: 0,
      uploadshow: false,
      headers: {
        token: ""
      },
      delectdata: [],
      selectdelect:'',
      selecttype:'',
      selefilename:"",
      seleoldpath:'',
      currentpath:'',
      currentfileyasuo:'',
    };
  },
  methods: {
    suremove() {
      var parms = {
          path: this.moveone == false ? this.delectdata : [this.seleoldpath],
          newName: this.movepath 
      };
      commondownmove(parms).then(res => {
        if (res.data.code == 0) {
          this.getcommonlist();
          this.movementdialogvis = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    movecurrentpage(item, index) {
       const moveclickcur = "/" + this.movecurent.slice(0, index + 1).join("/");
       this.movepath = moveclickcur +'/';
       this.movehdfs();
    },
    moveCurrentChange(row, column) {
      if (column.label == "文件夹") {
        this.movepath = row.filePath+'/';
        this.movehdfs();
      }
    },
     movehomeHdfs() {
      this.movepath = "/";
      this.movehdfs();
    },
    movehdfs() {
      var parms = {
        path: this.movepath
      };
      this.foldertableData = [];
      hdfslist(parms).then(res => {
        if (res.data.code == 0) {
          this.movecurent = res.config.params.filepath.split("/").slice(1); 
          res.data.data.forEach((item, index) => {
            if (item.isDir == true) {
              item.currentpath = res.config.params.filepath;
              var index = item.fileName.lastIndexOf("/");
              item.tableName = item.fileName.slice(index + 1);
              this.foldertableData.push(item);
            }
          });
        }
      });
    },
    getcommonlist() {
      var params = {
        filepath:
          this.$route.params.id == "/" ? "/" : this.$route.params.id + "/"
      };
      if (this.$route.params.id.split("/").length > 1) {
        this.routermenu = this.$route.params.id.split("/").slice(1);
      }

      commonlist(params).then(res => {
        if (res.data.code == 0) {
          this.filedata = res.data.data;
          this.filedata.forEach((item, index) => {
            item.curentpath = res.config.params.filepath;
            if (item.isDir == false) {
              var fileNamelower = item.filePath.slice(-4).toLowerCase(); 
              if (
                fileNamelower === ".png" ||
                fileNamelower === ".jpg" ||
                fileNamelower === "jpeg" ||
                fileNamelower === ".gif" ||
                fileNamelower === ".psd"
              ) {
                item.type = 1;
              } else if (
                fileNamelower === ".mp4" ||
                fileNamelower === ".3gp" ||
                fileNamelower === "rmvb" ||
                fileNamelower === ".avi" ||
                fileNamelower === "rmvb" ||
                fileNamelower === ".wma"
              ) {
                item.type = 2;
              } else if (
                fileNamelower === ".mp3" ||
                fileNamelower === ".wma" ||
                fileNamelower == ".aac" ||
                fileNamelower == ".ogg"
              ) {
                item.type = 3;
              } else if (fileNamelower == ".zip" || fileNamelower == ".rar") {
                item.type = 4;
              }
            }
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.delectdata = [];
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.ischecked = true;
      } else {
        this.ischecked = false;
      }

      this.multipleSelection.forEach((item, index) => {
        this.delectdata.push(item.filePath);
      });
    },
    optioncommand(val, item) {
       if(val==1){
                  var parms = {
                        path: [this.selectdelect]
                   }
                   commondelete(parms).then(res => {
                  if (res.data.code == 0) {
                    this.getcommonlist();
                  }
                });
       }else if(val==2){
               this.filedialogVisible=true
               this.numberValidateForm.filename=this.selefilename
       }else if(val==3)  {
               this.movementdialogvis=true
               this.movepath='/'
               this.movehdfs()
         }
         else if(val==4){
                var parms={
                     filePath:this.currentfileyasuo
                } 
                commonunzip(parms).then(res=>{
                      if(res.data.code==0){
                          this.getcommonlist() 
                      }
                })
         }
    },
    actionfun(index) {
       this.selectedit=true
        this.moveone=true
       if(index.isDir==false){
            this.selectdelect=index.filePath
            this.selecttype=index.filePath.slice(index.filePath.lastIndexOf("."))
            this.selefilename=index.fileName.slice(0,index.fileName.lastIndexOf("."))
            
            this.seleoldpath=index.filePath
            this.currentfileyasuo=index.filePath
            console.log( this.selefilename)
       }else{
            this.currentfileyasuo=index.filePath
            this.selefilename=index.fileName
            this.seleoldpath=index.filePath
            this.selecttype=''
       }
    },

    downfile() {
      var parms = {
            path: this.delectdata
      };
       const token = sessionStorage.getItem("token");
      var  formdatas={
           path: this.delectdata,
           token:token,
      }
       commondownload(parms).then(res=>{
              if(res.data.code==0){
               window.location.href =
                        `${baseUrl}`+"/file/"+ res.data.data.fileName;
              }
          })
    },
    movefile() {
           this.movementdialogvis=true
          this.movepath = "/";
          this.movehdfs();
          this.moveone = false;
    },
     movehdfs() {
      var parms = {
         filepath: this.movepath
      };
      this.foldertableData = [];
      commonlist(parms).then(res => {
        if (res.data.code == 0) {
        this.movecurent = res.config.params.filepath.split("/").slice(1); 
          res.data.data.forEach((item, index) => {
            if (item.isDir == true) {
              item.currentpath = res.config.params.path;
              var index = item.filePath.lastIndexOf("/"); 
              item.tableName = item.filePath.slice(index + 1);

              this.foldertableData.push(item);
            }
          });
        }
      });
    },
    delect() {
      var parms = { path: this.delectdata };
      commondelete(parms).then(res => {
        if (res.data.code == 0) {
          this.getcommonlist();
        }
      });
    },

    handleCurrentChange(row, column, cell, event) {
      if (column.label == "文件名称") {
        if (row.isDir == true) {
          const datapeth = row.filePath;
          this.$router.push({
            name: "FileManagement",
            params: { id: datapeth }
          });
          this.getcommonlist();
        }
      }
    },
    filesubmit() {
      if (this.selectedit == false) {
        var parms = {
          dirName:
            this.$route.params.id == "/"
              ? "/" + this.numberValidateForm.filename
              : this.$route.params.id + "/" + this.numberValidateForm.filename
        };

        this.$refs["numberValidateForm"].validate(valid => {
          if (valid) {
            commoncreat(parms).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "创建成功"
                });
                this.$refs["numberValidateForm"].resetFields();
                this.filedialogVisible = false;
                this.getcommonlist();
              }
            });
          }
        });
      } else {
        var parms = {
          oldname: this.seleoldpath ,
          newname:
            this.$route.params.id == "/"
              ? "/"+
                this.numberValidateForm.filename +
                this.selecttype
              : 
                this.$route.params.id  +'/'+
                this.numberValidateForm.filename +
                this.selecttype
        };
        this.$refs["numberValidateForm"].validate(valid => {
          if (valid) {
            commonrename(parms).then(res => {
              if (res.data.code == 0) {
                this.$refs["numberValidateForm"].resetFields();
                this.filedialogVisible = false;
                this.getcommonlist();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        });
      }
    },
    selectcurret(item, index) {
      const pathclick = this.routermenu.slice(0, index + 1);
      this.$router.push({
        name: "FileManagement",
        params: { id: "/" + pathclick.join("/") }
      });
      this.getcommonlist();
    },
    homefile() {
      this.$router.push({ name: "FileManagement", params: { id: "/" } });
      this.getcommonlist();
    },
    progressfunc(event, file, fileList) {
      this.uploadshow = true;
      this.percentage = parseInt(event.percent);
      if (this.percentage == 100) {
        this.noicewait=true
      }
    },
    beforeAvatarUpload() {
      this.dataform.filePath =this.$route.params.id == "/" ? "/" : this.$route.params.id + "/";
      const token = sessionStorage.getItem("token");
      this.headers.token = token;
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 0) {
         this.uploadshow = false;
         this.noicewait=false
        this.reload()
      }else{
          this.$message.error(res.message)
          this.noicewait=false
           this.uploadshow = false;
          this.reload()
      }
    },
    clickmenu(val) {
      if (val == 1) {
        this.filedialogVisible = true;
        this.selectedit = false;
      }
    }
  },
  mounted() {
    this.getcommonlist();
  }
};
</script>
<style  lang='scss' scoped>
.filement {
  .picturemiddle {
    vertical-align: middle;
    margin-right: 8px;
  }
  .homefile {
    color: #7f7f7f;
    vertical-align: middle;
    margin-left: 20px;
    cursor: pointer;
  }
  .greaterthan {
    vertical-align: middle;
    color: #cbcbcb;
  }
}
  .homehdfs {
    color: #7f7f7f;
    vertical-align: middle;
   
    cursor: pointer;
  }
</style>

