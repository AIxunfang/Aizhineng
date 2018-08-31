<template>
  <el-row class="menuManagement">
        <el-col :span='24'>
             <div class="navigationbar"> 
               <span class="navigationname">权限管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                    菜单管理
                </span>
            </div>
         </el-col>
         <el-col :span="24">
        
                <zk-table 
                     ref="table"
                    :data="treedata"
                    :columns="columns"
                    :border="props.border"
                    :show-header="props.showHeader"
                    :show-row-hover="props.showRowHover"
                    :tree-type="props.treeType"
                    :is-fold="props.isFold"
                    :expand-type="props.expandType"
                    :selection-type="props.selectionType"
                    children-prop="secondPermissionList"
                  >
                   <template slot="permissionOrder" slot-scope="scope">
                          <el-popover
                            class="iconkongzhi"
                            placement="top"
                            width="160"
                            trigger="click">
                           <el-input v-model="scope.row.permissionOrder"></el-input><i class="fa fa-check-square editsubmit fa-3x" aria-hidden="true"></i>
                           <span slot="reference" style="text-decoration:underline;color:blue;cursor:pointer" @click="editsort(scope.row)">{{scope.row.permissionOrder}}</span>
                          </el-popover>
                   </template>



                    <template slot="action"  slot-scope="scope" >
                         <el-button @click="menudelect(scope.row)" icon="el-icon-delete"  type="danger" size="small"  circle></el-button>
                         <el-button @click="menuedit(scope.row)"  type="primary" icon="el-icon-edit"  size="small" circle ></el-button>
                        
                    </template>
                </zk-table>  
                <el-dialog
                      title="提示"
                      :visible.sync="menudialogVisible"
                      width="30%"
                    >
                <el-form :inline="true" :model="formmenu" class="demo-form-inline" >
                        <el-form-item label="名称">
                          <el-input v-model="formmenu.projectName" ></el-input>
                        </el-form-item>
                        <el-form-item label="父节点">
                          <el-select v-model="formmenu.region" >
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>

                </el-dialog>

         </el-col>

       
  </el-row>
</template>
<script>
 import {menulist} from '@/api/api'

export default {
           data(){
               return{
                menudialogVisible:false,
                secondPermissionList:'',
                  Username:'',
                  routerurl:'',
                 props: {
                    border: true,
                    showHeader: true,
                    showRowHover: true,
                    treeType: true,
                    isFold: true,
                    expandType: false, 
                    selectionType:false,
                   },
        formmenu:{
              projectName:"",
              region:"",
        },

        treedata: [],
        columns: [
          {
            label: '名称',
             prop: 'permissionName',
             width: '300px',
          },
          {
            label: '图标',
            prop: 'sex',
            minWidth: '50px',
          },
          {
            label: '类别',
            prop: 'permissionType',
           
          },
          {
            label: '地址',
            prop: 'routeUrl',
             width:"220px"
           },
          {
            label: '顺序',
            width:'80px',
            type: 'template',
            template: 'permissionOrder',
           },
          {
            label: '操作',
             width:'200px',
             type:'template',
             template: 'action', 
            
                  },
               ],     
             }
           },
           methods:{
             getmenulist(){
              var parms={
                    userAccount:this.Username.name,
              }
               menulist(parms).then(res=>{
                        if(res.data.code==0){
                            console.log("菜单栏权限")
                             console.log(res)
                             this.routerurl= res.data.data
                            this.routerurl.forEach((item ,index) => {
                                      // console.log("==")
                                      // console.log(item) 
                                      this.treedata.push(item[0])
                            });   

                           console.log("666")
                           console.log( this.treedata)
                        }
                   })    
              },
             menudelect(index){
                   console.log(index)

             },
           menuedit(){

           },
           editsort(event){//点击编辑顺序
                 this.visible2=true
                  console.log(event)
           }


           },
           mounted(){
                  this.Username = JSON.parse(sessionStorage.getItem("user"));
                  this.getmenulist()
           }           
}
</script>
<style lang="scss" scoped>
        .menuManagement{

                
        }
</style>
<style>
     .el-popper .el-input{
          width: 97px;
     }
            .editsubmit{
                vertical-align: middle;
               color: #409eff;
        }
</style>

