<template>
  <div class="conmmonlist menu edit">
    <div class="toolBar">
      <el-button class="bar" size="mini" @click="save()" icon="el-icon-circle-plus-outline">保存</el-button>
    </div>
<!-- db-edit-content -->
    <div class="editBoxTable">
       <el-form class="form" label-position="left" label-width="200px" size="mini">
      <div class="db-content-list">
        <el-col :span="12">
          <!-- <span>dataSource:</span> -->
          <el-form-item label="dataSource:">    
          <el-select v-model="sourceValue" size="mini"  value="sourceValue" placeholder="请选择">
            <el-option
              v-for="item in sourcesData"
              :key="item.id"
              :label="item.lable"
              :value="item.lable"
            ></el-option>
          </el-select>
           </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <span>serverName:</span> -->
           <el-form-item label="serverName:">    
          <el-input
            v-model="serverValue"
            value="serverValue"
            @input="serverChange"
            placeholder="请输入服务名"
          ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <span>账号:</span> -->
          <el-form-item label="账号:">  
          <el-input v-model="username" value="username" size="mini"   placeholder="请输入账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <span>密码:</span> -->
          <el-form-item label="密码:">  
          <el-input v-model="password" value="password" size="mini"  placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <span>baseName:</span> -->
          <el-form-item label="baseName:">  
          <el-select v-model="baseValue" size="mini"  value="baseValue" placeholder="请选择">
            <el-option v-for="(item,index) in baseData" :key="index" :label="item" :value="item"></el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      sourcesData: [],
      serverData: [],
      baseData: [],
      serverValue: "",
      sourceValue: "",
      baseValue: "",
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["token", "editId"]) // 获取vuex的token
  },
  mounted() {
    this.getSource();
    // this.getServer();
  },
  methods: {
    getSource() {
      this.serverValue = this.editId.ServerName;
      this.sourceValue = this.editId.DataSource;
      this.username = this.editId.UserName;
      this.password = this.editId.Password;
      this.baseValue = this.editId.DataBase;
      if (this.sourceValue && this.serverValue) {
        this.getBase();
      }
      var sourceParams = JSON.stringify({
        Name: "DB",
        DefaultVal: "SearchEnum",
        EnumField: "DataSource"
      });
      this.$http
        .post(
          Yukon.Action.GetJsonData,
          JSON.stringify({
            token: this.token,
            reqInfo: sourceParams
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          var result = JSON.parse(res.body);
          if (result.code == 0) {
            this.sourcesData = result.data;
          }
        })
        .catch(err => {});
    },
    serverChange() {
      if (this.sourceValue && this.serverValue) {
        this.getBase();
      }
    },
    // getServer() {
    //   var serverParams = JSON.stringify({
    //     Name: "DB",
    //     DefaultVal: "SearchEnum",
    //     EnumField: "ServerName"
    //   });
    //   this.$http
    //     .post(
    //       "http://192.168.0.198:6313/ApiGeneral/GetJsonData",
    //       JSON.stringify({
    //         token: this.token,
    //         reqInfo: serverParams
    //       }),
    //       {
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //       }
    //     )
    //     .then(res => {
    //       console.log(res);
    //       var result = JSON.parse(res.body);
    //       console.log(result);
    //       if (result.code == 0) {
    //         this.serverData = result.data;
    //         if (this.serverData && this.this.sourcesData) {
    //           this.getBase();
    //         }
    //       }
    //     })
    //     .catch(err => {});
    // },
    getBase() {
      var filterData = JSON.stringify({
        DataSource: this.sourceValue,
        ServerName: this.serverValue,
        UserName: this.username,
        Password: this.password
      });
      var baseParams = JSON.stringify({
        Name: "DB",
        DefaultVal: "DataBase",
        Filter: filterData
      });
      this.$http
        .post(
          Yukon.Action.GetJsonData,
          JSON.stringify({
            token: this.token,
            reqInfo: baseParams
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          var result = JSON.parse(res.body);
          if (result.code == 0) {
            this.baseData = result.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    save() {
      var PropertyValue = {
        ID: this.editId.ID,
        DataSource: this.sourceValue,
        ServerName: this.serverValue,
        UserName: this.username,
        Password: this.password,
        DataBase: this.baseValue
      };
      var infoData = JSON.stringify({
        Name: "DB",
        DefaultVal: "SetConnectionPath",
        PropertyValueMap: PropertyValue
      });
      this.$http
        .post(
          Yukon.Action.SetJsonData,
          JSON.stringify({
            token: this.token,
            data: infoData
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          var result = JSON.parse(res.body);
          if (result.code == 0) {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            eventBus.$emit("colseTabs", "dbEdit");
            eventBus.$emit("newData", result.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang='scss'>
.db-edit-content {
  /deep/ .db-content-list {
    width: 100%;
    height: auto;
    padding: 30px;
    > li {
      width: 50%;
      height: 32px;
      margin-bottom: 10px;
      > span {
        min-width: 100px;
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 30px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      > .el-select {
        width: calc(100% - 100px);
        height: 30px;
        line-height: 30px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
      }
      > .el-input {
        width: calc(100% - 100px);
        > .el-input__inner {
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>


