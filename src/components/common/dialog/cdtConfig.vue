<template>
  <div>
    <el-dialog
      v-if="!dialogShow"
      title="条件配置"
      class="cdtContent cover_dialog commonTable"
      :visible.sync="dialogVisible"
      :before-close="btnCancel"
    >
      <div>
        <div class="dialogTop">
          <ul class="importIpt">
            <li>
              <span>字段名</span>
              <el-select v-model="filterName" placeholder="请选择">
                <el-option
                  v-for="(item,index) in tableData.Columns"
                  :key="index"
                  :label="item.DisplayName"
                  :value="item.ColumnName"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>链接符号</span>
              <el-select v-model="linklValue" placeholder="请选择">
                <el-option
                  v-for="(item,index) in linkData"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>值</span>
              <el-input v-model="cdtInput" placeholder="请输入内容"></el-input>
            </li>
          </ul>
          <div class="importBtn">
            <el-row>
              <el-button @click="addImport" type="primary">新增</el-button>
            </el-row>
          </div>
        </div>
        <div class="dialogTable">
          <el-table :data="cdtTableData" height="250" border style="width: 100%">
            <el-table-column prop="filterCon" label="过滤条件"></el-table-column>
            <el-table-column label="连接符">
              <template slot-scope="scope">
                <el-select v-model="scope.row.linkNmae" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in scope.row.connector"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="btnCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="btnSure">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-if="dialogShow"
      title="班次计划 条件配置"
      class="cdtContent cover_dialog commonTable"
      :visible.sync="dialogVisible"
      :before-close="btnCancel"
    >
      <div>
        <div class="dialogTop">
          <ul class="importIpt">
            <li>
              <span>时间</span>
              <el-input v-model="cdtInput" placeholder="请输入内容"></el-input>
            </li>
            <li>
              <span>时间类型</span>
              <el-select v-model="linklValue" placeholder="请选择">
                <el-option
                  v-for="(item,index) in linkData"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </li>
          </ul>
          <div class="importBtn">
            <el-row>
              <el-button @click="addImport" type="primary">新增</el-button>
            </el-row>
          </div>
        </div>
        <div class="dialogTable">
          <el-table :data="cdtTableData" height="250" border style="width: 100%">
            <el-table-column prop="filterCon" label="过滤条件"></el-table-column>
            <el-table-column label="连接符">
              <template slot-scope="scope">
                <el-select v-model="scope.row.linkNmae" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in scope.row.connector"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnSure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["cdtdialogVisible", "tableData", "dialogTableData"],
  data() {
    return {
      dialogVisible: this.cdtdialogVisible,
      cdtTableData: [],
      tempArr: [],
      linkData: ["==", "!=", ">", ">=", "<", "<=", "%", "!%"],
      connector: ["&&", "||"],
      cdtInput: "",
      linklValue: "",
      filterName: "",
      dialogShow: ""
    };
  },
  mounted() {
    this.default();
  },
  methods: {
    handleClick(row) {
      this.cdtTableData.splice(row.$index, 1);
    },
    btnCancel() {
      this.dialogVisible = false;
      this.$emit("DialogVisibleFalse", false);
    },
    btnSure() {
      this.tableData.FilterEnumInfo = this.cdtTableData;
      this.tableData.Filter = "";
      if (this.dialogTableData.Name == "APS") {
        for (var k = 0; k < this.cdtTableData.length; k++) {
          if (k == this.cdtTableData.length - 1) {
            this.tableData.Filter += "ME." + this.cdtTableData[k].filterCon;
          } else {
            this.tableData.Filter +=
              "ME." +
              this.cdtTableData[k].filterCon +
              this.cdtTableData[k].linkNmae;
          }
        }
      } else {
        for (var k = 0; k < this.cdtTableData.length; k++) {
          if (this.tableData.HasRemark == true) {
            if (k == this.cdtTableData.length - 1) {
              this.tableData.Filter += this.cdtTableData[k].filterCon;
            } else {
              this.tableData.Filter +=
                this.cdtTableData[k].filterCon + this.cdtTableData[k].linkNmae;
            }
          } else {
            if (k == this.cdtTableData.length - 1) {
              this.tableData.Filter +=
                this.cdtTableData[k].filterCon +
                "," +
                this.cdtTableData[k].linkNmae;
            } else {
              this.tableData.Filter +=
                this.cdtTableData[k].filterCon +
                "," +
                this.cdtTableData[k].linkNmae +
                ";";
            }
          }
        }
      }

      this.dialogVisible = false;
      this.$emit("DialogVisibleFalse", false);
    },
    addImport() {
      if (this.dialogTableData.Name == "APS") {
        if (
          this.filterName == "" ||
          this.linklValue == "" ||
          this.cdtInput == ""
        ) {
          this.$message({
            type: "warning",
            message: "请选择字段"
          });
        } else {
          var temp = {
            filterCon: this.filterName + this.linklValue + this.cdtInput,
            connector: this.dialogTableData.APSFilterEnum,
            linkNmae: "&&",
            linkvalue: this.linklValue
          };

          if (this.tempArr.indexOf(JSON.stringify(temp)) == -1) {
            this.tempArr = [];
            this.tempArr.push(JSON.stringify(temp));
            for (var i = 0; i < this.tempArr.length; i++) {
              this.cdtTableData.push(JSON.parse(this.tempArr[i]));
            }
          } else {
            this.$message({
              type: "warning",
              message: "已有此项内容"
            });
          }
        }
      } else {
        if (this.linklValue == "" || this.cdtInput == "") {
          this.$message({
            type: "warning",
            message: "请选择字段"
          });
        } else {
          if (this.tableData.HasRemark == true) {
            var temp = {
              filterCon: this.cdtInput + this.linklValue,
              connector: this.dialogTableData.DateFilterEnum,
              linkNmae: "|",
              linkvalue: this.linklValue
            };
          } else {
            var temp = {
              filterCon: this.filterName +','+ this.linklValue +','+ this.cdtInput,
              connector: this.dialogTableData.WCFFilterEnum,
              linkNmae: "AND",
              linkvalue: this.linklValue
            };
          }
          if (this.tempArr.indexOf(JSON.stringify(temp)) == -1) {
            this.tempArr = [];
            this.tempArr.push(JSON.stringify(temp));
            for (var i = 0; i < this.tempArr.length; i++) {
              this.cdtTableData.push(JSON.parse(this.tempArr[i]));
            }
          } else {
            this.$message({
              type: "warning",
              message: "已有此项内容"
            });
          }
        }
      }
    },
    default() {
      if (this.dialogTableData.Name == "APS") {
        this.dialogShow = false;
      } else {
        if (this.tableData.HasRemark == true) {
          this.dialogShow = true;
          this.linkData = ["年", "月", "周", "日"];
        } else {
          this.dialogShow = false;
        }
      }
      if (this.tableData.FilterEnumInfo.length > 0) {
        this.cdtTableData = this.tableData.FilterEnumInfo;
        this.linklValue = this.cdtTableData.linkvalue;
      }
    }
  }
};
</script>

 <style lang="scss" scoped>
