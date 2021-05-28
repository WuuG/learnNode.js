<template>
  <div>
    <user-table-header height="40">
      <template #leftContent>
        <el-row class="user-controller">
          <el-col :span="4" :offset="2"
            ><el-button @click="addDialogVisible = true" type="primary" plain
              >添加用户</el-button
            ></el-col
          >
        </el-row>
      </template>
    </user-table-header>
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
      @closed="handleClose"
    >
      <el-form :model="userForm" :rules="userRules">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          type="password"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import UserTableHeader from "@/components/common/Header.vue";
import { signupRequest } from "@/network/api/passport";
export default {
  data() {
    return {
      addDialogVisible: false,
      userForm: {
        username: "",
        password: "",
      },
      formLabelWidth: "80px",
      userRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  components: {
    UserTableHeader,
  },
  methods: {
    //同步获取添加用户的结果
    async addUser() {
      this.addDialogVisible = false;
      const result = await signupRequest(this.userForm);
      if (result === "用户名已存在") {
        this.$message({
          message: result,
          type: "warning",
        });
        return;
      }
      this.$message({
        message: result,
        type: "success",
      });
      // 自定义事件，给父组件调用
      this.$emit("add-user");
    },
    // 关闭dialog时，将数据清空。
    handleClose() {
      this.userForm = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.user-controller {
  height: 40px;
  line-height: 40px;
}
</style>