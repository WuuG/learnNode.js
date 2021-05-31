<template>
  <el-popover
    placement="bottom"
    width="200"
    trigger="click"
    @hide="handlePop"
    @show="handlePop"
  >
    <div>
      <el-row>
        <el-col :span="16" class="username"><h3>wuug jeey</h3></el-col>
        <el-col :span="8">
          <el-button @click="signout">登出</el-button>
        </el-col>
      </el-row>
    </div>
    <template v-slot:reference>
      <div class="user-info" :class="{ active: active }">
        <el-avatar size="small" class="avatar">user</el-avatar>
        <span>wuug jeey</span>
      </div>
    </template>
  </el-popover>
</template>

<script>
import { signout } from "@/network/api/passport";
export default {
  name: "HomeHeaderInfo",
  data() {
    return {
      active: false,
    };
  },
  methods: {
    // 通过奇怪的方式来进行userinfo背景色的控制
    handlePop() {
      this.active = !this.active;
    },
    async signout() {
      try {
        const res = await signout();
        localStorage.removeItem("token");
        this.$message({
          type: "success",
          message: res.data.data.message,
        });
        this.$router.replace("/passport/signin");
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.username {
  line-height: 40px;
}
.user-info {
  display: flex;
  padding: 0 20px;
  height: $-height-bar;
  max-width: 200px;
  line-height: $-height-bar;
  color: $-color-white;
  .avatar {
    margin-top: 25px - 14px;
    margin-right: 10px;
  }
  &:hover {
    cursor: pointer;
    background-color: $-color-deep-primary;
  }
}
.active {
  background-color: $-color-deep-primary;
}
</style>