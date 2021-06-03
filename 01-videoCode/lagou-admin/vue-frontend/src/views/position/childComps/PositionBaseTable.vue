<template>
  <div class="table-card">
    <el-row>
      <el-col :offset="2" :span="4">
        <el-button size="mini" type="primary" plain>添加职位</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      ref="table"
      @selection-change="handleSelectChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        :filters="[
          { text: 'wuug', value: 'wuug' },
          { text: 'cjs', value: 'cjs' },
        ]"
        :filter-method="userFilter"
      >
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
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
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  data() {
    return {
      tableData: [
        {
          date: "2020-12-22",
          name: "wuug",
          address: "上海市普陀区金沙江路 1234 弄",
          id: "1",
        },
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
        {
          date: "2020-12-22",
          name: "wuug",
          address: "上海市普陀区金沙江路 1234 弄",
        },
      ],
    };
  },
  methods: {
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
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>