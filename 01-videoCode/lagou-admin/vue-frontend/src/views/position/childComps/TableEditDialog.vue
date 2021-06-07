<template>
  <el-dialog
    title="编辑职位"
    :width="width"
    :visible.sync="visible"
    :before-close="handleClose"
    class="dialog"
  >
    <el-form v-if="form" :model="form" :rules="rules" ref="form">
      <el-form-item
        label="公司Logo"
        :label-width="formLabelWidth"
        prop="companyLogo"
      >
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeUpload"
        >
          <img v-if="src" :src="src" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="公司名"
        :label-width="formLabelWidth"
        prop="companyName"
      >
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item
        label="职位名称"
        :label-width="formLabelWidth"
        prop="positionName"
      >
        <el-input v-model="form.positionName"></el-input>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
        <el-input v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item
        label="薪资水平"
        :label-width="formLabelWidth"
        prop="salary"
      >
        <el-input v-model="form.salary"></el-input>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="modifyPosition('form')"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import posReq from "network/api/positions";
export default {
  data() {
    return {
      formLabelWidth: "90px",
      width: "300px",
      rules: {
        companyName: [
          { required: true, message: "请输入公司名", trigger: "blur" },
        ],
        positionName: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
        ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        salary: [
          { required: true, message: "请输入薪资水平", trigger: "blur" },
        ],
      },
      // src,form由父组件修改
      src: "",
      form: null,
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    beforeUpload(file) {
      const windowURL = window.URL || window.webkitURL;
      this.src = windowURL.createObjectURL(file);
      this.form.companyLogo = file;
      return false;
    },
    modifyPosition(ref) {
      try {
        this.$refs[ref].validate(async (valid) => {
          if (valid) {
            const result = await posReq.modifyPosition(this.form);
            this.$emit("close");
            this.$emit("load");
            if (result.status === 200) {
              this.$message({
                type: "success",
                message: "职位修改成功",
              });
              return;
            }
            console.log(result);
          }
        });
      } catch (error) {
        console.log(error?.response);
      }
    },
    // 处理传入编辑的form表单
    handleForm() {
      this.form = new posReq.ModifyFormFilter(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>