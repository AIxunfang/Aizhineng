<template>
        
      <el-row>
            <el-col :span="24">
                        <div class="navigationbar"> 
                              <span class="navigationname">课程资源<i class="el-icon-arrow-right" aria-hidden="true"></i>
                                    课程资料
                              </span>
                        </div>
            </el-col>
           <el-col :span="24">
                    <el-form style="margin: 20px   20px 0px 20px" :inline="true"  size="small">
                           <el-form-item   >
                                     <el-select v-model="formStructuredata.selectType" placeholder="请选择所属体系" @change="changeseleval"   >
                                                <el-option
                                                      v-for="item in optionstixi"
                                                      :key="item.createTime"
                                                      :label="item.courseStructureName"
                                                      :value= item.courseStructureId>
                                                </el-option>
                                          </el-select> 
                          </el-form-item>
                           <el-form-item    >
                                        <el-select v-model="formStructuredata.selectTypemodel" placeholder="请选择分类"  @change="changeclass"  >
                                                  <el-option
                                                         v-for="item in datamodel"
                                                        :key="item.createTime"
                                                        :label="item.courseClassificationName"
                                                        :value="item.courseClassificationId">
                                                  </el-option>
                                            </el-select>  
                         </el-form-item>
                    </el-form>
           </el-col>

            <el-col :span="24">
               <el-button type="primary" size="small"  style="margin:0px  20px;"  @click="addcouses"  >新增</el-button>
            </el-col>
            <el-col :span="24" >
                     <div style="margin:20px">
                       <el-table
                        size="mini"
                         border
                        :data="informationtableData"
                        style="width: 100%;">
                        <el-table-column 
                        prop="courseMaterialName"
                        label="资料名称"
                        width="220"
                        >
                        </el-table-column>
                        <el-table-column
                        label="创建时间"
                        width="180"
                      >
                       <template  slot-scope="scope">
                              {{timeFormattershowsecod(scope.row.createTime)}}
                       </template>
                        </el-table-column>
                       <el-table-column label="所属体系">
                              <template slot-scope="scope">
                               <div class="blockcasertable">
                                      <el-cascader
                                          placeholder="无"
                                            size="mini"
                                              :disabled="true"
                                              :options="optionselect"
                                               v-model="informationtableData[scope.$index].contdata "    
                                        >
                                      </el-cascader>
                                    </div> 
                              </template>

                       </el-table-column>
                        <el-table-column
                        width="180"
                        label="操作">
                        <template slot-scope="scope">
                              <el-button  type="primary" size="mini"  round  @click="editMeterial(scope.row)"  >编辑</el-button>
                              <el-button  type="danger" size="mini"  round  @click="delectmeterial(scope.row)" >删除</el-button>
                        </template>
                        </el-table-column>
                     </el-table>
                 </div>

            </el-col>
            <el-col :span="24">
                 <el-dialog
                        :title="titlename"
                        :visible.sync="CoursedialogVisible"
                         width="600px"
                         @close="closeCourse"
                       >
                     <el-form   :model="cousecouseformInline"  class="formcourse" label-width="100px" :rules="rules" ref="cousecouseformInline"   >
                               <el-form-item label="上传资料" prop="materialUrl">
                                        <el-upload
                                                :action="`${baseUrl}`+'/course/upload/material'"
                                                :show-file-list="false"
                                                :on-success="handleAvatarSuccess"
                                                 accept=".zip"
                                                
                                                  :data="dataform"
                                                 :before-upload="beforeAvatarUpload">
                                                    
                                                    <el-button type="success" size="mini" >添加</el-button>
                                                    
                                                </el-upload>
                              </el-form-item>
                              <el-form-item label="资料名称" prop="courseMaterialName">
                                    <el-input v-model="cousecouseformInline.courseMaterialName" placeholder="上传后自动获取"></el-input>
                              </el-form-item>
                              <el-form-item label="所属体系" prop="selectedOptions">
                                  <div class="blockcaser" >
                                      <el-cascader
                                            
                                              :options="optionselect"
                                              v-model="cousecouseformInline.selectedOptions" 
                                              @change="changeval"
                                             
                                        >
                                      </el-cascader>
                                    </div>      
                              </el-form-item>
                              <el-form-item  label="资料描述">
                                     <el-input
                                          type="textarea"
                                          :rows="2"
                                          placeholder="请输入内容"
                                          v-model="cousecouseformInline.courseMaterialDesc">
                                     </el-input>
                              </el-form-item>
                   </el-form>  
                        <span slot="footer" class="dialog-footer">
                             
                              <el-button type="primary"  size="mini" @click="savedata" >确 定</el-button>
                        </span>
                  </el-dialog>
            </el-col>
            <el-col :span='24'>
            <div class="paagenumber">
                  <el-pagination
                              background
                              layout="prev, pager, next, total"
                              :page-size='pageSize'
                              @current-change="pageIndexChange"
                              :total="paggtatol">
                  </el-pagination>
            </div>
            </el-col>



      </el-row>
