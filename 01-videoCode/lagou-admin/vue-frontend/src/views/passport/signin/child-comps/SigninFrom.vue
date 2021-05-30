<template>
  <div class="signin-form">
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
    handleFormSubmit(ref) {
      this.$refs[ref].validate((valid) => {
        if (!valid) {
          console.log("校验失败");
          return;
        }
        console.log("检验成功");
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