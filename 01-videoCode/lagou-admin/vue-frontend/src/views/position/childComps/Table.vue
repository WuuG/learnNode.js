<template>
  <div class="table-card" @keyup.enter="handleDelete">
    <table-controls @add-pos="load"></table-controls>
    <el-table
      :data="tableShowDatas"
      stripe
      highlight-current-row
      ref="table"
      @selection-change="handleSelectChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column
        prop="companyLogo"
        label="头像"
        width="80"
        align="center"
      >
        <template #default="scope">
          <el-image
            class="company-logo"
            :src="imgSourceBaseURL + scope.row.companyLogo"
            fit="cover"
          >
            <div slot="error" class="company-logo">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="公司名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="city" label="城市" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="positionName"
        label="职位名称"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="salary"
        label="薪水"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="170">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
      :page-size="pageSize"
      :current-page.sync="curPage"
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
    <table-edit-dialog
      :id="activePos._id"
      :visible="dialogEditVisible"
      @close="changeEditDialogVisble"
      @load="load"
      ref="editDialog"
    ></table-edit-dialog>
  </div>
</template>

<script>
import posReq from "network/api/positions";

import TableControls from "./TableControls";
import TableEditDialog from "./TableEditDialog";
export default {
  components: {
    TableControls,
    TableEditDialog,
  },
  data() {
    return {
      // 职位管理表格数据
      posTableDatas: [],
      // 职位管理显示的数据
      tableShowDatas: [],
      deletedialogVisible: false,
      dialogEditVisible: false,
      activePos: {},
      curPage: 1,
      pageSize: 9,
      // 图片的baseURL
      imgSourceBaseURL: "http://localhost:3000/uploads/",
    };
  },
  methods: {
    // 网络请求
    async getList() {
      const result = await posReq.list();
      return result.data.data;
    },
    async deleteByid(id) {
      try {
        const result = await posReq.deleteById(id);
        if (result.status === 202) {
          this.$message({
            type: "warning",
            message: "所删除的用户不存在",
          });
          return false;
        }
        this.$message({
          type: "success",
          message: "用户删除成功",
        });
        return true;
      } catch (error) {
        console.log(`frontEnd deleteByid error:${error}`);
        return false;
      }
    },

    // 处理复选框的选择
    handleSelectChange(rows) {
      this.getList();
      console.log(rows);
    },
    // 处理编辑操作
    handleEdit(row) {
      // 处理editDialog的url form，总感觉这里有更好的办法
      this.$refs.editDialog.src = this.imgSourceBaseURL + row.companyLogo;
      this.$refs.editDialog.form = { ...row };
      this.$refs.editDialog.handleForm();
      this.changeEditDialogVisble();
    },
    // 点击删除后弹出Dialog
    popDeleteDialog(row) {
      this.deletedialogVisible = true;
      this.activePos = row;
    },
    // 处理Dialog确定删除
    async handleDelete() {
      if (this.deletedialogVisible) {
        console.log(`handleDelet`);
        const result = await this.deleteByid(this.activePos._id);
        if (!result) {
          console.log("用户删除失败");
        }
        this.deletedialogVisible = false;
        this.load();
      }
    },
    // 刷新用户表格数据
    async load() {
      const index = this.curPage;
      const initDatas = await this.getList();
      this.posTableDatas = initDatas;
      this.handlePageChange(index);
    },
    // 处理页面变动
    handlePageChange(index) {
      this.curPage = index;
      this.tableShowDatas = this.posTableDatas.slice(
        (index - 1) * this.pageSize,
        index * this.pageSize
      );
    },
    changeEditDialogVisble() {
      this.dialogEditVisible = !this.dialogEditVisible;
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
.company-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
}
</style>