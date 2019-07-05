<template>
  <div class="conmmonlist menu">
    <div class="toolBar">
      <el-button class="bar" @click="dbImport()" size="mini" icon="el-icon-circle-plus-outline">导入</el-button>
      <el-button class="bar" @click="dbExport()" size="mini" icon="el-icon-circle-plus-outline">导出</el-button>
      <el-button class="bar" @click="save()" size="mini" icon="el-icon-circle-plus-outline">保存</el-button>
    </div>
    <div class="commonTable">
      <div class="listTable">
        <el-table
          class="newTable"
          v-loading="loading"
          @cell-dblclick="addType"
          :data="tableData"
          :show-overflow-tooltip="true"
          stripe
          border
          height="100%"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="54"
            align="center"
            fixed
          ></el-table-column>
          <el-table-column prop="DisplayName" label="软件表格代码"></el-table-column>
          <el-table-column label="数据源类型" width="120">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.OutSource"
                @change="outsourcetype(scope )"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in scope.row.OutSourceEnumInfo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="链接字符串/文件路径">
            <template slot-scope="scope">
              <div v-if="scope.row.OutSource == 0">
                <!-- <input
                  ref="filElem"
                  type="file"
                  name="file"
                  id="upload-file"
                  @change="getFile(scope.row)"
                  style="position:absolute;left:120000px"
                >-->
                <el-input class="file-ipt" v-model="scope.row.ConnectionPath" placeholder/>
              </div>
              <el-select
                v-if="scope.row.OutSource == 1"
                v-model="scope.row.ConnectionPath"
                filterable
                allow-create
                default-first-option
                placeholder="请选择"
                @change="dbChoose(scope.row)"
              >
                <el-option
                  v-for="item in scope.row.DBConnetionPathEnumInfo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="用户表格名">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.UserTableName"
                filterable
                allow-create
                default-first-option
                placeholder="请选择"
                @focus="connect(scope)"
                @change="tableChoose(scope.row)"
              >
                <el-option
                  v-for="(item,index) in scope.row.TableEnumInfo"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="字段对应设置">
            <template slot-scope="scope">
              <el-form :model="scope.row">
                <el-form-item prop="path">
                  <el-input class="file-ipt" v-model="scope.row.Mapping" placeholder/>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="导入方式">
            <template slot-scope="scope">
              <el-select v-model="scope.row.Import" placeholder="请选择">
                <el-option
                  v-for="item in scope.row.ImportEnumInfo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="MainKeyNames" label="主键"></el-table-column>

          <el-table-column label="导出方式">
            <template slot-scope="scope">
              <el-select v-model="scope.row.Export" placeholder="请选择">
                <el-option
                  v-for="item in scope.row.ExportEnumInfo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="导出筛选条件">
            <template slot-scope="scope">
              <el-form :model="scope.row">
                <el-form-item prop="path">
                  <el-input
                    class="file-ipt"
                    :show-overflow-tooltip="true"
                    v-model="scope.row.Filter"
                    placeholder
                  />
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 60]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      ></el-pagination>
    </div>
    <importExportDialog
      :importDialogVisible="importDialogVisible"
      v-on:DialogVisibleFalse="importDialogClose"
      v-if="importDialogVisible"
      :tableData="dialogInterData"
      :operationTableName="operationTableName"
    ></importExportDialog>
    <cdtConfiguration
      :cdtdialogVisible="cdtdialogVisible"
      v-if="cdtdialogVisible"
      v-on:DialogVisibleFalse="cdtdialogClose"
      :tableData="dialogInterData"
      :dialogTableData="dialogTableData"
    ></cdtConfiguration>
    <importDetail
      :importVisible="importVisible"
      v-if="importVisible"
      v-on:DialogVisibleFalse="importClose"
      :exportTableData="exportTableData"
    ></importDetail>
    <exportDetail
      :exportVisible="exportVisible"
      v-on:DialogVisibleFalse="exportClose"
      v-if="exportVisible"
      :exportTableData="exportTableData"
    ></exportDetail>
    <dbfiled
      :DBdialogVisible="DBdialogVisible"
      v-on:DialogVisibleFalse="dbfiledClose"
      :tableData="dialogInterData"
      v-if="DBdialogVisible"
    ></dbfiled>
  </div>
