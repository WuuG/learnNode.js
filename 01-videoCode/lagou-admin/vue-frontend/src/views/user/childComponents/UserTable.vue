<template>
  <div>
    <el-table
      :data="tableShowDatas"
      stripe
      highlight-current-row
      ref="table"
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
          <el-button size="mini" @click="popDeleteDialog(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      ref="pagination"
      class="pagenation"
      layout="total,->,prev, pager, next"
      :total="userTableDatas.length"
      background
      @current-change="handlePageChange"
    >
    </el-pagination>
    <el-dialog title="删除用户" :visible.sync="deletedialogVisible" width="30%">
      <span>您确定要删除用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, deleteUser } from "@/network/api/passport";
export default {
  data() {
    return {
      userTableDatas: [],
      tableShowDatas: [],
      deletedialogVisible: false,
      row: {},
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
      console.log(index, row);
    },
    popDeleteDialog(row) {
      this.deletedialogVisible = true;
      this.row = row;
    },
    async handleDelete() {
      try {
        const res = await deleteUser(this.row._id);
        this.$message({
          type: "success",
          message: res.message,
        });
      } catch (error) {
        this.$message(error);
      }
      await this.load();
      const currentpage = this.$refs.pagination.internalCurrentPage;
      this.setPage(currentpage);
      this.handlePageChange(currentpage);
      this.deletedialogVisible = false;
    },
    // 刷新用户表格数据
    async load() {
      const initDatas = await getUserList();
      this.userTableDatas = initDatas;
      this.tableShowDatas = this.userTableDatas.slice(0, 10);
    },
    handlePageChange(index) {
      this.tableShowDatas = this.userTableDatas.slice(
        (index - 1) * 10,
        index * 10
      );
    },
    // 设置pagination的当前页面
    setPage(index) {
      console.log(index);
      this.$refs.pagination.internalCurrentPage = index;
    },
  },
  created() {
    this.load();
  },
};
</script>

<style lang="scss" scoped>
.pagenation {
  margin: 10px;
  text-align: left;
}
</style>