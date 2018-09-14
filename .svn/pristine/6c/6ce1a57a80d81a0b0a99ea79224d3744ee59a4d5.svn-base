<template>
  <el-row class="modeldatail">
     <el-col :span='24'>
             <div class="navigationbar"> 
                 <span class="navigationname">模块管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                        训练详情
                 </span>
            </div>
             <div class="modeldataname">
                  <span class="modelnameclasstop">模块名称:深圳大学单的动物的</span> 
                  <span class="modelnameclasstop">创建时间:2018-08-07 02:56</span>
                   <span class="modelnameclasstop">训练开始时间:2018-08-07 02:56</span>
                    <span class="modelnameclasstop">训练完成时间:2018-08-07 02:56</span>
             </div>
      </el-col>
      <el-col :span="24">
             <div style="margin:40px">
                 <el-form :inline="true" label-width="80px"> 
                     <div>
                        <el-form-item label="所属项目:" >
                                <el-input v-model="ptojectname"></el-input>
                        </el-form-item>
                         <el-form-item label="模型类别:" >
                              <el-input v-model="ptojectname"></el-input>
                      </el-form-item>
                      <span style="display:inline-block;float:right">
                          <el-button type="primary" size="small" @click="goback">返回</el-button>
                      </span>
                      </div>
                       <div>
                        <el-form-item label="运行内存:" >
                                <el-input v-model="ptojectname"></el-input>
                        </el-form-item>
                         <el-form-item label="镜像名称:" >
                              <el-input v-model="ptojectname"></el-input>
                      </el-form-item>
                      </div>                     
                       <div>
                        <el-form-item label="参数脚本:" >
                                <el-input v-model="ptojectname"></el-input>
                        </el-form-item>
                         <el-form-item label="训练脚本:" >
                              <el-input v-model="ptojectname"></el-input>
                      </el-form-item>
                      </div>    
                       <div>
                           <el-form-item label="模块描述"  class="discribemodel">
                                   <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="ptojectname">
                                        </el-input>
                           </el-form-item>
                           <el-form-item label="运行内存">
                                    <el-input v-model="ptojectnamecpu"></el-input>
                           </el-form-item>



                       </div>
                 </el-form>
                  <div style="width:600px;margin-top:40px;">
                         <el-collapse accordion>
                                    <el-collapse-item>
                                        <template slot="title">
                                         解析参数详情<i class="header-icon el-icon-info"></i>
                                        </template>
                                        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                                        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                                    </el-collapse-item>
                        </el-collapse>
                  </div>


             </div>

      </el-col>
  </el-row>
</template>
<script>
export default {
          data(){
              return{
                ptojectname:"深圳学校",
                ptojectnamecpu:"cpu"
              }
          },
          methods:{
              goback(){
                     this.$router.go(-1)
              }
          }
}
</script>
<style lang="scss" scoped>
     .modeldatail{
         .modelnameclasstop{
              margin-left: 20px;
 
         }  
     }   
</style>
<style>
      /* .discribemodel .el-form-item__content{
                 width: 500px;
      }  */
</style>

