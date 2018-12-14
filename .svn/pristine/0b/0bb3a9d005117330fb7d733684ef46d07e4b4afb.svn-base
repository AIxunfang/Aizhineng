<template>
  <el-row class="modeltable">
         <el-col :span='24'>
             <div class="navigationbar"> 
              <span class="navigationname">模型管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                    发布模型列表
              </span>
            </div>
              <div class="seachframe">
                 <div  class="formdata">
                        <el-form :inline="true" >
                              <el-form-item  >
                                    <el-input v-model="publishName"></el-input>         
                              </el-form-item>
                              <el-form-item>
                                <el-button type="primary" icon="el-icon-search"  size="small"  @click="seeabout" >查询</el-button>
                              </el-form-item>
                        </el-form>
                   </div>
            </div>
         </el-col>
              <el-col :span="24">
              <div class="projectaddbox  projectmodel">
                    <div class="prijectaddpic"  @click="addpushmode" ></div>
              </div>
             <div   class="projectmodel" v-for="(item,index) in distributelist" :key="item.id">
                  <div  class="projectdiscrb">
                          <div class="projectdimg" >
                            <img src="../../assets/img/modelcenter.png" alt="文件logo" class="massterpic" >
                         </div>
                         <div  class="projectdisright">
                            <div  class="projectName">{{item.publishName}}
                                <span style="display:inline-block;float:right;margin-right:5px;">
                                   <span v-if="item.publishStatus==1" style="color:#409eff">新建</span>
                                   <span v-if="item.publishStatus==2">发布中</span>
                                    <span v-if="item.publishStatus==3" style="color:#67c23a">成功</span>
                                    <span v-if="item.publishStatus==4" style="color:red">失败</span>
                                    <span v-if="item.publishStatus==5" style="color:#03a9f4">列队中</span>
                                     <span v-if="item.publishStatus==6">已提交</span>
                                </span>
                            </div>
                               <div class="projectdiecribetion"><span>训练名称:</span>{{item.trainingName}}</div>
                               <div class="projectdiecribetion"><span>所属项目:</span>{{item.projectName}}</div>
                         </div>
                  </div>
                   <div class="projectbottom">
                         <div class="menukey">
                              <span   :class='{"startdisabled":item.publishStatus !== 1}'  ><el-button   size="small"  icon="el-icon-caret-right" @click.once="startmodel(index)" >发布</el-button></span>   
                        </div>
                          <div class="menukey">
                                  <el-button  size="small"  icon="el-icon-delete" @click="delectmodel(index);" >删除</el-button>
                        </div>  
                         <div class="menukey">
                             <el-button  size="small"   :disabled="item.publishStatus !==3  "      icon="el-icon-search" @click="Releasedetails(index)" >接口测试</el-button>
                        </div>                          
                   </div>
              </div>
      </el-col>
          <el-col :span="24">
                <page-compent  :pageSize='pageSize'      :pagetotal='paggtatol'  @fanye="pageIndexChange" ></page-compent>
         </el-col>
  </el-row>
</template>
<script>
   import {publishfindpage,publishstart,publishdelete,projectSharedelete} from '@/api/api'
   import pageCompent from '@/components/pagination'
export default {
      components:{
            pageCompent
      },
      data(){
           return{
                paggtatol:null,
                currentPage:1,//当前页码
                pageSize:8,
                publishName:"",
                distributelist:[],
                loding:[] 
           }
      },
      methods:{
            seeabout(){
                  this.getpublishfindpage()
            },
            addpushmode(){//点击添加
                 this.$router.push("/Addmodel")
            },
            getpublishfindpage(){
               
                 var params={
                      currentPage:this.currentPage,
                      pageSize:this.pageSize,
                      publishName:this.publishName
                 }
                 publishfindpage(params).then(res=>{
                           if(res.data.code==0){
                                 console.log('--发布列表--')
                                 console.log(res)
                                this.distributelist=res.data.data.list
                                this.paggtatol=res.data.data.total
                           } 
                     }) 
            },
           startmodel(index){//启动 
                    var parms={
                           publishId:this.distributelist[index].publishId
                    }
                    publishstart(parms).then(res=>{
                                if(res.data.code==0){
                                      this.$message({
                                            type:'success',
                                            message:"提交发布成功"
                                      })
                                     this.getpublishfindpage() 
                                }else{
                                      this.$message.error(res.data.message)
                                }
                    })
           },
           delectmodel(index){
               var parms={
                           publishId:this.distributelist[index].publishId
                    }
             var _this=this
                   this.$confirm('发布模型和已分享将永久删除, 是否继续?', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                              }).then(() => {
                             publishdelete(parms).then(res=>{
                                    if(res.data.code==0){
                                          _this.getpublishfindpage()
                                    }else{
                                 this.$alert(res.data.message, '温馨提示', {
                                          confirmButtonText: '确定',
                                          callback: action => {
                                              this.$router.push('/ShareList')
                                             }
                                          });
                                    }
                          })
                   }).catch(() => {
                              this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                              });          
                              });
           },
           Releasedetails(index){ 
             if(this.distributelist[index].publishStatus==3){
                  this.$router.push({name:"ModelformDetail",params:{id:this.distributelist[index].publishId,projectId:this.distributelist[index].projectId,isshare:true}})
             }else{
                   this.$message.error('请等待训练成功')
             }
           },
            pageIndexChange(index){//翻页
                    this.currentPage=index
                    this.getpublishfindpage()  
            },
      },
      mounted(){
            this.getpublishfindpage()
       var timese= setInterval(()=>{
                  if(this.$route.name=='Modelform'){ 
                        this.getpublishfindpage() 
                  }
            },8000)

          // console.log(this.distributelist)


      }

 }
</script>
<style lang="scss" scoped>

</style>