</template>
<script>
import {baseUrl} from '../../../static/baseurl'
import { timeFormattershowsecod } from "@/assets/js/common";
import {
  courseContentpage,
  courseStructurepage,
  courseClassificationpage,
  addcourseMaterial,
  courseMaterialpage,
  delectcourseMaterial,
  updatecourseMaterial
} from "@/api/api";
export default {
  data() {
    return {
      baseUrl,
      couredit:'',
      timeFormattershowsecod,
      informationtableData: [],
      formStructuredata: {
        selectType: "",
        selectTypemodel: ""
      },
      currentPage: 1,
      pageSize: 10,
      paggtatol: null,
      datamodel: [],
      optionstixi: [],
      CoursedialogVisible: false,
      cousecouseformInline: {
        courseMaterialName: "",
        selectedOptions: [],
        materialUri: "",
        materialUrl: "",
        courseMaterialDesc: "",
        courseContentId: "",
        courseClassificationId: "",
        courseStructureId: ""
      },
      titlename: null,
      optionselect: [],
      dataform: {
        token: ""
      },
      uploadname: "",
      rules: {
        materialUrl: [
          { required: true, message: "选择上传的zip", trigger: "change" }
        ],
        selectedOptions: [
          {
            type: "array",
            required: true,
            message: "选择所属体系",
            trigger: "change"
          }
        ],
        courseMaterialName: [
          { required: true, message: "名称不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    getcourseStructurepage() {
      var params = {
        currentPage: 1,
        pageSize: 100
      };
      courseStructurepage(params).then(res => {
        console.log("tixi");
        console.log(res);

        if (res.data.code == 0) {
          this.optionstixi = res.data.data.list;
        }
      });
    },
    changeclass(val) {
      this.formStructuredata.selectTypemodel = String(val);
      this.getcourseMaterialpage();
    },
    delectmeterial(index) {
      var parms = {
        courseMaterialId: index.courseMaterialId
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delectcourseMaterial(parms).then(res => {
            if (res.data.code == 0) {
              this.getcourseMaterialpage();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    pageIndexChange(index) {
      this.currentPage = index;
      this.getcourseMaterialpage();
    },
    closeCourse(){
        this.cousecouseformInline.courseMaterialName=""
        this.cousecouseformInline.selectedOptions= []
        this.cousecouseformInline.materialUri= ""
        this.cousecouseformInline.materialUrl= ""
        this.cousecouseformInline.courseMaterialDesc= ""
        this.cousecouseformInline.courseContentId= ""
         this.cousecouseformInline.courseClassificationId= ""
         this.cousecouseformInline.courseStructureId= "" 
    },
    changeseleval(val) {
      this.formStructuredata.selectTypemodel = "";
      var parms = {
        currentPage: 1,
        pageSize: 10000,
        courseStructureId: String(val)
      };
      courseClassificationpage(parms).then(res => {
        if (res.data.code == 0) {
          this.datamodel = res.data.data.list;
        }
      });
    },
    getcourseMaterialpage() {
      var parms = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        courseClassificationId: this.formStructuredata.selectTypemodel
      };
      courseMaterialpage(parms).then(res => {
        if (res.data.code == 0) {
          this.informationtableData = res.data.data.list;
          this.paggtatol = res.data.data.total;
          this.informationtableData.forEach((item, index) => {
            item.contdata = [
              item.courseStructureId,
              item.courseClassificationId,
              item.courseContentId
            ];
          });
        }
      });
    },
    changeval(val) {
      this.cousecouseformInline.courseStructureId = val[0];
      this.cousecouseformInline.courseClassificationId = val[1];
      this.cousecouseformInline.courseContentId = val[2];
    },
    beforeAvatarUpload(file) {
      this.loading = true;
      const token = sessionStorage.getItem("token");
      this.dataform.token = token;
    },
    handleAvatarSuccess(res, file) {
      if (file.status == "success") {
        this.cousecouseformInline.courseMaterialName = file.name.slice(
          0,
          file.name.length - 4
        );
        this.cousecouseformInline.materialUri = file.response.data.materialUri;
        this.cousecouseformInline.materialUrl = file.response.data.materialUrl;
      }
    },
    savedata() {
      if (this.titlename == "新增") {
        this.$refs["cousecouseformInline"].validate(valid => {
          if (valid) {
            addcourseMaterial(this.cousecouseformInline).then(res => {
              if (res.data.code == 0) {
                this.$refs["cousecouseformInline"].resetFields();
                this.CoursedialogVisible = false;
                 this.getcourseMaterialpage() 
              }
            });
          }
        });
      }else{
           this.cousecouseformInline.courseMaterialId= this.couredit           
           updatecourseMaterial(this.cousecouseformInline).then(res=>{
                     if(res.data.code==0){
                            this.$message({
                                  type:"success",
                                  message:"编辑成功"
                            })
                             this.$refs["cousecouseformInline"].resetFields();
                              this.CoursedialogVisible = false;
                             this.getcourseMaterialpage()  
                             
                     }
             })
        }
    },
   editMeterial(index){
         this.titlename ="编辑"
         this.CoursedialogVisible = true;
        this.cousecouseformInline.courseMaterialName=index.courseMaterialName
        this.cousecouseformInline.selectedOptions=index.contdata
        this.cousecouseformInline.materialUri=index.materialUri
        this.cousecouseformInline.materialUrl=index.materialUrl
        this.cousecouseformInline.courseMaterialDesc=index.courseMaterialDesc
         this.cousecouseformInline.courseContentId=index.courseContentId
        this.cousecouseformInline.courseClassificationId=index.courseClassificationId
        this.cousecouseformInline.courseStructureId=index.courseStructureId
            this.couredit=index.courseMaterialId    
   },                 
    addcouses() {
      this.CoursedialogVisible = true;
      this.titlename = "新增";
    },
    focusdata() {
      var params = {
        currentPage: 1,
        pageSize: 100
      };
      courseStructurepage(params).then(res => {
        if (res.data.code == 0) {
          let lists = res.data.data.list;
          lists.forEach((item, index) => {
            this.optionselect.push({
              label: item.courseStructureName,
              value: item.courseStructureId,
              children: []
            });
            this.Stairarryindex = this.optionselect;
          });
          this.Stairarryindex.forEach((item, indexcas) => {
            var parms = {
              currentPage: 1,
              pageSize: 1000,
              courseStructureId: this.optionselect[indexcas].value
            };
            courseClassificationpage(parms).then(res => {
              let cascChid = [];
              cascChid = res.data.data.list;
              var _this = this;
              if (res.data.code == 0) {
                cascChid.forEach((item, index) => {
                  this.optionselect[indexcas].children.push({
                    label: item.courseClassificationName,
                    value: item.courseClassificationId,
                    children: []
                  });
                  var parms = {
                    currentPage: 1,
                    pageSize: 1000,
                    courseClassificationId: this.optionselect[indexcas]
                      .children[index].value
                  };
                  let conentchid = [];
                  courseContentpage(parms).then(res => {
                    conentchid = res.data.data.list;
                    conentchid.forEach((item, contentindex) => {
                      this.optionselect[indexcas].children[index].children.push(
                        {
                          label: item.courseContentName,
                          value: item.courseContentId
                        }
                      );
                    });
                  });
                });
              }
            });
          });
        }
      });
    }
  },
  mounted() {
    this.focusdata();
    this.getcourseStructurepage();
    this.getcourseMaterialpage();
  }
};
</script>
<style scoped>
.formcourse .el-cascader {
  width: 462px;
}
.blockcasertable .el-cascader {
  width: 100%;
}
</style>


<style>
.blockcasertable .el-input__inner {
  border: none !important;
  background-color: #fff !important;
}
.blockcasertable .el-cascader__label {
  color: #606266 !important;
}

.blockcasertable .el-input__suffix {
  display: none;
}
</style>

