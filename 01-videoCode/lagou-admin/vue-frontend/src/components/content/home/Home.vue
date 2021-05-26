<template>
  <div>
    <el-container class="full_windows">
      <el-aside width="200px" class="aside">
        <side-bar></side-bar>
      </el-aside>
      <el-container>
        <el-header class="header" height="50px">
          <home-header></home-header>
        </el-header>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "./child-components/HomeSideBar";
import HomeHeader from "./child-components/HomeHeader";
export default {
  name: "Home",
  components: {
    SideBar,
    HomeHeader,
  },
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
    height: $-height-bar;
  }
  .main {
    background-color: seagreen;
  }
  .aside {
    background-color: #eee;
  }
}
</style>