<template>
  <el-row class="tac">
    <el-col :span="24">
      <div class="logo" id="logo">{{title}}</div>
      <el-menu
         default-active
	      class="el-menu-vertical-demo"
	      theme="dark" 
	      :unique-opened="true"
	      @open="handleOpen"
	      @close="handleClose"
	      background-color="#20222A"
	      text-color="#fff"
	      :collapse="isCollapse"
	      active-text-color="#ffd04b"
      >
        <template v-for="(v,k) in compList">
          <!-- 有子元素显示 -->
          <el-submenu v-if="v.hasChild==true" :index="v.numP" :key="k">
            <template slot="title">
              <i :class="v.icon"></i>
              <span>{{v.label}}</span>
            </template>
            <el-menu-item
              v-for="v2 in v.child"
              :index="v2.num"
              :key="v2.key"
              @click="openTabs(v2.key,v2.label,v2.hasChild,v2.url)"
            >
              <span>{{v2.label}}</span>
            </el-menu-item>
          </el-submenu>
          <!--没有子元素-->
          <el-menu-item
            :index="v.numP"
            v-else-if="v.hasChild == false"
            @click="openTabs(v.key,v.label,v.hasChild,v.url)"
            :key="k"
          >
            <i :class="v.icon"></i>
            <span>{{v.label}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
import qs from "qs";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isCollapse: false, // false展开
      logoText: true,
      compList: {},      // 菜单数据
      title:Yukon.Url.Title
    };
  },
  computed: {
    ...mapGetters(["token", "mid"]) // 获取vuex的token
  },
  created() {
    this.getIsCollapse();
    this.getMenuList(); //获取下拉列表
  },
  methods: {
    getMenuList() {
      this.$http
        .post(
          Yukon.Action.GetJsonData,
          JSON.stringify({
            token: this.token,
            reqInfo: '{"Name":"serviceList"}'
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          var result = JSON.parse(response.body);
          if (result.code == 0) {
            var data = result.data;
            this.compList = data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //菜单展开伸缩
    getIsCollapse() {
      eventBus.$on("asideMenuState", message => {
        if (message) {
          this.logoText = false;
          this.$emit("getAsideWidth", "66px");
        } else {
          this.logoText = true;
          this.$emit("getAsideWidth", "200px");
        }
        this.isCollapse = message;
      });
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    //打开tabs
    openTabs(key, label, hasChild, url) {
      eventBus.$emit("receivesCreateTabValue", key, label, hasChild, url, "");
    }
  }
};
</script>
