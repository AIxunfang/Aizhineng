<template>
  <el-row class="wholeDrillRouce">
        <el-col :span="24">
           <div class="navigationbar"> 
              <span class="navigationname">全局参数管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                资源配置
              </span>
            </div>
         </el-col>
         <el-col :span="24"  style="padding:20px;height:300px">
            <el-col :span="8">
                <ve-pie :data="chartData_vebarcpu"  :settings="chartSettings"  ></ve-pie>
            </el-col>
            <el-col :span="8">
                     <ve-pie :data="chartData_vebargpu"  :settings="chartSettings"  :legend-visible="false" ></ve-pie> 
            </el-col>
            <el-col :span="8">
                      <ve-pie :data="chartData_vebarmeory"  :settings="chartSettings"  :legend-visible="false"></ve-pie> 
            </el-col>

         </el-col>
         <el-col :span="24">
                 <div style="margin:20px;">
                             <el-table
                                   border
                                  :data="usetableData"
                                  style="width: 100%">
                                  <el-table-column
                                    label="资源类型"
                                    width="180">
                                 <template slot-scope="scope">
                                      <span v-if="scope.row.type==1">训练</span>
                                      <span v-else>发布</span>
                                 </template>
                                  </el-table-column>
                                  <el-table-column
                                    prop="resource"
                                    label="资源占比"
                                    width="180">
                                  </el-table-column>                    
                                  <el-table-column
                                    prop="cpu"
                                    label="使用中CPU"
                                    width="180">
                                  </el-table-column>
                                  <el-table-column
                                    prop="gpu"
                                    label="使用中GPU">
                                  </el-table-column>
                                  <el-table-column
                                    prop="memory"
                                    label="使用中内存">
                                  </el-table-column>
                                  <el-table-column
                                    label="操作">
                                    <template slot-scope="scope">
                                            <el-button size="mini" type="primary" @click="amend_data(scope.row)" >修改</el-button>  
                                    </template>
                                  </el-table-column>

                              </el-table>
                        <el-dialog 
                         :title="titleName"
                         :visible.sync="amendVisible" >
                        <el-form    :model="formmemory" class="demo-form-inline" label-width="120px" ref="formmemory" :rules="rules">
                                  <el-form-item label="资源占比" prop="resource" >
                                    <el-input v-model="formmemory.resource"  class="cpuinputamend" ></el-input>
                                </el-form-item>
                                <el-form-item label="CPU限额:" prop="cpuamend" >
                                    <el-input v-model="formmemory.cpuamend"  class="cpuinputamend" ></el-input>
                                </el-form-item>
                                <el-form-item label="GPU限额:"  prop="gpuamend" v-show="this.formmemory.type ===1">
                                    <el-input v-model="formmemory.gpuamend"  class="cpuinputamend" ></el-input>
                                </el-form-item>
                                 <el-form-item label="内存限额:" prop="memoryamend" >
                                    <el-input v-model="formmemory.memoryamend"  class="cpuinputamend" ></el-input>
                                </el-form-item>
                        </el-form>
                           <span slot="footer" class="dialog-footer">
                              <el-button type="primary" size="mini"  @click="savememoryamend">保存</el-button>
                            </span>
                        </el-dialog>
                 </div>
         </el-col>
  </el-row>
