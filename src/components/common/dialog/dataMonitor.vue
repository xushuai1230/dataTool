<template>
  <div class="cover_dialog">
    <el-dialog
      :show-overflow-tooltip="true"
      title="导出"
      :visible.sync="dialogVisible"
      :before-close="btnCanel"
    >
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="btnCanel">取消</el-button>
        <el-button size="small" type="primary" @click="btnSure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["dataMonitorVisible"],
  data() {
    return {
      dialogVisible: this.dataMonitorVisible,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["token"]) // 获取vuex的token
  },
  mounted() {
    this.getDBField()
  },
  methods: {
    btnCanel() {
      this.dialogVisible = false;
      this.$emit("DialogVisibleFalse", false);
    },
    btnSure() {
      this.dialogVisible = false;
      this.$emit("DialogVisibleFalse", false);
    },
    getDBField() {
      this.loading = true;
      var dbtableParams = JSON.stringify({
        Name: "DBField",
        TblName: "ImportExportLog"
      });
      this.$http
        .post(
          Yukon.Url.Tree,
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
            var data = result.data;
            var properties = [];
            this.ImportExportLog = []
            data.forEach(element => {
              properties.push(element.PropertyValueMap.EnName);
              this.ImportExportLog.push(element.PropertyValueMap);
            });
          }
        })
        .catch(err => {
          this.loading = true;
          console.log(err);
        });
    },
    getTable() {
      var filterParams = JSON.stringify({
        Name: "ImportExportLog",
        DefaultVal: "HistogramDetail",
        Filter: ""
      });
      this.$http
        .post(
          Yukon.Url.Tree,
          JSON.stringify({
            token: this.token,
            reqInfo: filterParams
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          // console.log(res);
          var result = JSON.parse(res.body);
          if (result.code == 0) {
            // console.log(result.data)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
