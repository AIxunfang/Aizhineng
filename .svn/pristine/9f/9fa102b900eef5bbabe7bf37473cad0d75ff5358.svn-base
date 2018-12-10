<template>
  <el-row class="ModelDetail">
      <el-col :span="24">
          <div class="navigationbar"> 
               <span class="navigationname">发布管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                   接口测试
                </span>
            </div>
             <div class="modeldataname">
                   <span class="modelnameclasstop">发布开始时间:{{timeFormattershowsecod(publishfindmodel.publishTime)}}</span> 
                   <span class="modelnameclasstop">发布名称:{{publishfindmodel.publishName}}</span> 
                    <span class="modelnameclasstop" v-show="shareprojectpub">所属项目:{{publishfindmodel.projectName}}</span> 
                   <span class="modelnameclasstop" v-show="shareprojectpub">训练名称:{{publishfindmodel.trainingName}}</span>
                    <span class="modelnameclasstop">发布人:{{publishfindmodel.userAccount}}</span> 
             </div>
      </el-col>
     <el-col :span="24">
          <div v-show="shareprojectpub">
              <el-button size="mini" type="primary" style="float:right;margin:20px;50px; 0px ;0px;" @click="Creat_share"> 
                     创建分享
              </el-button>
          </div>
         <el-dialog
                title="分享描述"
                :visible.sync="sharedialogVisible"
                width="30%"
                >
               <el-form :model="describeValidateForm" ref="describeValidateForm" label-width="50px" class="demo-dynamic">
                        <el-form-item
                            prop="shareDescribe"
                            label="描述"
                            :rules="[
                            { required: true, message: '请输入分享描述', trigger: 'blur' },
                            ]"
                        >
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="describeValidateForm.shareDescribe">
                            </el-input>
                        </el-form-item>
               </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button  size="mini">取 消</el-button>
                    <el-button  type="primary" size="mini" @click="Share_Project"  >确 定</el-button>
                </span>
         </el-dialog>
     </el-col>
      <el-col :span="24"  >
              <el-col :span="16">
                      <div style="margin:20px">
                        <el-carousel  type="card" height="200px" indicator-position="none"   :autoplay="false"   ref="carousel"   @change="pictrueclick">
                                <el-carousel-item v-for="(item,index) in picturedata" :key="item.id" trigger="click"  >
                                          <img  :src="`${baseUrl}/file/${item.resourceUrl}`"   style="width:330px;height:200px" @click="changepic(index)"  >
                                </el-carousel-item> 
                            
                            </el-carousel>
                       </div>
                      <div style="margin:20px" >
                              <el-button  type="primary" size="small" @click="uploadpic"  v-show="shareprojectpub">上传图片</el-button>
                           <div  style="display:inline-block;margin-left:15px">
                                <el-input placeholder="请输入内容" v-model="pictureurlreadonly" class="inputselect" readonly="readonly">
                                    <el-button slot="append" type="primary"  @click="Detection"  :disabled="fobenbut">检测</el-button>
                                </el-input>
                           </div>
                     </div>
                 <el-dialog
                     title="上传"
                    :visible.sync="uploaddialogVisible"
                     width="30%"
                     @close="closevisble"
                    >
                    <form enctype="multipart/form-data" method="post" id="fileform">  
                         <input type="file" id="uploadid" accept="image/*" > 
                    </form>

                    <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="uploaddialogVisible=false" >取 消</el-button>
                        <el-button type="primary" size="small"  @click="sure" >确 定</el-button>
                    </span>
                 </el-dialog> 

              </el-col>
              <el-col :span="8">
                      <div style="margin:20px;">
                          <pre  class="textareavalue" ><code id="json">{{textjson}}</code></pre>
                      </div>
              </el-col>
      </el-col>
      <el-col :span="24" v-show='issharedown'  >
             <div  style="float:right;margin-right:60px">
               <el-button type="primary" size="mini" @click="downloaddata" >
                 下载案例
                 </el-button>

              </div>
      </el-col>
      <el-col :span="24"  v-show="unzip" >
                 <div  style="float:right;margin:20px 60px 0px 0px" >
                    <div style="height: 180px;">
                        <el-steps direction="vertical" :active="astep"  finish-status="success">
                          <el-step title="查找资源"></el-step>
                          <el-step title="压缩中稍等.."></el-step>
                          <el-step title="开始下载" ></el-step>
                        </el-steps>
                      </div>
                </div>
      </el-col>

  </el-row>
