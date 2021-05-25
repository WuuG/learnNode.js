<template>
  <div>
    <el-container class="full_windows">
      <el-aside width="200px" class="aside">
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-header class="header"> </el-header>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "../../common/SideBar";
export default {
  name: "Home",
  components: { SideBar },
};
</script>

<style lang="scss" scoped>
.full_windows {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  .header {
    background-color: red;
    padding: 0;
  }
  .main {
    background-color: seagreen;
  }
  .aside {
    background-color: #eee;
  }
}
</style>