<template>
  <div style="width:49.8%; padding: 4px;border: 1px solid #dcdfe6;">
    <ve-pie
      :data="chartData"
      :data-empty="dataEmpty"
      :events="chartEvents"
      :settings="chartSettings"
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
    this.chartSettings = {};
    this.chartEvents = {
      click: function(e) {
        eventBus.$emit("service", that.filter, e.name);
        eventBus.$emit("chartTable", that.filter, e.name, "");
      }
    };
    return {
      chartData: {},
      filter: "",
      chartExtend: {},
      dataEmpty: false
    };
  },
  computed: {
    ...mapGetters(["token"]) // 获取vuex的token
  },
  // watch: {
  //  filter(val){
  //     console.log(val)
  //  }
  // },
  mounted() {
    eventBus.$on("server", (val, item, statusValue, typeValue) => {
      console.log(val, item, statusValue);
      var itemFilter = "";
      var statusValueFilter = "";
      var typeValueFilter = "";
      if (item == "" || item==undefined) {
        itemFilter = "";
      } else {
        itemFilter = "OwnerName,==," + item+ ",AND;"
      }
      if (statusValue == "" || statusValue ==undefined) {
        statusValueFilter = "";
      } else {
        statusValueFilter = "Status,==," + statusValue + ",AND;";
      }
      if (typeValue == "" || typeValue==undefined) {
        typeValueFilter = "";
      } else {
        typeValueFilter = "Type,==," + typeValue + ",AND;";
      }
      this.filter = val + itemFilter + statusValueFilter + typeValueFilter;

      this.getPie();
    });
  },
  methods: {
    getPie() {
      var dbtableParams = JSON.stringify({
        Name: "ImportExportLog",
        DefaultVal: "ServiceChartPie",
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
            console.log(this.chartData )
            if (this.chartData.rows.length <= 0) {
              this.dataEmpty = true;
              eventBus.$emit("service", this.filter, "");
              eventBus.$emit("chartTable", this.filter, "", "");
            } else {
              this.dataEmpty = false;
              eventBus.$emit(
                "service",
                this.filter,
                this.chartData.rows[0].服务
              );
              eventBus.$emit("chartTable", this.filter, "", "");
            }
             var numData = genData(this.chartData.rows);
             
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
    userUseNumData.push(val[i].服务);
    userUseNumValue.push(val[i].导入导出数);
  }
  var legendData = [];
  var seriesData = [];
  var selected = {};
  for (var i = 0; i < userUseNumData.length; i++) {
    var name = userUseNumData[i]
    var value = userUseNumValue[i]
    legendData.push(name);
    seriesData.push({
      name:name,
      value:value
    })
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