</template>
<script>
import "../../../assets/sass/menu.scss";
import importExportDialog from "../dialog/importExport";
import cdtConfiguration from "../dialog/cdtConfig";
import dbfiled from "../dialog/dbfiled";
import importDetail from "../dialog/importDetail";
import exportDetail from "../dialog/exportDetail";
import { mapGetters } from "vuex";
export default {
  props: ["operationTableName"],
  data() {
    return {
      tableData: [],
      configData: "",
      serverValue: "",
      tableNameData: [],
      dialogInterData: "",
      dialogTableData: "",
      exportTableData: [],
      fileValue: "",
      rowValve: "",
      loading: false, //loading
      importDialogVisible: false, // 导入导出弹窗
      cdtdialogVisible: false, //条件配置弹窗
      exportVisible: false, // 导出详情弹窗
      importVisible: false, // 导入详情弹窗
      DBdialogVisible: false, // 选择文件弹窗
      totalItems: 0, //总条数
      pageSize: 20, //每页数据条数
      currentPage: 1, // 第几页
      rowList: "",
      methodShow: false
    };
  },
  computed: {
    ...mapGetters(["token"]) // 获取vuex的token
  },
  created() {},
  mounted() {
    eventBus.$on("filterPath", val => {
      // console.log(val);
    });
    setTimeout(() => {
      this.getTableJsonData();
    }, 500);
  },
  components: {
    importExportDialog,
    importDetail,
    exportDetail,
    cdtConfiguration,
    dbfiled
  },
  methods: {
    // 序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    // 字段设置弹窗
    importDialogClose(val) {
      this.importDialogVisible = val;
    },
    // 条件筛选弹窗
    cdtdialogClose(val) {
      this.cdtdialogVisible = val;
    },
    importClose(val) {
      this.importVisible = val;
    },
    exportClose(val) {
      this.exportVisible = val;
    },
    dbfiledClose(val) {
      this.DBdialogVisible = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.save();
      this.getTableJsonData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.save();
      // this.index = val;
      this.getTableJsonData();
    },
    // 表格双击
    addType(row, column, cell, event) {
      if (column.label == "字段对应设置") {
        if (row.ConnectionPath == "" || row.UserTableName == "") {
          this.$message({
            type: "warning",
            message: "请选择此行其他选项 "
          });
        } else {
          this.importDialogVisible = true;
          this.dialogInterData = row;
        }
      } else if (column.label == "导出筛选条件") {
        this.cdtdialogVisible = true;
        this.dialogInterData = row;
        this.dialogTableData = this.configData;
      } else if (column.label == "链接字符串/文件路径") {
        this.DBdialogVisible = true;
        this.dialogInterData = row;
      }
    },
    // 文件路径失去焦点
    connect(val) {
      this.dbChoose(val.row);
    },
    // 获取表格列表
    dbChoose(val) {
      if (val.OutSource == 0) {
        var dbtableParams = JSON.stringify({
          Name: "CSV",
          DefaultVal: "DataTable",
          Filter: val.ConnectionPath
        });
      } else {
        var dbtableParams = JSON.stringify({
          Name: "DB",
          DefaultVal: "DataTable",
          Filter: val.ConnectionPath
        });
      }

      this.$http
        .post(
          Yukon.Action.GetJsonData,
          JSON.stringify({
            token: this.token,
            reqInfo: dbtableParams
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
            if (result.data.length > 0) {
              var b = val.UserTableName;
              val.TableEnumInfo = result.data;
              val.UserTableName = val.TableEnumInfo[0];
              val.UserTableName = b;
            } else {
              val.UserTableName = "";
            }
          } else {
            val.TableEnumInfo = "";
            val.UserTableName = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    tableChoose(val) {},
    // 数据源类型改变
    outsourcetype(val) {
      if (val.row.OutSource == 1) {
        this.getDbTable(val.row);
      } else {
        val.row.ConnectionPath = "";
      }
    },
    // DB下获取文件路径下拉框
    getDbTable(val) {
      var dbTableData = JSON.stringify({ Name: "DB", DefaultVal: "DBList" });
      this.$http
        .post(
          Yukon.Action.GetJsonData,
          JSON.stringify({
            token: this.token,
            reqInfo: dbTableData
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
            val.DBConnetionPathEnumInfo = result.data;
          }
        })
        .catch(err => {});
    },
    // 获取表格数据
    getTableJsonData() {
      this.loading = true;
      this.$http
        .post(
          Yukon.Action.GetJsonData,
          JSON.stringify({
            token: this.token,
            reqInfo: JSON.stringify({
              Name: "service",
              Filter: this.operationTableName,
              CurrentPage: this.currentPage,
              PageSize: this.pageSize
            })
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          this.loading = false;
          var result = JSON.parse(response.body);
          if (result.code == 0) {
            this.configData = result.data;
            // console.log(this.configData);
            this.tableData = result.data.Tables;
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[
                i
              ].OutSourceEnumInfo = this.configData.OutSourceEnum;
              this.tableData[i].ImportEnumInfo = this.configData.ImportEnum;
              this.tableData[i].ExportEnumInfo = this.configData.ExportEnum;
              this.tableData[
                i
              ].DBConnetionPathEnumInfo = this.configData.DBConnetionPathEnum;
            }
            this.totalItems = result.TotalRow;
            for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].OutSource == 0) {
                this.tableData[i].TableEnumInfo = [];
              } else {
                this.UserTableName = this.tableData[i].TableEnumInfo[0];
              }
            }
          } else {
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    // 保存配置
    save() {
      this.loading = true;
      var saveParams = JSON.stringify({
        Name: "save",
        PropertyValueMap: this.configData
      });
      // console.log(saveParams);
      this.$http
        .post(
          Yukon.Action.SetJsonData,
          JSON.stringify({
            token: this.token,
            data: saveParams
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          var result = JSON.parse(res.data);
          if (result.code == "0") {
            this.loading = false;
            this.$message({
              type: "success",
              message: "保存成功"
            });
          } else if (result.code == "-1") {
            this.loading = false;
            this.$message({
              type: "error",
              message: "保存失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //导入
    dbImport() {
      this.loading = true;
      this.$http
        .post(
          Yukon.Action.Import,
          JSON.stringify({
            token: this.token
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          var result = JSON.parse(res.data);
          if (result.code == "0") {
            this.$message({
              type: "success",
              message: "导入成功"
            });

            this.importExtportDetail();
          } else if (result.code == "-1") {
            this.$message({
              type: "error",
              message: "导入失败"
            });
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 导出
    dbExport() {
      this.loading = true;
      this.$http
        .post(
          Yukon.Action.Export,
          JSON.stringify({
            token: this.token
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          var result = JSON.parse(res.data);
          if (result.code == "0") {
            this.$message({
              type: "success",
              message: "导出成功"
            });
            this.importExtportDetail("export");
          } else if (result.code == "-1") {
            this.loading = false;
            this.$message({
              type: "error",
              message: "导出失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    importExtportDetail(val) {
      this.$http
        .post(
          Yukon.Action.GetJsonData,
          JSON.stringify({
            token: this.token,
            reqInfo: JSON.stringify({
              Name: "information"
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
          if (result.code == "0") {
            this.loading = false;
            this.exportTableData = [];
            if (val == "export") {
              this.exportVisible = true;
            } else {
              this.importVisible = true;
            }
            this.exportTableData = result.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
 <style lang="scss" scoped>
body {
  /deep/ .el-popper[x-placement^="bottom"] {
    margin: 0;
  }
}
</style>