.cdtContent {
  /deep/ .dialogTop > ul {
    float: left;
    width: 54%;
    .el-input__inner {
      height: 26px !important;
      line-height: 26px !important;
      border: none;
    }
  }
  .el-dialog {
    margin-top: 0 !important;
    .el-table__empty-block {
      min-height: 30px;
    }
    .el-table__body-wrapper {
      max-height: 400px;
      overflow-y: auto;
    }
  }
  .dialogTop > div {
    float: left;
  }
  .importIpt > li {
    width: 100%;
  }
  .importIpt > li > span {
    min-width: 69px;
    height: 28px;
    float: left;
    line-height: 26px;
    border-radius: 3px 0 0 3px;
    margin-bottom: 8px;
    padding-left: 10px;
    border: 1px solid #dcdfe6;
    border-right: none;
    font-size: 12px;
    white-space: nowrap;
  }
  .importIpt > li > .el-select {
    width: calc(100% - 69px);
    height: 28px;
    float: left;
    border-radius: 0 3px 3px 0;
    margin-bottom: 8px;
    border: 1px solid #dcdfe6;
    font-size: 12px;
  }
  .importIpt > li > .el-input {
    width: calc(100% - 69px);
    height: 28px;
    float: left;
    border-radius: 0 3px 3px 0;
    margin-bottom: 8px;
    border: 1px solid #dcdfe6;
    font-size: 12px;
  }
  .importBtn {
    margin-left: 10%;
    margin-top: 31px;
  }
  .importBtn > .el-row {
    border: none;
  }
  .importBtn > .el-row > .el-button {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
    cursor: pointer;
    float: left;
  }
}
</style>
