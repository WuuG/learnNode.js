<template>
  <div class="signin-form" @keyup.enter="handleFormSubmit('signinForm')">
    <el-form
      :model="form"
      :label-width="labelWidth"
      :rules="rules"
      ref="signinForm"
    >
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" size="small"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="end">
          <el-col :span="12">
            <el-button type="primary" @click="handleFormSubmit('signinForm')"
              >登录</el-button
            >
            <el-button @click="handleFormReset('signinForm')">重置</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { signin } from "@/network/api/passport";
export default {
  name: "SigninForm",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      labelWidth: "70px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //发送网络请求
    async signin() {
      try {
        return await signin(this.form);
      } catch (error) {
        console.log(error);
      }
    },
    //页面逻辑
    handleFormSubmit(ref) {
      this.$refs[ref].validate(async (valid) => {
        if (!valid) {
          console.log("校验失败");
          return;
        }
        const result = await this.signin();
        if (result.data.message == "成功登录！") {
          this.$message({
            type: "success",
            message: result.data.message,
          });
          this.$router.replace("/home");
        } else {
          this.$message({
            type: "error",
            message: result.data.message,
          });
        }
      });
    },
    handleFormReset(ref) {
      this.$refs[ref].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.signin-form {
  margin: 10px 30px 10px 30px;
}
</style>