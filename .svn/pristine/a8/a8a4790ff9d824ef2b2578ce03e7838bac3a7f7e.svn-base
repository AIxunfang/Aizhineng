<template>
      <el-row >
      <el-col :span="24">
           <div class="navigationbar"> 
              <span class="navigationname">首页<i class="el-icon-arrow-right" aria-hidden="true"></i>
                 课程体系<i class="el-icon-arrow-right" aria-hidden="true"></i>课程分类
              </span>
            </div>
           
            <!-- <el-button  v-for="item of defaultText" @click="routerPush(item.router)" :key='item.router'>{{ item.title }}</el-button> -->
              <el-button type="primary" size="mini"  style="float:right;margin:20px 20px 0px 0px" @click="goback"  >返回上一级</el-button>
            <el-col :span="24" >
                    <div   class="headlinename">
                         
                            <el-col :span='3'>
                            <div style="display:inline-block;">
                                <img :src="`${baseUrl}/file/${itemsystem.imageUrl}`" class="headlineicon">  
                            </div>
                           </el-col>
                           <el-col :span='21'>
                             <span class="headname">{{itemsystem.courseStructureName}}</span>
                              <p class="Desc">{{itemsystem.courseStructureDesc}}</p>   
                           </el-col>
                   </div>
            </el-col>
            <el-col :span='24' style="padding:  0px 20px 0px 20px;">
              <hr/>
            </el-col>
            <el-col :span="24">
              <div   class="stytemstyle"      v-for="item in  systemdata" :key="item.id" @click="stytemclick(item)">
                    <img  :src="`${baseUrl}/file/${item.imageUrl}`"  alt="" class="stytemcover">
                      <div class="courseStructureName"><span class="couseStryname">  {{item.courseClassificationName}}</span>  </div>
                        <div class="coursename" >{{item.childrenlength}}个模块</div> 
              </div>
          </el-col>
      </el-col>
      </el-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {baseUrl} from '../../../static/baseurl'
import {
  courseStructurepage,
  courseClassificationpage,
  courseContentpage
} from "@/api/api";
export default {
  data() {
    return {
      baseUrl,
      itemsystem: "",
      systemdata: []
    };
  },
  computed: {
    ...mapGetters(["defaultText"])
  },
  methods: {
      ...mapActions(["commitDefaultText"]),
    // changeText() {
    //     let defaultText = this.defaultText
    //     // defaultText = defaultText + 'fdsgfsdg'
    //     if(!this.defaultText) {
    //         defaultText = []
    //     }
    //     defaultText.push({ title: '课程体系',router:'/classifycourse/'+this.$route.params.id })
    //     this.commitDefaultText(defaultText)
    //     // this.$router.push()
    // },
    routerPush(router) {
        this.$router.push(router)
    },
    getcourseStructurepage() {
      var _this = this;
      var params = {
        currentPage: 1,
        pageSize: 100
      };
      courseStructurepage(params).then(res => {
        if (res.data.code == 0) {
          res.data.data.list.forEach((item, index) => {
            console.log(this.$route.params.id);
            if (this.$route.params.id == item.courseStructureId) {
              this.itemsystem = item;
            }
          });
        }
      });
    },
    getclass() {
      var parms = {
        currentPage: 1,
        pageSize: 1000,
        courseStructureId: this.$route.params.id
      };
      courseClassificationpage(parms).then(res => {
        if (res.data.code == 0) {
          if (res.data.code == 0) {
            this.systemdata = res.data.data.list;
            this.systemdata.forEach((item, index) => {
              var parms = {
                currentPage: 1,
                pageSize: 100,
                courseClassificationId: item.courseClassificationId
              };
              courseContentpage(parms).then(res => {
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
        }
      });
    },
    stytemclick(index) {
     const courseClassification=   sessionStorage.setItem('courseClass', JSON.stringify(index))   
      if (index.childrenlength > 0) {
        this.$router.push({
          name: "chunkcou",
          params: { id: index.courseClassificationId }
        });
         let defaultText = this.defaultText
        if(!this.defaultText) {
            defaultText = []
        }
        defaultText.push({ title: '课程模块',router:'/chunkcou/'+index.courseClassificationId })
        this.commitDefaultText(defaultText)
      }
    },
   clickfrist(){
              let defaultText = this.defaultText
            defaultText=[]
           this.$router.push('/Firstpage')

   },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getcourseStructurepage();
    this.getclass();
  }
};
</script>
<style scoped>
.headlinename {
  margin: 20px;
}
.headlineicon {
  display: inline-block;
  height:86px;
  width: 126px;
  vertical-align: middle;
}
.headname {
  display: inline-block;
  vertical-align: top;
  font-size: 22px;
  color: #333;
  font-weight: 500;
  font-family: '微软雅黑'
}
.Desc {
  text-align: left;
  font-size: 12px;
  color: #666;
  vertical-align: top;
  white-space: pre-wrap;
  font-family: '微软雅黑'

}
</style>



