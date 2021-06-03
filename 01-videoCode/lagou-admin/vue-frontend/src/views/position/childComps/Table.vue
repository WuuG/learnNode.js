<template>
  <div class="table-card">
    <table-controls @add-pos="load"></table-controls>
    <el-table
      :data="tableShowDatas"
      stripe
      highlight-current-row
      ref="table"
      @selection-change="handleSelectChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="avatar" label="头像"
        ><img
          src="../../../assets/images/logo.png"
          alt=""
          class="img"
          width="20px"
          height="20px"
      /></el-table-column>
      <el-table-column prop="companyName" label="公司名"> </el-table-column>
      <el-table-column prop="city" label="城市"> </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="salary" label="薪水"></el-table-column>
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
      :total="posTableDatas.length"
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
import posReq from "../../../network/api/positions";
import tableControls from "./TableControls";
export default {
  components: {
    tableControls,
  },
  data() {
    return {
      posTableDatas: [],
      tableShowDatas: [],
      deletedialogVisible: false,
      row: {},
      curPage: 1,
    };
  },
  methods: {
    // 网络请求
    async getList() {
      const result = await posReq.list();
      return result.data.data;
    },

    // 处理复选框的选择
    handleSelectChange(rows) {
      this.getList();
      console.log(rows);
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
      const index = this.curPage;
      const initDatas = await this.getList();
      this.posTableDatas = initDatas;
      this.handlePageChange(index);
      this.setPage(index);
    },
    // 处理页面变动
    handlePageChange(index) {
      this.curPage = index;
      this.tableShowDatas = this.posTableDatas.slice(
        (index - 1) * 10,
        index * 10
      );
    },
    // 设置pagination的当前页面
    setPage(index) {
      this.$refs.pagination.internalCurrentPage = index;
    },
    // 添加完数据后的回调函数
  },
  created() {
    this.load(1);
  },
};
</script>

<style lang="scss" scoped>
.pagenation {
  margin: 10px;
  text-align: left;
}
</style>