</template>
<script>
import { configget, configupdate, findresource } from "@/api/api";
export default {
  data() {
    return {
      titleName: null,
      amendVisible: false,
      usetableData: [],
      chartSettings: {
        radius: 50,
        offsetY: 120,
        itemStyle: {
          color: function(item) {
            var colorlist = ["#6fd2f6", "#449ddb", "#fb6e87", "#ff92a5"];
            return colorlist[item.dataIndex];
          }
        }
      },

      chartExtend: {
        barWidth: "35px",
        color: ["red", "#19d4ae", "red", "#19d4ae", "#5ab1ef"],
        series: {
          barGap: "-100%",
          barCateGoryGap: "50%"
        }
      },
      formmemory: {
        cpuamend: "",
        gpuamend: "",
        memoryamend: "",
        type: "",
        resource: ""
      },

      rules: {
        cpuamend: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^([1-9]\d*|[0]{1,1})$/, message: "大于-1的正整数" }
        ],
        memoryamend: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^[1-9]+\d*$/, message: "大于0的正整数" }
        ],
        gpuamend: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^([1-9]\d*|[0]{1,1})$/, message: "大于-1的正整数" }
        ]
      },

      chartData_vebarcpu: {
        columns: ["类型", "使用情况"],
        rows: []
      },
      chartData_vebargpu: {
        columns: ["类型", "使用情况"],
        rows: []
      },
      chartData_vebarmeory: {
        columns: ["类型", "使用情况"],
        rows: []
      }
    };
  },
  methods: {
    getconfigget() {
      configget().then(res => {
        if (res.data.code == 0) {
          this.usetableData = res.data.data;
        }
      });
    },
    amend_data(index) {
      console.log(index);
      if (index.type == 1) {
        this.titleName = "训练资源配置";
      } else {
        this.titleName = "发布资源配置";
      }
      this.amendVisible = true;
      this.formmemory.memoryamend = index.memory;
      this.formmemory.gpuamend = index.gpu;
      this.formmemory.cpuamend = index.cpu;
      this.formmemory.type = index.type;
      this.formmemory.resource = index.resource;
    },

    savememoryamend() {
      var params = {
        resource: this.formmemory.resource,
        type: this.formmemory.type,
        memory: this.formmemory.memoryamend,
        gpu: this.formmemory.gpuamend,
        cpu: this.formmemory.cpuamend
      };
      this.$refs["formmemory"].validate(valid => {
        if (valid) {
          configupdate(params).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.amendVisible = false;
              this.$refs["formmemory"].resetFields();
              setTimeout(() => {
                this.getconfigget();
              }, 1000);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getfindresource() {
      findresource().then(res => {
        console.log("---ziyuan---");
        console.log(res);
        if (res.data.code == 0) {
          this.chartData_vebarcpu.rows = [
            {
              类型: "训练剩余",
              使用情况:
                res.data.data.all_training_limit_cpu -
                res.data.data.all_training_used_cpu
            },
            { 类型: "训练使用", 使用情况: res.data.data.all_training_used_cpu },
            { 类型: "发布使用", 使用情况: res.data.data.all_publish_used_cpu },
            {
              类型: "发布剩余",
              使用情况:
                res.data.data.all_publish_limit_cpu -
                res.data.data.all_publish_used_cpu
            }
          ];
          this.chartData_vebargpu.rows = [
            {
              类型: "训练剩余",
              使用情况:
                res.data.data.all_training_limit_gpu -
                res.data.data.all_training_used_gpu
            },
            {
              类型: "训练使用",
              使用情况: res.data.data.all_training_used_gpu
            },
            {
              类型: "发布使用",
              使用情况: res.data.data.all_publish_used_gpu
            },
            {
              类型: "发布剩余",
              使用情况:
                res.data.data.all_publish_limit_gpu -
                res.data.data.all_publish_used_gpu
            }
          ];
          this.chartData_vebarmeory.rows = [
            {
              类型: "训练剩余",
              使用情况: res.data.data.all_training_used_memory
            },
            {
              类型: "训练使用",
              使用情况:
                res.data.data.all_training_limit_memory -
                res.data.data.all_training_used_memory
            },
            {
              类型: "发布使用",
              使用情况: res.data.data.all_publish_used_memory
            },
            {
              类型: "发布剩余",
              使用情况:
                res.data.data.all_publish_limit_memory -
                res.data.data.all_publish_used_memory
            }
          ];
        }
      });
    }
  },
  mounted() {
    this.getconfigget();
    this.getfindresource();
  }
};
</script>
<style lang="scss" scoped>
.wholeDrillRouce {
  min-width: 1116px;
  .memorycpugpu {
    text-align: center;
    margin-top: 40px;
  }
}
</style>

