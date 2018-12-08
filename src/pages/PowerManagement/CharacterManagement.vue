<template>
        <el-row class="charcterManagement">
          <el-col :span='24'>
             <div class="navigationbar"> 
               <span class="navigationname">权限管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                    角色管理
                </span>
            </div>
            <div class="seachframe">
                 <div  class="formdata">
                        <el-form :inline="true"  size="mini" >
                              <el-form-item  >
                                    <el-input v-model="roleseach"></el-input>         
                              </el-form-item>
                              <el-form-item>
                                <el-button type="primary" icon="el-icon-search"   size="mini"  >查询</el-button>
                              </el-form-item>
                        </el-form>
                   </div>
            </div>
            <div style="margin:20px 0px 0px 20px"> <el-button icon="el-icon-plus" type="primary"  size="mini"  @click="addrole"  >新增</el-button></div>
         </el-col>
          <el-col :span="24">
                   <div style="margin:20px" >
                    <el-table
                        :data="tableData "
                        style="width: 100%"
                        border
                         size="mini" 
                        >
                        <el-table-column
                          header-align="center"
                          align="center"
                          type="index"
                          label="序号"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="roleName"
                          label="名称"
                          header-align="center"
                          align="center"
                         >
                        </el-table-column>
                        <el-table-column
                          header-align="center"
                          align="center"
                          label="操作"
                          width="300px"
                          > 
                           <template slot-scope="scope">
                                 <el-button size="mini"  round  type="danger" @click="delectrole(scope.$index)">删除</el-button> 
                                 
                                  <el-button size="mini"  round  type="success" @click="distribute(scope.row)">分配</el-button>    
                           </template>
                        </el-table-column>
                    </el-table>      
                   </div>
                   <el-dialog
                      :title="rolesname"
                      :visible.sync="EditdialogVisible"
                      width="60%"
                   
                      >
                
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
                    @checkbox-click="checkboxdata"
                  >
                </zk-table> 
                      <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="EditdialogVisible = false">取 消</el-button>
                        <el-button type="primary" size="small"  @click="sendpower"  >确 定</el-button>
                      </span>
                    </el-dialog>
                     <el-dialog
                      title="提示"
                      :visible.sync="addvisibledialog"
                      width="800px"
                     >
                      <el-form :inline="true" :model="addroleformInline" class="demo-form-inline">
                            <el-form-item label="角色名称">
                              <el-input v-model="addroleformInline.roleName" placeholder="角色名称"></el-input>
                            </el-form-item>
                           <el-form-item label="排序">
                                   <el-input v-model="addroleformInline.roleOrder"></el-input>
                            </el-form-item> 
                       </el-form>
                       <span slot="footer" class="dialog-footer">
                        <el-button size="small" @click="addvisibledialog= false">取 消</el-button>
                        <el-button type="primary" size="small"  @click="sendrole" >确 定</el-button>
                      </span>
                 </el-dialog>
          </el-col>
        </el-row>
</template>
<script>
 import {permissionlistsort,roleadd,rolelist,roledelete,findpermissions,updatepermission} from '@/api/api'
export default {
        data(){
            return{
               //   powername:'',
                   id:"",
                 rolesname:'',
                 selectdata:[],
                 powerdata:[],
                 addroleformInline:{
                        roleName:'',
                        roleType:'',
                        roleOrder:10,
                 },
                 props: {
                    border: true,
                    showHeader: true,
                    showRowHover: true,
                    treeType: true,
                    isFold: true,
                    expandType: false, 
                    selectionType:true,
                   },
                 columns: [
                       {
                           prop:"index",
                         
                       },
 

                        {
                          label: '名称',
                          prop: 'permissionName',
                          width: '220px',
                        },
                        {
                          label: '图标',
                          minWidth: '50px',
                        },
                        {
                          label: '级别',
                          prop: 'permissionType',
                        
                        },
                        {
                          label: '地址',
                          prop: 'routeUrl',
                          width:"220px"
                        },
                     ],
                  treedata: [],
                 EditdialogVisible:false,
                 addvisibledialog:false,
                 tableData:[
 
                 ],
                 roleseach:"",
                 isadd:false,
            }
        },
        methods:{
              checkboxdata(val,index,event){
                       this.selectdata=index 
                },
             sendrole(){//发送
                   roleadd(this.addroleformInline).then(res=>{
                           if(res.data.code==0){
                                 this.$message({
                                    type:"success",
                                    message:"创建成功"
                                 })
                                 this.addvisibledialog=false
                                 this. getrolelist()
                           }
                   })
             },
             getrolelist(){//角色列表
              this.tableData=[]
                    rolelist().then(res=>{
                        if(res.data.code==0){
                              res.data.data.forEach((item,index)=>{
                                  if(item.roleType==0){
                                      this.tableData.push(item)
                                  }
                              })
                              
                        }
                    })
             },
             delectrole(index){
                    var parms={
                          id:this.tableData[index].id
                    }
                          this.$confirm('删除该角色后该角色下关联的用户将不能登录?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                                  roledelete(parms).then(res=>{
                                        if(res.data.code==0){
                                             this.getrolelist()
                                        }
                                   })
                          }).catch(() => {
                            this.$message({
                              type: 'info',
                              message: '已取消删除'
                            });          
                          });
                   },
              addrole(){
                     this.addvisibledialog=true 
                     this.isadd=true
              },
              distribute(index){
                    this.id=index.id
                    this.addroleformInline.roleType=index.roleType
                    this.rolesname=index.roleName
                    this.treedata=[]
                    this.EditdialogVisible=true
                    var parms={
                           id:index.id
                       }
                    findpermissions(parms).then(res=>{
                            if(res.data.code==0){
                                 for(var i=0;i<res.data.data.length;i++){
                                                this.treedata.push(res.data.data[i][0])
                                 }
                       }  
                    })   
              },
             sendpower(){
                   const permissionIds=[]
                    for(var i=0;i<this.selectdata.length;i++){
                          if(this.selectdata[i]._isChecked==true){
                              permissionIds.push( this.selectdata[i].id)
                          }
                    }
                  var parms={
                          id:this.id,
                          roleName: this.rolesname,
                          roleType:0,
                          roleOrder:10,
                          permissionIds:permissionIds

                      }
                    updatepermission(parms).then(res=>{
                                    if(res.data.code==0){
                                       this.$message({
                                           type:"success",
                                           message:"权限修改成功",
                                           
                                       })
                                      this.EditdialogVisible=false  
                                    }else{
                                       this.$message.error(res.data.message)
                                    }
                    })
             },

        },
        mounted(){
               this.Username = JSON.parse(sessionStorage.getItem("user"));
               this.getrolelist()
        }
}
</script>
<style lang="scss" scoped>
     

</style>