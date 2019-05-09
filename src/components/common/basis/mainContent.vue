<template>
  <div class="mainClass">
    <el-scrollbar  style="height:100%;"> 
    <!-- 菜单需要的组件 include缓存页面 exclude不缓存 targetName页面key-->
      <keep-alive exclude="home" v-if="url=='' || url==undefined">
            <component 
            :is="currentTab"
            :editId="Id" 
            :event="createTab"
            :targetName="currentTab"
            > 
          </component>
       </keep-alive>
      <div v-else class="tabs-con clearfix">
          <iframe 
          :src="url"    
          @childclosetab="closeTab"
          class="mainUrl" >
         </iframe>
      </div>
     </el-scrollbar>
  </div>
</template>
<script>
import home                      from '../../home/home'
import APS                       from '../../scheduling/scheduling'
import JobBooking                from '../../production/production'
import Sale                      from '../../sales/sales'
import WMS                       from '../../inventory/inventory'
import Purchase                  from '../../supply/supply'
import Demand                    from '../../demand/demand'
import DB                        from '../../dbconfig/dbconfig'
import dbEdit                    from '../../dbconfig/dbEdit'
import dbAdd                    from '../../dbconfig/dbAdd'
  export default{
    components:{
      home,
      APS,                     // 计划排程
      JobBooking,                  // 生产报工
      Sale,                     //销售管理
      WMS,                  //库存管理
      Purchase,                     // 采购管理
      Demand,                      //需求管理
      DB,                          //DB配置
      dbEdit,                       //DB编辑
      dbAdd                         //DB新增
    },
    data() {
      return{
        currentTab:'APS',
        Id        : '',
        url       : '',
      }
    },
    mounted(){
      this.getHomePage();
      this.reciveCurrentTab();
    },
    methods:{
     //发送首页渲染
      getHomePage(){
         eventBus.$emit('homePage',"APS","BOM")
      },
    //接受要操作的组件
      reciveCurrentTab(){
         eventBus.$on('currentTab',(currentTab,id,url)=>{
           this.currentTab=currentTab;
           this.Id=id;
           this.url=url;
         })
      },
      //创建新的Tabs
      createTab(key,label,hasChild,url,Id){
        
        eventBus.$emit('receivesCreateTabValue',key,label,hasChild,url,Id);
      },
      //关闭页面
      closeTab(targetName){
        eventBus.$emit('colseTabs',targetName);        
      }
    
    }
  }
</script>