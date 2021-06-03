<template>
  <div>
    <el-breadcrumb seprator="/" class="breadcrumb">
      <el-breadcrumb-item>职位管理</el-breadcrumb-item>
    </el-breadcrumb>
    <position-table></position-table>
  </div>
</template>

<script>
import PositionTable from "./childComps/PositionBaseTable";
export default {
  name: "Position",
  components: {
    PositionTable,
  },
};
</script>

<style lang="scss" scoped>
</style>