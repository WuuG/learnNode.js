<template>
  <div>
    <table-header height="40">
      <template #leftContent>
        <el-row class="controller">
          <el-col :span="4" :offset="2"
            ><el-button
              @click="addDialogVisible = true"
              type="primary"
              plain
              size="mini"
              >添加用户</el-button
            ></el-col
          >
        </el-row>
      </template>
    </table-header>
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
      @closed="handleClose"
    >
      <el-form :model="Form" :rules="Rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          type="password"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="Form.password"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('form')">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import TableHeader from "@/components/common/Header.vue";
export default {
  data() {
    return {
      addDialogVisible: false,
      Form: {
        name: "",
        password: "",
      },
      formLabelWidth: "80px",
      Rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  components: {
    TableHeader,
  },
  methods: {
    //同步获取添加用户的结果
    async add(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.addDialogVisible = false;
          // 自定义事件，给父组件调用
          this.$emit("add");
        }
      });
    },
    // 关闭dialog时，将数据清空。
    handleClose() {
      this.Form = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.controller {
  height: 40px;
  line-height: 40px;
}
</style>