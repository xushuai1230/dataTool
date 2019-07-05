<template>
  <div style="width:49.8%; padding: 4px;border: 1px solid #dcdfe6;">
    <ve-pie
      :data="chartData"
      :events="chartEvents"
      :settings="chartSettings"
      :data-empty="dataEmpty"
      :extend="chartExtend"
    ></ve-pie>
  </div>
</template>
<script>
</script>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    var that = this;
    this.chartSettings = {
      legendLimit:66
    };
    this.chartEvents = {
      click: function(e) {
        
        eventBus.$emit("chartTable", that.date, that.tableService, e.name);
      }
    };
    return {
      chartData: {},
      filter: "",
      chartExtend: {},
      date: "",
      tableService: "",
      dataEmpty: false
    };
  },
  computed: {
    ...mapGetters(["token"]) // 获取vuex的token
  },
  mounted() {
    eventBus.$on("service", (val, service) => {
      this.date = val;
      this.tableService = service;
      if (service != "") {
        this.filter = val + "Service,==," + service + ",AND;";
      } else {
        this.filter = val;
      }

      this.getPie();
    });
  },
  methods: {
    getPie() {
      var dbtableParams = JSON.stringify({
        Name: "ImportExportLog",
        DefaultVal: "TableChartPie",
        Filter: this.filter
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

            this.chartData = data.data;

            if (this.chartData.rows.length <= 0) {
              this.dataEmpty = true;
            } else {
              this.dataEmpty = false;
            }
            var numData = genData(this.chartData.rows);
            // console.log(numData);
            var that = this;
            this.chartExtend = {
              title: {
                text: data.name,
                x: "center",
                top: 10
              },
              legend: {
                type: "scroll",
                orient: "vertical",
                right: 100,
                top: 80,
                bottom: 20,
                data: numData.legendData,
                selected: numData.selected
              },
              series(v) {
                v.forEach(i => {
                  i.label = {
                    show:false
                  }
                  i.center = ["30%", "50%"];
                  i.data = numData.seriesData;
                });
                return v;
              }
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
function genData(val) {
  var userUseNumData = [];
  var userUseNumValue = [];
  for (var i = 0; i < val.length; i++) {
    userUseNumData.push(val[i].表);
    userUseNumValue.push(val[i].导入导出数);
  }
  var legendData = [];
  var seriesData = [];
  var selected = {};
  for (var i = 0; i < userUseNumData.length; i++) {
    var name = userUseNumData[i];
    var value = userUseNumValue[i];
    legendData.push(name);
    seriesData.push({
      name: name,
      value: value
    });
    selected[name] = i < 6;
  }

  return {
    legendData: legendData,
    seriesData: seriesData,
    selected: selected
  };
}
</script>

<style>
</style>
