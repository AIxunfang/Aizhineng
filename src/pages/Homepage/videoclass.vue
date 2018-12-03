<template>
    <el-row>
      <el-col :span="24">
          <div class="navigationbar"> 
               <span class="navigationname">首页<i class="el-icon-arrow-right" aria-hidden="true"></i>
              课程体系<i class="el-icon-arrow-right" aria-hidden="true"></i>课程分类<i class="el-icon-arrow-right" aria-hidden="true"></i>课程模块
             <i class="el-icon-arrow-right" aria-hidden="true"></i>课程视频
                </span>
           </div>
           <span style="margin:15px 0px 0px 20px;display:inline-block; font-size:12px;">{{titlename}}</span>
          <el-button type="primary" size="mini"  style="float:right;margin:10px 20px 10px 0px" @click="goback"  >返回上一级</el-button>
         </el-col>
              <el-col :span="24" class="videobackground" >
                   <el-col :span='15' >
                        <div  class="videoplaystyle">
                        <video   
                                poster='../../assets/img/backvideo.jpg'
                                :src="videosrc" 
                                class="videoplayer" 
                                controls="controls"
                            >
                        </video>
                        </div>
                   </el-col>
                    <el-col :span="9">
                        <div style="padding:20px;height:400px;overflow-y: auto" >
                                <div v-for="(item,index) in videourlshowdata " :key="item.index">
                                <div style="height:35px;">
                                    <p style="height:20px;margin-bottom:10px;" @click="current(index)"  :class="select===index ?'active':'activefalse'" >
                                       
                                        <span     >{{ index+1}}、</span>
                                        <span    >{{   item.videoName.slice(0,15)   }}</span>
                                        <span style="float:right;display:inline-block;margin-right:84px;">{{item.videoDuration}}分</span>
                                    </p> 
                                </div>
                            </div>
                        </div> 
                   </el-col>
               </el-col>
                      <el-col :span="24" style="padding:20px 100px 0px 100px">
                            <el-col :span="6">
                                  <span style="padding:10px;"> {{this.$route.params.CourseDesc}}</span>  
                                 <div style="margin-top:40px;" > 
                                          <el-button type="primary" size="mini" @click="downcourse">
                                             下载课程
                                            
                                           </el-button>
                                         </div> 
                            </el-col>
                      </el-col>     

    </el-row>
</template>
<script>
import {baseUrl} from '../../../static/baseurl'
import{videoResourcepage,findcourseMaterial}from "@/api/api"
export default {
    data(){
          return{
              videosrc:'',
              videourlshowdata:[],
              select:0,
              titlename:'',
          }
    },
    methods:{
        getvideo(){
            var parms={
                         currentPage:1,
                         pageSize:100, 
                         courseContentId:this.$route.params.videoid
            }
            videoResourcepage(parms).then(res=>{
               console.log('视频')
                console.log(res)
                    if(res.data.code==0){      
                            if(res.data.data.list.length>0){
                                   this.videourlshowdata=res.data.data.list
                                  this.videosrc =`${baseUrl}`+'/file/'+res.data.data.list[0].videoUrl;
                                  this.titlename=res.data.data.list[0].videoName

                            }   
                    }
            })
        },
       current(index){
               this.select=index
               this.videosrc =`${baseUrl}`+'/file/'+this.videourlshowdata[this.select].videoUrl
                 this.titlename=this.videourlshowdata[this.select].videoName
       },
      goback(){
            this.$router.go(-1)
      },
        downcourse(){
              var parms={
                    courseContentId:this.$route.params.videoid
              }
              console.log(parms)
             findcourseMaterial(parms).then(res=>{
                     console.log("====")
                     console.log(res)
                     if(res.data.code==0){
                          window.location.href= `${baseUrl}`+'/file/'+res.data.data.materialUrl
                     }
             })
        },

    },
    mounted(){
        console.log(this.$route.params.videoid)
        //  if(this.$route.params.CourseDesc==undefined){
        //      return;
        //  }else{
        //      console.log(this.$route.params.CourseDesc)
        //  }
         this. getvideo()
    }

}
</script>
<style scoped>
    .videoplayer{
         height:379px;
    }
    .videoname{
             font-size: 14px;
             color: #333;
    }

     .videoplaystyle{
         margin-left: 20px;
      
     } 
    .videodec{
         font-size: 12px;
         color: #999;
    }
    .active{
        color: #35b558;
        cursor: pointer;
    }
    .activefalse{
         color: #fff;
    }
   .videobackground{
       height: 400px;
       background-color:black ;
   }
</style>


