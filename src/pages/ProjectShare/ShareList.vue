<template>
   <el-row>
         <el-col :span='24'>
            <div class="navigationbar"> 
               <span class="navigationname">项目分享<i class="el-icon-arrow-right" aria-hidden="true"></i>
                      分享列表
                </span>
            </div>
         </el-col>
         <el-col :span="24">
              <div style="margin:20px">
                <el-table
                  :data="sharetableData"
                   border
                  style="width: 100%">
                  <el-table-column
                    prop="projectNameZh"
                    label="项目名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="cpu"
                    label="CPU"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="gpu"
                    width="80"
                    label="GPU">
                  </el-table-column>
                   <el-table-column
                    prop="memory"
                     width="80"
                    label="内存">
                  </el-table-column>                
                  <el-table-column
                    prop="detail"
                    label="分享描述">
                  </el-table-column>
                  <el-table-column
                  width="180"
                    label="操作">
                    <template slot-scope="scope">
                         <el-button type="primary" size="mini">公开</el-button>
                         <el-button type="warning" size="mini">终止</el-button>
                    </template>
                  </el-table-column>
                </el-table>   
            </div>
         </el-col>
         <el-col :span="24">

         </el-col>
           


   </el-row>
</template>
<script>
import {projectSharelist} from "@/api/api"
export default {
            data(){
                return{
                    currPage:1,
                    pageSize:10,
                    sharetableData:[],
                }
            },
            methods:{
                 
                 getprojectSharelist(){
                       
                        var parms={
                               currPage:this.currPage,
                               pageSize:this.pageSize  
                        }
                      
                      projectSharelist(parms).then(res=>{
                              if(res.data.code==0){
                                   console.log("=========")
                                    console.log(res)
                                    this.sharetableData=res.data.data.list
                              } 
                      })
                 }
            },
            mounted(){
                    this.getprojectSharelist()
            }

}
</script>
<style lang="scss" scoped>

</style>
