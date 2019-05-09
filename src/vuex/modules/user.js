const admin = {
  state: {
    token          :"", // 登录用户token
    mid            :"", // 登录的模块id
    loginName      :"", // 用户名 
    currentHref    :"", // 当前页面地址
  },
  mutations: {
    TOKEN(state, val){
      state.token = val
    },
    MID(state, val){
      state.mid = val
    },
    LOGINNAME(state, val){
      state.loginName = val
    },
    CURRENTHREF(state, val){
      state.currentHref = val
    },
  },
  actions: {
    token({commit}, val){
      commit("TOKEN", val)
    },
    mid({commit}, val){
      commit("MID", val)
    },
    loginName({commit}, val){
      commit("LOGINNAME", val)
    },
    currentHref({commit}, val){
      commit("CURRENTHREF", val)
    }
  }
}

export default admin
