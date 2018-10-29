<template>
    <el-row>
          <div class="navigationbar"> 
               <span class="navigationname">课程资源<i class="el-icon-arrow-right" aria-hidden="true"></i>
                      课程体系
                </span>
           </div>
          <el-col :span="24">
                 <el-col :span="12" style="padding:20px">
                     <div >
                        <el-input placeholder="请输入内容" v-model="searchName"  size="small" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        </div>  
                 </el-col>
                 <el-col :span="12" style="padding:20px">
                         <el-form  :model="formStructuredata" class="formStructureclass">
                            <el-form-item label="课程体系名称">
                                <el-input v-model="formStructuredata.courseStructureName" placeholder="输入课程体系名称"></el-input>
                            </el-form-item>
                            <el-form-item label="排序">
                                  <el-input v-model="formStructuredata.courseStructureOrder"></el-input>
                            </el-form-item>

                            <el-form-item label="体系描述">
                                     <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="formStructuredata.courseStructureDesc">
                                     </el-input>
                               </el-form-item>
                             <el-form-item label="上传封面图">
                                  <el-upload
                                    class="avatar-uploader"
                                    action="http://192.168.80.63:30005/api/course/upload/img"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :data="dataform"
                                    >
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                 </el-upload>
                            </el-form-item>
                     </el-form>
                 </el-col>

          </el-col>


    </el-row>
</template>
<script>
export default {
       data(){
            return{
                dataform:{
                     token:'VzQ9UjBmNDYxMmIyMDVXdG9rZW5fc2FsdA=='
                },
                 imageUrl: '',
                 searchName:"",
                 formStructuredata:{
                        courseStructureName:'',
                        courseStructureOrder:"",
                        courseStructureDesc:"",  

                 }
            }
       },
       methods:{
                handleAvatarSuccess(res, file) {
                   // this.imageUrl = URL.createObjectURL(file.raw);
                         console.log('上传')
                        console.log(res)
                        console.log(file)
                
                },
                beforeAvatarUpload(file){
                       const token = sessionStorage.getItem('token')
                        this.dataform.token=token      
                }

       },
       mounted(){
            
       }


}
</script>
  <style  lang="scss"   scoped>
  
  </style>
 <style>
       .formStructureclass .el-form-item{
              margin-bottom:0px;
       }
 </style>
 

