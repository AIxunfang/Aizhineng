<template>
  <div id="app">
          <router-view  v-if="isRouterlive"  />
  </div>
</template>

<script>
export default {
  name: 'app',
  provide(){
      return{
         reload:this.reload
      }
  },
  data(){
      return{
         isRouterlive:true
      }
  },
 
  methods:{
        reload(){
             this.isRouterlive=false
             this.$nextTick(function(){
                this.isRouterlive=true
             })
        } 
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
