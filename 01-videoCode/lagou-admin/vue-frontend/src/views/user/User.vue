<template>
  <div>
    <el-button @click="signup">传数据</el-button>
    <el-button @click="getUserList">获取数据</el-button>
  </div>
</template>

<script>
import { signupRequest, getUserList } from "@/network/api/passport";
export default {
  name: "User",
  methods: {
    signup() {
      signupRequest({
        username: "wwug",
        password: "123",
      });
    },
    async getUserList() {
      let data = await getUserList();
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>