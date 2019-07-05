<template>
  <div class="logmonitor">
    <div class="conditions">
      <span>开始时间 </span>
      <el-date-picker v-model="startDate" type="date" placeholder="选择日期"></el-date-picker>
      <span>结束时间 </span>
      <el-date-picker v-model="endDate" type="date" placeholder="选择日期"></el-date-picker>
      <el-button size="small" @click="getCat">查询</el-button>
    </div>
    <chartBar ref="chartBar"></chartBar>
    <div style="display: flex;justify-content: space-between;padding:4px;">
      <chartPie></chartPie>
      <charttablePie></charttablePie>
    </div>

    <chartTable></chartTable>
  </div>
</template>

<script>
import chartBar from "./chartBar";
import chartPie from "./chartPie";
import charttablePie from "./charttablePie";
import chartTable from "./chartTable";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      startDate: "",
      endDate: ""
    };
  },
  components: {
    chartBar,
    chartPie,
    charttablePie,
    chartTable
  },

  computed: {},
  mounted() {
    this.getCat();
  },
  methods: {
    // sendMssage() {
    //   var dbtableParams = JSON.stringify({
    //     Name: "ImportExportLog",
    //     DefaultVal: "SendMessage",
    //     Filter: ""
    //   });
    //   this.$http
    //     .post(
    //       Yukon.Url.Tree,
    //       JSON.stringify({
    //         token: this.token,
    //         reqInfo: dbtableParams
    //       }),
    //       {
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //       }
    //     )
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    getCat() {
      this.$refs.chartBar.getCat(
        this.startDate,
        this.endDate
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
