<template>
  <div class="cover_dialog">
    <el-dialog
      :show-overflow-tooltip="true"
      title="选择文件夹"
      :visible.sync="dialogVisible"
      :before-close="btnCanel"
    >
      <el-tree
        ref="tree"
        :props="filterData"
        :load="loadNode1"
        lazy
        show-checkbox
        check-strictly
        node-key = 'id'
        accordion
        @check-change="handleCheckChange"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <input
          type="text"
          disabled="false"
          :value="tableData.ConnectionPath"
          style="background:#ffffff;border:1px solid #ccc;width:50%;height:30px;line-height:30px;float:left;padding:0 10px;"
        >
        <el-button size="small" @click="btnCanel">取消</el-button>
        <el-button size="small" type="primary" @click="btnSure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import qs from "qs";
export default {
  props: ["DBdialogVisible", "tableData"],
  data() {
    return {
      dialogVisible: this.DBdialogVisible,
      filterData: {
        label: "label",
        children: "zones",
        isLeaf: "leaf"
      },
      filterString: "",
      filterLevel: "",
      filterPath: ""
    };
  },
  computed: {
    ...mapGetters(["token"]) // 获取vuex的token
  },
  mounted() {
    // console.log(this.tableData);
  },
  methods: {
    btnCanel() {
      this.dialogVisible = false;
      this.$emit("DialogVisibleFalse", false);
    },
    btnSure() {
      this.dialogVisible = false;
      this.$emit("DialogVisibleFalse", false);
      eventBus.$emit("filterPath", this.filterPath);
    },
    loadNode1(node, resolve) {
      // console.log(node);
      if (node.level === 0) {
        var filterParams = JSON.stringify({
          Name: "OpenFileDialog",
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
            var result = JSON.parse(res.body);
            // console.log(result);
            if (result.code == 0) {
              return resolve(result.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (node.data != undefined && node.level == 1) {
        setTimeout(() => {
          this.filterString = node.data.label + ": ";
          var filterParams = JSON.stringify({
            Name: "OpenFileDialog",
            Filter: this.filterString
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
                return resolve(result.data);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }, 500);
      }
      if (node.level > 1) {
        // console.log(node);
        setTimeout(() => {
          this.filterString = node.data.parent;
          var filterParams = JSON.stringify({
            Name: "OpenFileDialog",
            Filter: this.filterString
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
                return resolve(result.data);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }, 500);
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      if (checked) {
        var arr = [{'id':data.id,'label':data.label}]
        this.$refs.tree.setCheckedNodes(arr);
        this.$refs.tree.getCheckedNodes()
        this.tableData.ConnectionPath = data.parent;
        this.filterPath = data.parent;
      }
    }
  }
};
</script>

<style>
</style>
 