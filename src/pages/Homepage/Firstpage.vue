<template>
 <el-row>
   <el-col :span="24">
           <div class="navigationbar"> 
              <span class="navigationname">首页<i class="el-icon-arrow-right" aria-hidden="true"></i>
                   课程体系
              </span>
            </div>
      </el-col>
     <el-col :span="24">
                    <div   class="stytemstyle"      v-for="item in  systemdata" :key="item.courseStructureId" @click="stytemclick(item)">
                          <img  :src=" `${baseUrl}/file/${item.imageUrl}`" alt="" class="stytemcover">
                            <div class="courseStructureName"><span class="couseStryname">{{item.courseStructureName}}</span></div>
                            <div class="coursename" >{{item.childrenlength}}个专题</div>
                    </div>
     </el-col>
 </el-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { courseStructurepage, courseClassificationpage } from "@/api/api";
import {baseUrl} from '../../../static/baseurl'
export default {
  data() {
    return {
      baseUrl,
      currentPage: 1,
      pageSize: 10,
      systemdata: [],
      systemdatas: []
    };
  },
    computed: {
    ...mapGetters(["defaultText"])//vuex
  
  },
  methods: {
      ...mapActions(["commitDefaultText"]),//vuex
    getcourseStructurepage() {
      var parms = {
        currentPage: this.currentPage,
        pageSize: 20
      };
      courseStructurepage(parms).then(res => {
        if (res.data.code == 0) {
          this.systemdata = res.data.data.list;
          this.systemdata.forEach((item, index) => {
            item.type = 1;
            var parms = {
              currentPage: 1,
              pageSize: 1000,
              courseStructureId: item.courseStructureId
            };
            courseClassificationpage(parms).then(res => {
              if (res.data.code == 0) {
                this.$set(
                  this.systemdata[index],
                  "childrenlength",
                  res.data.data.total
                );
              }
            });
          });
        }
      });
    },

    stytemclick(index) {
      console.log(index);
      if (index.childrenlength > 0) {
        this.$router.push({
          name: "classifycourse",
          params: { id: index.courseStructureId }
        });
        let defaultText = this.defaultText;
        if (!this.defaultText) {
          defaultText = [];
        }
        defaultText.push({
          title: "课程体系",
          router: "/classifycourse/" + index.courseStructureId
        });
        this.commitDefaultText(defaultText);
      }
      //
    }
  },
  mounted() {
    this.getcourseStructurepage();
    
  }
};
</script>
<style lang="scss" scoped>

</style>


