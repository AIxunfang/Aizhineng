<template>
  <el-row class="addmodel">
      <el-col :span='24'>
             <div class="navigationbar"> 
              <span class="navigationname">模型管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                    模型发布
              </span>
            </div>
         </el-col>
         <el-col :span="24">
             <div class="selectmodelform">
                <el-form :inline="true" :model="mdoelform" class="demo-form-inline">
                     <div>
                        <el-form-item label="发布名称">
                             <el-input v-model="mdoelform.selectproject"></el-input>
                        </el-form-item>
                        <el-form-item label="镜像名称">
                             <el-input v-model="mdoelform.selectproject"></el-input>
                        </el-form-item>


                     </div>
                     <div> 
                        <el-form-item label="选择项目">
                            <el-select v-model="mdoelform.selectproject" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择模型">
                            <el-select v-model="mdoelform.peojectmodel" placeholder="选择模型">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                   </div> 



                    <div>
                         <el-form-item label="选择参数"> 
                                    <el-cascader
                                        :options="options"
                                        v-model="selectedOptions"
                                       >
                                    </el-cascader>
                         </el-form-item>
                         <el-form-item>
                             <el-button size="small" type="primary">解析参数</el-button>
                         </el-form-item>
                    </div>

                </el-form>
             </div>
         </el-col>
  </el-row>
</template>
<script>
export default {
        data(){
            return{
                mdoelform:{
                    selectproject:"",
                    peojectmodel:'', 
                },
                selectedOptions:[],
                options: [
                    {
                    value: 'shejiyuanze',
                     label: '设计原则',   
                    },
                     {
                      value: 'kekong',
                     label: '可控'
                     }
                ]
 
            }
      }
}
</script>
<style lang="scss" scoped>
     .addmodel{
        .selectmodelform{
             margin: 40px;
        }   
     }
</style>