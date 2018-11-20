<template>
 <el-row  class="Announcement">
            <div class="navigationbar"> 
                  <span class="navigationname">公告管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                        公告管理
                  </span>
           </div>
          <el-col :span='24'>
               <el-form  label-width="80px" :model="formLabelAlignnotice"    class="formdtannoice">
                  <el-form-item label='公告'>
                        <el-input    type="textarea"    v-model="formLabelAlignnotice.announcementContent"></el-input>
                  </el-form-item>
                    <el-form-item >
                       <el-tooltip  >
                            <el-switch
                              @change="changestate"
                              v-model="statrStatus"
                              active-color="#13ce66"
                              inactive-color="#ff4949 "
                              active-text="启用"
                              inactive-text=" 关闭">
                            </el-switch>
                          </el-tooltip>
                         <el-button type="primary" size="small" style="float:right"  @click='commit'>提交</el-button>
                    </el-form-item>
                  </el-form>

          </el-col>

 </el-row>
</template>
<script>
import{announcementweb,announcementupdate} from '@/api/api'
export default {
         data(){
            return{
               statrStatus:'',
               formLabelAlignnotice:{
                      announcementContent:'',
                      announcementId:'',
                      announcementStatus:'',

               }
            }
         },
        methods:{
            getnoice(){
                   announcementweb().then(res=>{
                         console.log(res)
                         if(res.data.code==0){
                              this.formLabelAlignnotice.announcementContent=res.data.data.announcementContent
                              this.formLabelAlignnotice.announcementId=res.data.data.announcementId
                           //   this.formLabelAlignnotice.announcementStatus=Boolean(res.data.data.announcementStatus)
                              if(res.data.data.announcementStatus==1){
                                    this.statrStatus=true
                              }else{
                                    this.statrStatus=false
                              }
                         }
                   })
             },
          changestate(val){
                console.log(val)
                if(val==false){
                      this.formLabelAlignnotice.announcementStatus=2
                      this.commit()
                  
                }else{
                      this.formLabelAlignnotice.announcementStatus=1
                       this.commit()
                }
                
          },


            commit(){
                   var parms=this.formLabelAlignnotice
                  announcementupdate(parms).then(res=>{
                    console.log('bianjia')
                                   console.log(res)
                                   if(res.data.code==0){
                                           this.$message('更改成功')
                                           this.getnoice()
                                   }

                  })     
            },

         },
         mounted(){
               this.getnoice()
         },


         }
</script>
<style lang="scss" scoped>
       .Announcement{
           .formdtannoice{
               width: 500px;
               top: 50%;
               left: 50%;
               position: fixed;
               margin-left:-250px;

           }
       }
</style>
