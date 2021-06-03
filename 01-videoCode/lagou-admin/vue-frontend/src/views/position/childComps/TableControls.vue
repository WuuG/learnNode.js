<template>
  <div>
    <user-table-header height="40">
      <template #leftContent>
        <el-row class="controller">
          <el-col :span="4" :offset="2"
            ><el-button
              @click="addDialogVisible = true"
              type="primary"
              plain
              size="mini"
              >添加职位</el-button
            ></el-col
          >
        </el-row>
      </template>
    </user-table-header>
    <el-dialog
      title="添加职位"
      :visible.sync="addDialogVisible"
      width="30%"
      @closed="handleClose"
    >
      <el-form :model="posForm" :rules="userRules" ref="form">
        <el-form-item
          label="公司名"
          :label-width="formLabelWidth"
          prop="companyName"
        >
          <el-input v-model="posForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
          <el-input v-model="posForm.city"></el-input>
        </el-form-item>
        <el-form-item
          label="薪资水平"
          :label-width="formLabelWidth"
          prop="salary"
        >
          <el-input v-model="posForm.salary"></el-input>
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPos('form')">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import UserTableHeader from "@/components/common/Header.vue";
import posReq from "network/api/positions";
export default {
  data() {
    return {
      addDialogVisible: false,
      posForm: {
        companyName: "",
        city: "",
        salary: "",
      },
      formLabelWidth: "80px",
      userRules: {
        companyName: [
          { required: true, message: "请输入公司名", trigger: "blur" },
        ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        salary: [
          { required: true, message: "请输入薪资水平", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    UserTableHeader,
  },
  methods: {
    // 添加数据网络请求
    async addPosReq(form) {
      const body = new posReq.PosDatas(form);
      const result = await posReq.add(body);
      return result;
    },

    //同步获取添加用户的结果
    addPos(refName) {
      this.$refs[refName].validate(async (valid) => {
        if (valid) {
          try {
            this.addDialogVisible = false;
            const res = await this.addPosReq(this.posForm);
            this.$message({
              type: "success",
              message: res.data.data.message,
            });
            // 自定义事件，给父组件调用
            this.$emit("add-pos");
          } catch (error) {
            console.log(`addPos error:${error}`);
          }
        }
      });
    },
    // 关闭dialog时，将数据清空。
    handleClose() {
      this.posForm = {};
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