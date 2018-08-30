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
                </zk-table>  

         </el-col>

       
  </el-row>
</template>
<script>
 import {menulist} from '@/api/api'

export default {
           data(){
               return{
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
            prop: 'permissionOrder',
            width:'80px'
           },
          {
            label: '操作',
            // prop: 'likes',
            width:'200px',
            type: 'template', 
            
            render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                            ]);
                        }
            
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
