<template>
  <div class="topMenu">
  	<div class="topMenuLeft">
     <i :class="asideMenuIcon" @click="handleAsideMenuStatus" style="font-size: 22px;"></i>
    </div>
    <div class="topMenuRight" > 
      <el-menu mode="horizontal">
        <el-menu-item index="2" @click="selectNews">
        	<el-badge :value="value">
            <i class="iconfont APS-icon-xiaoxi"></i>
          </el-badge>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont APS-icon-yonghu"></i>
          </template>
          <el-menu-item index="3-1" @click="Out">切换用户</el-menu-item>
          <el-menu-item index="3-2" @click="Out">退出</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="iconfont APS-icon-yuyan-shi"></i>
          </template>
          <el-menu-item index="4-1" class="selectedColor">中文</el-menu-item>
          <el-menu-item index="4-2" class="defaultColor" @click="selectSubmenu('英文')">英文</el-menu-item>
          <el-menu-item index="4-3" class="defaultColor" @click="selectSubmenu('日语')">日语</el-menu-item>
          <el-menu-item index="4-4" class="defaultColor" @click="selectSubmenu('法语')">法语</el-menu-item>
          <el-menu-item index="4-5" class="defaultColor" @click="selectSubmenu('韩语')">韩语</el-menu-item>
          <el-menu-item index="4-6" class="defaultColor" @click="selectSubmenu('德语')">德语</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import qs from 'qs'
  export default {
    data() {
      return {
        isCollapse: false, 
        asideMenuIcon:'iconfont APS-icon-shouqicaidan', 
        value: "",
      };
    },
    computed:{
      ...mapGetters(['token']),
    }, 
    mounted() {
    },
    methods: { 
      selectSubmenu(val){ 
        this.$alert('您还未购买'+val+'版本服务', '提示', {
          confirmButtonText: '确定',
            callback: action => { 
          }
        });
      },
      selectNews(){
        this.$alert('未提供此服务', '提示', {
          confirmButtonText: '确定',
            callback: action => { 
          }
        });
      },
      Out(){
        this.$store.dispatch("token","");
        this.$router.push({name: Yukon.Route.Login});
        /*this.$http.post(Yukon.Url.Bus,qs.stringify({
          "name":Yukon.ServiceName.Tenant,
          "operation":"Logout",
          "token":this.token,
        }),{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=>{
          var result = response.data;
          if(result.code == 0){
            this.$store.dispatch("token","");
            this.$router.push({name: Yukon.Route.Login});
          }
        }).catch((error)=>{
        })  */
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      handleAsideMenuStatus(){
        if (this.isCollapse) {
          this.isCollapse=false;
          this.asideMenuIcon="iconfont APS-icon-shouqicaidan";
        }else{
          this.isCollapse=true;
          this.asideMenuIcon="iconfont APS-icon-zhankaicaidan"
        }
        eventBus.$emit('asideMenuState',this.isCollapse)
      },
      //跳转页面
      StepNavigation(val){
        var label=val.label
        var data={"key":val.url,"label":val.label,"url":val.url};
        eventBus.$emit('receivesCreateTabValue', data.key,data.label,'',data.url);//页面跳转需要引入commonvue
      },
    }
  }
</script>

