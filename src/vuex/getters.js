const getters = {
  token:state => state.user.token,
  mid:state => state.user.mid, 
  loginName:state => state.user.loginName, 
  currentHref:state => state.user.currentHref,
  list_z:state => state.list.multipleSelection,
  codeNum_z:state => state.list.codeNum,
  datassss:state => state.list.datas,
  editId:state=>state.edit.editId[0]
}
export default getters