</template>
<script>
import {baseUrl} from '../../../static/baseurl'
import { timeFormattershowsecod } from "@/assets/js/common";
import {
  publishfinddetail,
  publishimglist,
  publishtestapi,
  projectShareadd,
  projectSharedownload,
  publishrestart
} from "@/api/api";
export default {
  data() {
    return {
      baseUrl,
      astep:0,
      unzip:false,
      pictureurlreadonly:'',
      issharedown:false,
      shareprojectpub: true,
      sharedialogVisible: false,
      fobenbut: false,
      loading: true,
      filetreams: "", //发送的文件流
      uploaddialogVisible: false,
      pictureurl: "",
      imgUrl: "", //创建的时候发给后台
      timeFormattershowsecod,
      publishfindmodel: {},
      publishdata: [],
      picturedata: [],
      autoplay: true,
      textjson: null,
      describeValidateForm: {
        shareDescribe: ""
      },
      sendpicturedata: []
    };
  },
  methods: {
    getpublishfinddetail() {
      var parms = {
        publishId: this.$route.params.id
      };
      publishfinddetail(parms).then(res => {
        if (res.data.code == 0) {
          this.publishfindmodel = res.data.data.publishModel;
          this.publishdata = res.data.data.tfParams;
        }
      });
    },
    getpublishimglist() {
      var parms = {
        publishId: this.$route.params.id
      };
      publishimglist(parms).then(res => {
        if (res.data.code == 0) {
          this.picturedata = res.data.data;
        }
      });
    },
    pictrueclick(index) {
      this.autoplay = false;
      var imagread=index
      this.imgUrl = this.picturedata[index].resourceUrl;
      this.pictureurl = this.picturedata[index].resourceUri;
      var imgread=this.picturedata[index].resourceUri
      const readdataimg= imgread.indexOf('images')
      this.pictureurlreadonly=imgread.substring(readdataimg)
    },

    changepic(index) {
    },

    uploadpic() {
      this.uploaddialogVisible = true;
    },
    closevisble() {
      document.getElementById("fileform").reset();
    },
    sure() {
      var _this = this;
      this.filetreams = document.getElementById("uploadid").files[0];
      const token = sessionStorage.getItem("token");
      let formData = new FormData();
      formData.append("file", this.filetreams);
      formData.append("publishId", this.$route.params.id);
      formData.append("token", token);
      $.ajax({
        type: "post",
        cache: false,
        processData: false,
        contentType: false,
        headers: { token: token },
        mimeType: "multipart/form-data",
        url: `${baseUrl}`+"/publish/upload/img",
        data: formData,
        success: function(res) {
          var parseres = JSON.parse(res);
          if (parseres.code == 0) {
            _this.$message({
              type: "success",
              message: "上传成功"
            });
            _this.uploaddialogVisible = false;
            _this.getpublishimglist();
          } else {
            _this.$message.error(parseres.message);
          }
        },
        error: function(res) {
        }
      });
    },
    Detection() {
      //检测
      this.fobenbut = true;
      var parms = {
        param: this.pictureurl,
        publishId: this.$route.params.id
      };
      publishtestapi(parms).then(res => {
        if (res.data.code == 0) {
          this.fobenbut = false;
        if(  res.data.data.response !==''){
           this.textjson = JSON.parse(res.data.data.response);
        }else if(res.data.data.response =='') {
                    if( this.shareprojectpub==true){
                         this.$confirm('接口异常, 是否重启?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'error'
                          }).then(() => {
                                   var parms={
                                          publishId:this.$route.params.id
                                   }
                                publishrestart(parms).then(res=>{
                                         if(res.data.code==0){
                                              this.$message({
                                                 type:"success",
                                                 message:'重启成功'
                                              })
                                            this.getpublishfinddetail()
                                         }else{
                                                this.$message('重启失败!') 
                                         }
                                })
                          }).catch(() => {
                            this.$message({
                              type: 'info',
                              message: '已取消'
                            });          
                          });        
                    }else{
                        this.$message.error('接口异常!请联系发布人')
                }
           }
        }
      });
    },
    Creat_share() {
      this.sharedialogVisible = true;
    },
    Share_Project() {
      var parms = {
        publishId: this.$route.params.id,
        projectId: this.$route.params.projectId,
        imgUrl: this.imgUrl,
        detail: this.describeValidateForm.shareDescribe
      };
      if (this.imgUrl == "") {
        this.$message.error("请先上传图片或选择列表图片");
      } else {
        this.$refs["describeValidateForm"].validate(valid => {
          if (valid) {
            projectShareadd(parms).then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "创建分享成功"
                });
                this.$router.push("/ShareList");
                this.sharedialogVisible = false;
                this.$refs["describeValidateForm"].resetFields();
              } else {
                this.$message.error("已经创建过分享,请在分享列表查看");
              }
            });
          }
        });
      }
    },
    getshare(){
    },
 downloaddata(){
         var parms={
                projectId:this.$route.params.projectId
         }
         this.unzip=true
         this.astep=1
          setTimeout(()=>{
                    this.astep=2
               },3000) 
         projectSharedownload(parms).then(res=>{
                    if(res.data.code==0){
                          setTimeout(()=>{
                              this.astep=3
                              this.unzip=false
                              window.location.href= `${baseUrl}`+'/file/'+res.data.data.fileName
                          },3000)
                       }
         })
 },
  },
  mounted() {
    if (this.$route.params.isshare == false||this.$route.params.isshare == 'false') {
            this.shareprojectpub = false;
            this.issharedown=true
       }
       if(this.$route.params.isshare == true||this.$route.params.isshare == 'true'){
             this.issharedown=false
              this.shareprojectpub = true;
       }
    this.getpublishfinddetail();
    this.getpublishimglist();
    this.getshare()
  }
};
</script>
<style lang="scss" scoped>
.ModelDetail {
  .modelnameclasstop {
    margin-left: 20px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.inputselect {
  width:445px;
}
.uploaddemo {
  display: inline-block;
}
.textareavalue {
  width: 222px;
  height: 255px;
  border: 1px solid #efefef;
  background: #efefef;
  overflow-y: auto;
}
</style>