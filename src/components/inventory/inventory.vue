<template>
  <tl-table :operationTableName="operationTableName"></tl-table>
</template>

<script>
import tlTable from "../common/normal/importlist";
export default {
  components: {
    tlTable
  },
  data() {
    return {
      operationTableName:"WMS"
    }
  }
};
</script>

<style>
</style>
