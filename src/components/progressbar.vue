<template>
    <el-row>
           <div style="width:600px; float: right; margin-right: 244px;" >
                    <div style="width:500px;display:inline-block " v-show='progressshow' >
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" status="success"></el-progress>  
                    </div>
                     <p style="display:inline-block" v-show="noiceuser">
                            <span style="font-size:10px; color:#fff"> 解压中请稍等</span>
                            <i class="el-icon-loading" style="color:#fff"> </i>
                     </p>
          </div>     
    </el-row>
</template>
<script>
export default {
        name:'progress-Bar',
        props:{
                progressshow:Boolean,
                percentage:Number,
                noiceuser:Boolean,
            },
            data(){
                return{
                     
                     includedComponents:"progress-Bar" 
                }
            }
}
</script>
