const admin = {
    state: {
      editId:''
    },
    mutations: {
        EDITID(state,val) {
            state.editId = val
        }
    },
    actions:{
      editId({commit}, val){
        commit("EDITID", val)
      }
    }
  }
  
  export default admin
  