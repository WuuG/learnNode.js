<template>
  <el-table
    :data="userTableDatas"
    stripe
    highlight-current-row
    ref="table"
    max-height="820"
    @selection-change="handleSelectChange"
  >
    <el-table-column type="selection" width="45"></el-table-column>
    <el-table-column prop="username" label="用户名"> </el-table-column>
    <el-table-column prop="password" label="密码" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" width="170">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button size="mini" @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getUserList } from "@/network/api/passport";
export default {
  data() {
    return {
      userTableDatas: [],
    };
  },
  methods: {
    //表格获取数据
    async getUserList() {
      const initDatas = await getUserList();
      return initDatas;
    },
    //表格操作
    handleSelectChange(rows) {
      console.log(rows);
    },
    userFilter(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleEdit(index, row) {
      console.log(this.userTableDatas);
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 刷新用户表格数据
    async load() {
      const initDatas = await getUserList();
      this.userTableDatas = initDatas;
    },
  },
  created() {
    this.load();
  },
};
</script>

<style lang="scss" scoped>
</style>