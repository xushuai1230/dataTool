<template>
  <div class="conmmonlist menu">
    <div class="toolBar">
      <el-button class="bar" size="mini" @click="addNet()" icon="el-icon-circle-plus-outline">新增</el-button>
      <el-button class="bar" size="mini" @click="edit()" icon="el-icon-circle-plus-outline">编辑</el-button>
      <el-button class="bar" size="mini" @click="testNet()" icon="el-icon-circle-plus-outline">测试连接</el-button>
      <el-button
        class="bar"
        size="mini"
        @click="dblistDelete()"
        icon="el-icon-circle-plus-outline"
      >删除</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="dbtableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="55"
          align="center"
          fixed
        ></el-table-column>
        <el-table-column type="selection" v-model="valve" width="55"></el-table-column>
        <el-table-column prop="DataSource" label="dataSource" width="120"></el-table-column>
        <el-table-column prop="ServerName" label="serverName" width="120"></el-table-column>
        <el-table-column prop="UserName" label="账号"></el-table-column>
        <el-table-column prop="Password" label="密码"></el-table-column>
        <el-table-column prop="DataBase" label="baseName"></el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="dblistDelete(scope.$index,scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dbtableData: [],
      valve: ""
    };
  },
  computed: {
    ...mapGetters(["token"]) // 获取vuex的token
  },
  mounted() {
    this.getDbTable();
    eventBus.$on("newData", val => {
      this.dbtableData = val;
    });
  },
  methods: {
    edit() {
      if (this.valve.length < 1) {
        this.$message({
          type: "warning",
          message: "请选择选项"
        });
      } else {
        eventBus.$emit("receivesCreateTabValue", "dbEdit", "DB编辑");
        this.$store.dispatch("editId", this.valve);
      }
    },
    addNet() {
      eventBus.$emit("receivesCreateTabValue", "dbAdd", "DB新增");
    },
    handleSelectionChange(val) {
      this.valve = val;
      if (this.valve.length > 1) {
        this.$message({
          type: "warning",
          message: "只能选择一条"
        });
        this.valve = [];
        if (val) {
          val.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      }
    },
    indexMethod(index) {
      return index;
    },
    dblistDelete() {
      if (this.valve.length < 1) {
        this.$message({
          type: "warning",
          message: "请选择选项"
        });
      } else {
        var detTableParams = { label: this.valve[0].label };
        this.$http
          .post(
            Yukon.Action.SetJsonData,
            JSON.stringify({
              token: this.token,
              data: JSON.stringify({
                Name: "DB",
                DefaultVal: "DeleteConnectionPath",
                PropertyValueMap: detTableParams
              })
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            console.log(res);
            var result = JSON.parse(res.body);
            if (result.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getDbTable();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }

      //  detTableParams[deletekey] = row.value ;
    },
    getDbTable() {
      var dbTableParams = JSON.stringify({ Name: "DB", DefaultVal: "DBList" });
      this.$http
        .post(
          Yukon.Action.GetJsonData,
          JSON.stringify({
            token: this.token,
            reqInfo: dbTableParams
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
            this.dbtableData = result.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    testNet() {
      if (this.valve.length < 1) {
        this.$message({
          type: "warning",
          message: "请选择选项"
        });
      } else {
        var testParam = {
          DataSource: this.valve[0].DataSource,
          ServerName: this.valve[0].ServerName,
          UserName: this.valve[0].UserName,
          Password: this.valve[0].Password,
          DataBase: this.valve[0].DataBase
        };
        this.$http
          .post(
            Yukon.Action.SetJsonData,
            JSON.stringify({
              token: this.token,
              data: JSON.stringify({
                Name: "DB",
                DefaultVal: "TestConnection",
                PropertyValueMap: testParam
              })
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
                message: "连接成功"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style>
</style>
