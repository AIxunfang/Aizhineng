<template>
  <el-row class="wholepublish">
    <div class="navigationbar">
      <span class="navigationname">全局参数管理
        <i class="el-icon-arrow-right" aria-hidden="true"></i>发布资源管理
      </span>
    </div>
    <el-col :span="24">
      <el-col :span="12" class="elcolmoddel">
        <div class="modelconfig">
          <div class="resoureName">
            <i class="fa fa-circle" aria-hidden="true"></i>
            <span>cpu资源</span>
            <span class="usedoing">cpu使用:{{formmemory.cpuamend}}/128</span>
          </div>
          <div class="datamiddle">
            <div class="viewpie">
              <ve-ring :data="chartDatacpu" :settings="chartSettingscpu"></ve-ring>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="elcolmoddel">
        <div class="modelconfig">
          <div class="resoureName">
            <i class="fa fa-circle" aria-hidden="true"></i>
            <span>内存资源</span>
            <span class="usedoing">内存使用:{{formmemory.memoryamend}}/128</span>
          </div>
          <div class="datamiddle">
            <div class="viewpie">
              <ve-ring :data="chartDatacpu" :settings="chartSettingscpu"></ve-ring>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div style="margin-top:40px;">
          <el-form
            :inline="true"
            :model="formmemory"
            class="demo-form-inline"
            label-width="120px"
            ref="formmemory"
            :rules="rules"
          >
            <div class="publish">
              <el-form-item label="CPU限额:" prop="cpuamend">
                <el-input v-model="formmemory.cpuamend" class="cpuinputamend"></el-input>
              </el-form-item>
            </div>
            <div class="publish">
              <el-form-item label="内存限额:" prop="memoryamend">
                <el-input v-model="formmemory.memoryamend" class="cpuinputamend"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div style="float:right;margin:40px;height:60px; position:relative">
            <el-button type="primary" size="small" @click="savepublish">保存</el-button>
          </div>
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      formmemory: {
        cpuamend: "",
        memoryamend: ""
      },
      rules: {
        cpuamend: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^([1-9]\d*|[0]{1,1})$/, message: "大于-1的正整数" }
        ],
        memoryamend: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^[1-9]+\d*$/, message: "大于0的正整数" }
        ]
      },
      chartDatacpu: {
        columns: ["cpu", "使用个数"],
        rows: [
          { cpu: "已使用", 使用个数: 1393 },
          { cpu: "未使用", 使用个数: 3530 }
        ]
      },
      chartSettingscpu: {
        radius: 50,
        offsetY: 90,
        itemStyle: {
          color: function(item) {
            var colorlist = ["#ea0a0a", "#19d4ae"];
            return colorlist[item.dataIndex];
            0;
          }
        }
      }
    };
  },
  methods: {
    getconfiggetpublish() {
      configgetpublish().then(res => {
        if (res.data.code == 0) {
          this.formmemory.cpuamend = res.data.data.cpu;
          this.formmemory.memoryamend = res.data.data.memory;
        }
      });
    },
    savepublish() {
      var params = {
        type: 2,
        memory: this.formmemory.memoryamend,
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
              this.$refs["formmemory"].resetFields();
              setTimeout(() => {
                this.getconfiggetpublish();
              }, 1000);
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wholepublish {
  .publish {
    display: inline-block;
    width: 48%;
    text-align: center;
  }
}
</style>
<style>
</style>

