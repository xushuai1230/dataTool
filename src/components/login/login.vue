<template>
  <div class="login">
    <div class="loginCont">
      <p class="loginTitle">登录</p>
      <el-input
        placeholder="用户名"
        prefix-icon="iconfont people_fill APS-icon-people_fill"
        size="small"
        v-model="form.user"
      ></el-input>
      <el-input
        type="password"
        placeholder="密码"
        prefix-icon="iconfont lock_fill APS-icon-lock_fill"
        size="small"
        v-model="form.password"
        @keyup.native.enter="EnterLogin($event,'form')"
      ></el-input>
      <div class="keyword">
        <drag-verify
          :width="300"
          :height="32"
          text="滑动解锁"
          success-text="成功"
          background="#f7f9fa"
          progress-bar-bg=" #c5f1ea"
          completed-bg="#52ccba"
          handler-bg="#fff"
          :handlerIcon="handlerIcon"
          text-size="14"
          :successIcon="successIcon"
          ref="Verify"
          :circle="false"
          @passcallback="passcallback"
        ></drag-verify>
      </div>
      <el-button
        type="primary"
        @click="onSubmit('form')"
        class="loginBtn"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
      >登录</el-button>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import dragVerify from "vue-drag-verify";
import "../../assets/public/sass/login.scss";
export default {
  data() {
    return {
      form: {
        user: "", //用户名
        password: "", //密码
        automaticLogon: "" //自动登录
      },
      rules: {
        user: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { trigger: "blur" }
        ]
      },
      errortips: "",
      imgCode: "",
      loading: false,
      dragverify: false,
      successIcon:'el-icon-check',
      handlerIcon:"el-icon-caret-right"
    };
  },
  components: {
    dragVerify
  },
  watch:{
     dragverify: function(){
			return this.$refs.Verify.successIcon?this.handlerIcon:this.successIcon
		},
  },
  created() {
  },
  methods: {
    onSubmit(formName) {
      this.login(formName);
    },
    //回车登录
    EnterLogin(ev, formName) {
      if (ev.keyCode == 13) {
        this.login(formName);
      }
    },
    passcallback() {
      this.dragverify = true;
    },
    resetVerify() {
      this.$refs.Verify.$refs.handler.innerHTML = '<i class="el-icon-caret-right"></i>';
      this.$refs.Verify.$refs.message.style.color = '';
      this.$refs.Verify.isMoving = false;
      this.$refs.Verify.x = 0;
      this.$refs.Verify.isPassing = false;
      this.$refs.Verify.$refs.handler.style.left = "0";
      this.$refs.Verify.$refs.progressBar.style.width = "0";
      this.dragverify = false;
    },
    login(formName) {
      if (this.form.user.trim() == "") {
        this.$message({
          type: "error",
          message: "请输入用户名"
        });
        return false;
      }
      if (this.form.password.trim() == "") {
        this.$message({
          type: "error",
          message: "请输入密码"
        });
        return false;
      }
      if (this.dragverify == false) {
        this.$message({
          type: "error",
          message: "请从左向右滑动"
        });
        return false;
      }
      this.loading = true;
      this.$http
        .post(
          Yukon.Action.Login,
          JSON.stringify({
            userID: this.form.user,
            password: this.form.password
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
            this.loading = false;
            this.$store.dispatch("token", data.Token); // 用户信息存入vuex
            this.$router.push({ name: Yukon.Route.Index });
          } else {
            this.loading = false;
            this.$message({
              type: "error",
              message: "用户名或密码错误"
            });
            this.resetVerify();
            //   this.changeImg();
          }
        })
        .catch(function(error) {
          this.loading = false;
        });
    },
  }
};
</script>
<style lang='less' scoped>

</style>



