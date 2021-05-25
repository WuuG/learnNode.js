<template>
  <div>
    <h1>主页</h1>
    <el-button @click="getTest">现在引入element</el-button>
  </div>
</template>

<script>
import { getTest } from "../network/api/test";
export default {
  name: "Home",
  methods: {
    getTest() {
      getTest();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>