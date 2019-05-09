import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const index = resolve => require(['../components/home/index.vue'],resolve)
const login = resolve => require(['../components/login/login.vue'], resolve)
export default new Router({
  routes: [
    {
      path: '/',                               // 默认页面
      redirect :'/login'
    },
    {
      path : '/index',
      name : 'index',
      component :  index
    },
    {
      path : '/login',  
      name : 'login',
      component :  login   
    }
  ]
})
