<template>
  <div class="indexClass">
    <el-container class="body">
       <el-aside :width="asideWidth">
          <asideMenu v-on:getAsideWidth="getAsideWidth"></asideMenu>
      </el-aside>
      <el-container>
        <div class="rightContent"> 
          <div class="rightTop">
            <el-header height="38px">
              <top-menu></top-menu>
            </el-header>
            <top-tabs ></top-tabs>
          </div>
          <!--主要内容·-->
          <el-main  class="rightMain">
              <main-content ></main-content> 
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script>
    import asideMenu from '../common/basis/asideMenu.vue'
    import topMenu from '../common/basis/topMenu.vue'
    import topTabs from '../common/basis/topTabs.vue'
    import mainContent from '../common/basis/mainContent.vue'
    export default {
      components: {asideMenu,topMenu,topTabs,mainContent},
      data() {
        return {
          asideWidth:"200px",//false展开
        };
      },
      methods:{
        getAsideWidth(val){
          this.asideWidth=val;
        },
      }
    }
</script>
