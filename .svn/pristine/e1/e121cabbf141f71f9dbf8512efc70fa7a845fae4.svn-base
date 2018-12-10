<template>
    <div>
            <el-pagination
                    background
                      layout="prev, pager, next"
                      @current-change="pageIndexChange"
                      :total="pagetotal"
                     >
            </el-pagination>
    </div>
</template>
<script>
export default {
         props:[
              'pagetotal',
           ], 
        methods:{
              pageIndexChange(idx){
                   this.$emit('fanye',idx)
              },
              
        },
        mounted(){

        }
}
</script>
