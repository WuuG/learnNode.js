<template>
  <div>
    <el-button @click="signup">传数据</el-button>
  </div>
</template>

<script>
import { signupRequest } from "@/network/api/passport";
export default {
  name: "User",
  methods: {
    signup() {
      signupRequest({
        username: "wwug",
        password: "123",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>