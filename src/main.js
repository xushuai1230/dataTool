import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import store from './vuex/store.js'
import axios from "axios"
import 'babel-polyfill'
/* CSS */
import 'element-ui/lib/theme-chalk/index.css'
import './assets/public/iconfont/iconfont.css' // 阿里图标库样式
import './assets/public/sass/main.scss' // 公共的样式
/* JS */
import './assets/public/js/chart.min.js' // Chart.js
import './assets/public/js/chartColors.js' // ChartColors.js
import './assets/public/js/directives.js' // 弹框拖拽JS
import common from './assets/public/js/common.js' // 通用js
import echarts from '../static/echarts.min.js' // echarts.js
import '../static/WebConfig.js' // 配置文件
import qs from "qs";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$common = common;

window.eventBus = new Vue()

router.beforeEach(({
  meta,
  path
}, from, next) => {
  var token = store.state.user.token;
  if (path == '/index') {
    if (token == "") {
      router.push('/login')
    }
  }
  // var urlTemp = window.location.href;
  // var token = common.getUrlParam("token",urlTemp) // 获取token
  // var mid = common.getUrlParam("mid",urlTemp)     // 获取模块id
  // var { auth = true } = meta
  // if(path === '/index.html'){
  //   store.dispatch("currentHref", urlTemp);
  //   if(token!="") {
  //     store.dispatch("token",token);
  //     store.dispatch("mid",mid);
  //   }
  // }
  // var loginName = store.state.user.loginName;
  // if(loginName == null || loginName == ''){
  //   token = store.state.user.token;
  //   if(token!=''){
  //     var reqInfo = JSON.stringify({
  //       Name: "Authorization",
  //       DefaultVal: "GetUserByToken"
  //     });
  //     axios.post(Yukon.Url.Bus,qs.stringify({
  //       "name":Yukon.ServiceName.Tenant,
  //       "operation":"GetJsonData",
  //       "token": token,
  //       "reqInfo": reqInfo
  //     }),{
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       }
  //     }).then((response) => {
  //       loginName = '';
  //       var result = response.data;
  //       if(result.code == 0){
  //         store.dispatch("loginName", result.data.LoginName);
  //       }
  //     });
  //   } else {
  //     router.push({name: Yukon.Route.Login})
  //   }
  // }
  next()
})

// token是否失效，锁屏
Vue.http.interceptors.push(function (request, next) {
  next(function (response) {
    var result = JSON.parse(response.body);
    if (result.code == -2) {
      this.$message({
        type: 'warning',
        message: '因长时间未操作，请重新登录'
      })
      this.$store.dispatch("token", "");
      this.$router.push({
        name: Yukon.Route.Login
      })
    }
    return response
  })
})

let startApp = function () {
  axios.get(Yukon.Url.Config).then((res) => {
    Yukon.Url.Title = res.data.Title;
    Yukon.Url.Bus = res.data.Bus;
    Yukon.Url.Tree = res.data.Tree + Yukon.Action.GetJsonData,
    Yukon.Action.GetJsonData = res.data.Bus + Yukon.Action.GetJsonData;
    Yukon.Action.SetJsonData = res.data.Bus + Yukon.Action.SetJsonData;
    Yukon.Action.Import = res.data.Bus + Yukon.Action.Import;
    Yukon.Action.Export = res.data.Bus + Yukon.Action.Export;
    Yukon.Action.Login = res.data.Bus + Yukon.Action.Login;
    new Vue({
      el: '#app',
      router,
      store,
      components: {
        App
      },
      template: '<App/>'
    })
  })
}
startApp()
