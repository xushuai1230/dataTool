<template>
  <div class="cover_dialog">
    <el-dialog title="导入" :visible.sync="dialogVisible" :before-close="btnCanel">
       <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="Service" label="Service" width="80"></el-table-column>
        <el-table-column prop="Table" label="Table" width="120"></el-table-column>
        <el-table-column prop="Status" :show-overflow-tooltip="true" label="Status"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="btnCanel">取消</el-button>
        <el-button size="small" type="primary" @click="btnSure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["importVisible","exportTableData"],
  data() {
    return {
      dialogVisible: this.importVisible,
      tableData:[]
    };
  },
  mounted() {
     this.tableData = this.exportTableData
  },
  methods: {
    btnCanel() {
      this.dialogVisible = false;
      this.$emit("DialogVisibleFalse", false);
    },
    btnSure() {
      this.dialogVisible = false;
      this.$emit("DialogVisibleFalse", false);
    }
  }
};
</script>

<style>
</style>
