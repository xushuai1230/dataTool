import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import list from './modules/list'
import edit from './modules/index'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store=new Vuex.Store({
  modules:{user,list,edit},
 
  getters,
  plugins:[createPersistedState({
    key:'admin',
    storage: window.sessionStorage
  })]
})

export default store
