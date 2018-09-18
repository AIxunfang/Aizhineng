<template>
  <el-row class="Drilist" >
      <el-col :span='24'>
             <div class="navigationbar"> 
               <span class="navigationname">训练管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                     列表列表 
                </span>
            </div>
      </el-col>
      <el-col :span="24">
              <div class="projectaddbox  projectmodel">
                    <div class="prijectaddpic"  @click="addrouter" ></div>
              </div>
             <div   class="projectmodel" v-for="(item,index) in modelarry" :key="item.id">
                  <div  class="projectdiscrb">
                          <div class="projectdimg" >
                            <img src="../../assets/img/modelcenter.png" alt="文件logo" class="massterpic" >
                         </div>
                         <div  class="projectdisright">
                            <div  class="projectName">{{item.trainingName}}
                                <span style="display:inline-block;float:right;margin-right:5px;">
                                   <span v-if="item.trainingStatus==1" style="color:#409eff">新建</span>
                                   <span v-if="item.trainingStatus==2">训练中</span>
                                    <span v-if="item.trainingStatus==3" style="color:#67c23a">成功</span>
                                    <span v-if="item.trainingStatus==4" style="color:red">失败</span>
                                    <span v-if="item.trainingStatus==5" style="color:#03a9f4">列队中</span>
                                     <span v-if="item.trainingStatus==6">已提交</span>
                                </span>
                            </div>
                            <div class="projectdiecribetion"><span>模块描述:</span>{{item.trainingRemind}}</div>
                               <div class="projectdiecribetion"><span>所属项目:</span>{{item.projectNameZh}}</div>
                         </div>
                  </div>
                   <div class="projectbottom">
                         <div class="menukey">
                              <span     :class='{"startdisabled":modelarry[index].trainingStatus !== 1,}'><el-button   size="small"  icon="el-icon-caret-right" @click="startmodel(index)" >启用</el-button></span>   
                        </div>
                          <div class="menukey">
                                  <el-button  size="small"  icon="el-icon-delete" >删除</el-button>
                        </div>  
                         <div class="menukey">
                             <el-button  size="small"  icon="el-icon-search"  @click="deails(index)">详情</el-button>
                        </div>                          
                   </div>
              </div>

      </el-col>
              <div class="paagenumber">
                   <el-pagination
                        background
                        layout="prev, pager, next, total"
                        :page-size='pageSize'
                        @current-change="pageIndexChange"
                        :total="paggtatol">
                  </el-pagination>
              </div>

  </el-row>
</template>
<script>
import {findpage,trainingstart} from '@/api/api'
export default {
       data(){
           return{
                 currpage:1,
                 pageSize:4,
                 paggtatol:null,
                 modelarry:[],
                 pageSize:5,
                 Username:'',

           }
       },
       methods:{
              addrouter(){//点击添加,路由跳转
                      this.$router.push('/NewDrill')   
                      
               },
               startmodel(index){//开始训练
                        console.log(index)
                        var parms={
                              trainingId: this.modelarry[index].trainingId
                        }
                      trainingstart(parms).then(res=>{
                            console.log("启动训练")
                            console.log(res)
                            if(res.data.code==0){
                               this.$router.push({name:'Trainstart',params:{id:this.modelarry[index].trainingId}}) 
                            }
                      })
                    
                  
               },
               pageIndexChange(index){//翻页
                      console.log(index)
                      this.currpage=index
                      this.getfindpage()
               },
               getfindpage(){//训练列表
                   var parms={
                           currentPage:this.currpage,
                           pageSize:this.pageSize,
                           userAccount:this.Username.name

                   }
                  findpage(parms).then(res=>{
                        console.log(res)
                        if(res.data.code==0){
                              this.modelarry=res.data.data.list
                              this.paggtatol=res.data.data.total
                        }
                  })


               },

               deails(index){

                     //  console.log(index)
                      this.$router.push({name:'Trainstart',params:{id:this.modelarry[index].trainingId}}) 
                   //  this.$router.push("/Trainstart")
               },


       },
       mounted(){

                this.Username = JSON.parse(sessionStorage.getItem("user"));
                this.getfindpage()  
       }
}
</script>
<style lang="scss" scoped>
     .Drilist{
         .projectaddbox{
            line-height: 139px;
            text-align: center;
            .prijectaddpic{
                  display: inline-block;
                  width: 65px;
                  height: 65px;
                  background: url(../../assets/img/add.png);
                  vertical-align:middle;
                  cursor:pointer;
            }
       }
       .projectmodel{
              border: 1px solid #e4e4e4;
              margin:20px 0px 0px 20px;
              float: left;
              width: 357px;
              height: 139px;
              border-radius: 5px;
              .projectdiscrb{
                   height: 82px;
                   border-bottom: 1px solid #e4e4e4;
                   .massterpic{
                       vertical-align: middle;
                   }
                   .projectdimg{
                           display: inline-block;
                           vertical-align: top;
                            width: 97px;
                            height: 83px;
                            line-height: 83px;
                            text-align: center;
                   }
                   .projectName{
                       margin-top: 5px;
                       display: inline-block;
                       font-family: "Microsoft YaHei";
                       color:#666666;
                       font-size:16px;
                       width:250px;
                   }
                   .projectdiecribetion{
                            display: inline-block;
                            width:250px;
                            font-size:14px;
                            color:#989898;
                            margin-top:5px;
                            text-overflow:ellipsis;//值为clip表示剪切，ellipsis时为显示省略号
                            overflow:hidden; 
                            white-space:nowrap;
                   }
                   .projectdisright{
                           display: inline-block;
                           width: 250px;
                           height: 83px;
                   }
              }
              .projectbottom{
                  height:57px;
                  width:100%;
                  .menukey{
                       width:115px;
                       display: inline-block;
                       height: 57px;
                       text-align: center;
                       line-height: 57px;
                       .el-button{
                         border: none;
                       }

                  }
                 .startdisabled{
                        opacity:0.5;//设置蒙版效果
                        pointer-events:none;//禁止鼠标事件
                       // cursor: not-allowed; 
                 } 
              }

       }
         

         } 
</style>
