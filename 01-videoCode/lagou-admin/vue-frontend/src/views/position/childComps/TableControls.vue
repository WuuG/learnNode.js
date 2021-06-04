<template>
  <div id="position-table-controls" @keyup.enter="addPos('form')">
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
      class="add-dialog"
    >
      <el-form :model="posForm" :rules="userRules" ref="form">
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
          <el-input v-model="posForm.companyName"></el-input>
        </el-form-item>
        <el-form-item
          label="职位名称"
          :label-width="formLabelWidth"
          prop="positionName"
        >
          <el-input v-model="posForm.positionName"></el-input>
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
        positionName: "",
        city: "",
        salary: "",
        companyLogo: "",
      },
      formLabelWidth: "90px",
      userRules: {
        companyLogo: [
          { required: true, message: "请上传公司Logo", trigger: "blur" },
        ],
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
      src: "",
    };
  },
  components: {
    UserTableHeader,
  },
  methods: {
    // 添加数据网络请求
    async addPosReq() {
      // 调用PosDatas
      const { form } = new posReq.PosDatas(this.posForm);
      console.log(form);
      const result = await posReq.add(form);
      return result;
    },

    beforeUpload(file) {
      const windowURL = window.URL || window.webkitURL;
      this.src = windowURL.createObjectURL(file);
      this.posForm.companyLogo = file;
      return false;
    },
    // 添加后 同步获取添加用户的结果
    addPos(refName) {
      this.$refs[refName].validate(async (valid) => {
        if (valid) {
          try {
            this.addDialogVisible = false;
            // 处理其他数据
            const res = await this.addPosReq();
            console.log(res);
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
.add-dialog {
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
<style >
#position-table-controls .add-dialog .el-dialog {
  min-width: 320px;
}
</style>