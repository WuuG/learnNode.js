<template>
  <div>
    <user-breadcrumb></user-breadcrumb>
    <div class="card">
      <user-controller @add-user="loadTableDatas"></user-controller>
      <user-table ref="userTable"></user-table>
    </div>
  </div>
</template>

<script>
import { signupRequest } from "@/network/api/passport";

import UserTable from "./childComponents/UserTable";
import UserController from "./childComponents/UserController";
import UserBreadcrumb from "./childComponents/UserBreadcrumb";
export default {
  name: "User",
  components: {
    UserTable,
    UserController,
    UserBreadcrumb,
  },
  methods: {
    signup() {
      signupRequest({
        username: "wwug",
        password: "123",
      });
    },
    // 调用子组件的方法，进行表格刷新方法。
    loadTableDatas() {
      this.$refs.userTable.load();
      this.$$refs.userTable.set(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 5px;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 0 10px #ccc;
}
</style>