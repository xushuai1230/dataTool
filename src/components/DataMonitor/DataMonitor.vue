<template>
  <div class="conmmonlist menu">
    <!-- <div class="toolBar">
      <el-button class="bar" @click="reset()" size="mini" icon="el-icon-circle-plus-outline">刷新</el-button>
    </div> -->
    
    <div class="commonTable">
      <div class="listTable">
        <el-table
          :data="tableData"
          border
          stripe
          height="100%"
          highlight-current-row
          v-loading="loading"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            :index="calculationIndex"
            align="center"
            label="序号"
            width="55"
            fixed
          ></el-table-column>
          <el-table-column type="selection" align="center" width="55" fixed></el-table-column>
          <el-table-column
            v-for="(item,index) in ImportExportLog"
            v-if="item.IsDisplayList==1"
            :prop="item.Code"
            :label="item.CnName"
            :key="index"
            :show-overflow-tooltip="true"
            sortable
          ></el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[30, 45, 60]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    var that = this;
    return {
      startDate: "",
      endDate: "",
      sourceTenantData: [],
      sourceTenant: "",
      tableData: [],
      ImportExportLog: [],
      loading: false,
      currentPage: 1, // 初始页数
      pageSize: 30, // 初始化页码
      totalItems: 0,
      index: 1
    };
  },
  computed: {
    ...mapGetters(["token"]) // 获取vuex的token
  },
  mounted() {
    this.getDBField();
  },
  methods: {
    getDBField() {
      this.loading = true;
      var dbtableParams = JSON.stringify({
        Name: "DBField",
        TblName: "ImportExportLog"
      });
      this.$http
        .post(
          Yukon.Url.Log,
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
            this.ImportExportLog = [];
            data.forEach(element => {
              properties.push(element.PropertyValueMap.EnName);
              this.ImportExportLog.push(element.PropertyValueMap);
            });
          }
          this.getComunts(properties);
        })
        .catch(err => {
          this.loading = true;
          console.log(err);
        });
    },
    getComunts(properties) {
      var dbtableParams = JSON.stringify({
        Name: "ImportExportLog",
        DefaultVal: "SearchPage",
        CurrentPage: this.currentPage,
        PageSize: this.pageSize,
        Properties: properties,
        Filter: ""
      });
      this.$http
        .post(
          Yukon.Url.Log,
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
            this.loading = false;
            var data = result.data;
            this.totalItems = result.TotalRow;
            this.tableData = data.PropertyValueMaps;
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    // 刷新
    reset() {
      this.getDBField();
    },
    // pageSize方法
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      this.getDBField();
    },
    // currentPage
    handleCurrentChange(val) {
      this.currentPage = val;
      this.index = val;
      this.getDBField();
    },
    // 计算分页
    calculationIndex(index) {
      return index + (this.index - 1) * this.pageSize + 1;
    }
  }
};
</script>

<style>
</style>
