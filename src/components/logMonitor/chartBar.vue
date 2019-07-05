<template>
  <div class="histogram">
    <div class="content">
      <ve-bar
        :data="chartData"
        :events="chartEvents"
        :settings="chartSettings"
        :extend="chartExtend"
        style="width:100%;"
        :legend-visible="false"
        :data-empty="dataEmpty"
        :colors ="colors"
      ></ve-bar>
    </div>
    <div class="userContent">
      <span>租户</span>
      <el-select v-model="userValue" @change="userDetail()" placeholder="请选择">
        <el-option v-for="(item,index) in userData" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <span>操作</span>
      <el-select v-model="typeValue" @change="userDetail()" placeholder="请选择">
        <el-option
          v-for="(item,index) in typeData"
          :key="index"
          :label="item.name"
          :value="item.Value"
        ></el-option>
      </el-select>
      <span>状态</span>
      <el-select v-model="statusValue" @change="userDetail()" placeholder="请选择">
        <el-option
          v-for="(item,index) in statusData"
          :key="index"
          :label="item.name"
          :value="item.Value"
        ></el-option>
      </el-select>
    </div>
    <dataMonitor
      :dataMonitorVisible="dataMonitorVisible"
      v-on:DialogVisibleFalse="dbfiledClose"
      v-if="dataMonitorVisible"
    ></dataMonitor>
  </div>
</template>

<script>
import dataMonitor from "../common/dialog/dataMonitor";
import { mapGetters } from "vuex";

export default {
  components: {
    dataMonitor
  },

  data() {
    var that = this;
    this.chartSettings = {
      stack: {
        xxx: ["导入成功", "导入失败", "导出成功", "导出失败"]
      },
    };
    this.chartEvents = {
      click: function(e) {
        // console.log(e);
        // that.dataMonitorVisible = true;
      }
    };
    this.colors= ["#F17575", "#ffa897", "#77B6F7", "#ffffff"];
    return {
      dataMonitorVisible: false,
      chartData: {},
      chartTotal: {},
      chartExtend: {},
      userData: [],
      colors:[],
      statusData: [
        { Value: "", name: "全部" },
        {
          Value: "成功",
          name: "成功"
        },
        { Value: "失败", name: "失败" }
      ],
      typeData: [
        { Value: "", name: "全部" },
        {
          Value: "导入",
          name: "导入"
        },
        { Value: "导出", name: "导出" }
      ],
      dataEmpty: false,
      filter: "",
      startDate: "",
      endDate: "",
      userValue: "",
      statusValue: "",
      typeValue: ""
    };
  },
  computed: {
    ...mapGetters(["token"]) // 获取vuex的token
  },
  mounted() {},
  methods: {
    dbfiledClose(val) {
      this.dataMonitorVisible = val;
    },

    getCat(startDate, endDate) {
      console.log(startDate, "11", endDate, "11");
       this.userValue = '';
        this.statusValue = '';
        this.typeValue = ''
      var start = "";
      var end = "";
      var filter = "";
      if (startDate) {
        start = this.$common.getPreMonth(startDate)[2];
      }
      if (endDate) {
        end = this.$common.getPreMonth(endDate)[1];
      }
      if (startDate || endDate) {
        if (startDate && endDate) {
          if (startDate.getTime() > endDate.getTime()) {
            this.$message({
              type: "warning",
              message: "请选择正确的时间"
            });
            return false;
          }
        }
        filter =
          "CreateTime,>=," + start + ",AND;CreateTime,<," + end + ",AND;";
      }
      if (!startDate && !endDate) {
        end = this.$common.getPreMonth()[1];
        start = this.$common.getPreMonth()[0];
        filter =
          "CreateTime,>=," + start + ",AND;CreateTime,<," + end + ",AND;";
      }
      this.filter = filter;
      var dbtableParams = JSON.stringify({
        Name: "ImportExportLog",
        DefaultVal: "Histogram",
        Filter: filter
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
          console.log(result);
          if (result.code == 0) {
            var data = result.data;
            this.userData = data.group;
            this.chartData = data.groupData[0].data;
            eventBus.$emit("server", this.filter, "");
            if (this.chartData.rows.length <= 0) {
              this.dataEmpty = true;
            } else {
              this.dataEmpty = false;
            }
            this.colors = data.colorList
            var that = this;
            this.chartExtend = {
              title: {
                text: data.name,
                x: "center",
                top: 10
              },
              //   yAxis: {
              //     type: "category",
              //     value:"导入带出记录"
              //   },
              xAxis: {
                // axisLabel: {
                //   interval: 0,
                //   rotate: 30
                // }
              },
              grid: {
                left: 50,
                right: 100
              }
              // legend: {
              //   type: "scroll",
              //   orient: "vertical",
              //   right: 20,
              //   top: 80,
              //   bottom: 20,
              //   data: that.chartData.columns
              // }
              // series(v) {
              //   v =[{
              //     label:{
              //       show:true
              //     }
              //   }]
              //   return v;
              // }
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    userDetail() {
      eventBus.$emit(
        "server",
        this.filter,
        this.userValue,
        this.statusValue,
        this.typeValue
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.histogram {
  padding: 4px;
  .content {
    width: 100%;
    border: 1px solid #dcdfe6;
    background: #fff;
    display: flex;
    justify-content: space-between;
  }
  .userContent {
    border: 1px solid #dcdfe6;
    margin-top: 4px;
    padding: 4px;
    background: #fff;
  }
}
</style>
