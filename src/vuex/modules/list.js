const admin = {
  state: {
    multipleSelection:{},//登录的用户信息
    codeNum:'',
    datas:[],//排程参数下拉框数据
  },
  mutations: {
    LISTCHECK(state, val){
      state.multipleSelection = val
    },
    CODENUM(state, val){
      state.codeNum = val
    },
    DATASDATA(state, val){
      state.datas = val
    }
  },
  actions: {
    listcheck({commit}, val){
      commit("LISTCHECK", val)
    },
    codenum({commit}, val){
      commit("CODENUM", val)
    },
    datasdata({commit}, val){
      commit("DATASDATA", val)
    }
  }
}

export default admin
