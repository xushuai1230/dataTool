if (typeof Yukon == 'undefined') {
  Yukon = {};
}
Yukon.Url = {
  Title:'',
  Bus: '',
  Config:'/static/config.json',
};
Yukon.Action = {
  GetJsonData: '/ApiGeneral/GetJsonData',
  SetJsonData: '/ApiGeneral/SetJsonData',
  Import: '/ApiGeneral/Import',
  Export: '/ApiGeneral/Export',
  Login:'/ApiGeneral/Login'
}
Yukon.ServiceName={
  Tenant:'Tenant',
  JobBooking:'JobBooking',
  Workflow:'Workflow',
  WMS:'WMS',
  APS:'APS',
  Sale:'Sale',
  Message:'Message',
  Agent:'Agent',
  Log:'Log',
};
Yukon.Route = {
  Login: "login",         
  Index: "index",
  Lock:  "lock"    
};