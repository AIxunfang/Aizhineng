<template>
      <el-row class="shareprojectmodel">
          <el-col :span='24'>
                  <div class="navigationbar"> 
                    <span class="navigationname">项目分享<i class="el-icon-arrow-right" aria-hidden="true"></i>
                          公共资源
                      </span>
                  </div>
          </el-col>
          <el-col  :span="24">
                   <el-col :span="24">
                            <div style="margin:20px">
                             <el-tabs v-model="SelectType" @tab-click="Select_handleClick" >
                                  <el-tab-pane    
                                     v-for="(item,index) in  modelnamedata"
                                     :key="index"
                                      :name="item.index"
                                     :label="item.value">
                                   </el-tab-pane>
                             </el-tabs>
                          </div>
                   </el-col>
                   <el-col :span="24" >
                        <template v-for="item in sharedata">
                         <div class="sharemodel" :key="item.shareId">
                               <div style="padding:10px ; cursor:pointer"  @click="lookapi(item)">
                               <img  :src="`${baseUrl}/file/${item.imgUrl}`" style="height:160px" width="100%"  > 
                             </div>
                            <div  style="margin:10px">
                                {{item.publishName}}
                                <span v-if="item.publishType==1" class="modeltype">
                                     其他  
                                </span>
                                <span v-if="item.publishType==2" class="modeltype">
                                    人脸识别 
                                </span>
                             <span v-if="item.publishType==3" class="modeltype">
                                     文字识别 
                                </span>
                                <span v-if="item.publishType==4" class="modeltype">
                                    图像分类 
                                </span>
                                <span v-if="item.publishType==5" class="modeltype">
                                    视频分类
                                </span>
                            </div>
                         </div>
                       </template>
                   </el-col>   
          </el-col>
      </el-row>
</template>
<script>
import{modeltype,projectSharefinduserName} from "@/api/api"
import {baseUrl} from '../../../static/baseurl'
export default {
         data(){
            return{
                  baseUrl,
                  SelectType:'',
                  modelnamedata:[],
                  currPage:1,
                  pageSize:8,
                  sharedata:[],

            }
         },
         methods:{
                  getmodeltype(){
                      modeltype().then(res=>{
                               if(res.data.code==0){
                                     this.modelnamedata=res.data.data
                               }
                               this.modelnamedata.forEach((item,index)=>{
                                       this.modelnamedata[index].index=String(item.index)
                               }) 
                      })
                 },
                 Select_handleClick(tab){
                          this.getprojectShare() 
                 },
                 getprojectShare(){
                        var params={
                            currPage:this.currPage,
                             pageSize:this.pageSize,
                             type:Number(this.SelectType)
                        }
                          projectSharefinduserName(params).then(res=>{
                                          if(res.data.code==0){
                                                this.sharedata=res.data.data.list  
                                          }
                          })
                 },
                 lookapi(index){
                     this.$router.push({name:"ModelformDetail",params:{id:index.publishId,projectId:index.projectId,isshare:false}})           
                 },


         },
         mounted(){
             this.getmodeltype()
             this.getprojectShare()
         }
}
</script>
<style lang="scss" scoped>
      .shareprojectmodel{
             .sharemodel{
                   width: 240px;
                   height: 220px;
                   border: 1px solid #dedede;
                   border-radius:5px;
                   margin-left: 20px;
                   display: inline-block;
                   margin-bottom: 20px;
             } 
             .modeltype{
                float:right;
                margin-right: 10px;
             }
      }     
</style>
