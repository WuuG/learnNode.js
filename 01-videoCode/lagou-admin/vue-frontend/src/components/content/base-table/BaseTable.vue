<template>
  <div class="table-card">
    <base-table-Control></base-table-Control>
    <el-table
      :data="tableShowDatas"
      stripe
      highlight-current-row
      ref="table"
      @selection-change="handleSelectChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="name" label="用户名"> </el-table-column>
      <el-table-column prop="date" label="实践" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
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
import BaseTableControl from "./BaseTableControl";
export default {
  components: {
    BaseTableControl,
  },
  data() {
    return {
      userTableDatas: [],
      tableShowDatas: [],
      deletedialogVisible: false,
      row: {},
    };
  },
  methods: {
    // 处理复选框的选择
    handleSelectChange(rows) {
      console.log(rows);
    },
    // 过滤数据
    filter(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 处理编辑操作
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 处理删除操作
    async handleDelete(row) {
      console.log(row);
    },
    // 删除dialog的跳出
    popDeleteDialog(row) {
      this.deletedialogVisible = true;
      this.row = row;
    },
    // 刷新用户表格数据
    async load() {
      const initDatas = [
        {
          date: "2020-12-22",
          name: "wuug",
          address: "上海市普陀区金沙江路 1234 弄",
        },
        {
          date: "2020-12-22",
          name: "wuug",
          address: "上海市普陀区金沙江路 1234 弄",
        },
      ];
      this.userTableDatas = initDatas;
      this.tableShowDatas = this.userTableDatas.slice(0, 10);
    },
    // 处理页面变动
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