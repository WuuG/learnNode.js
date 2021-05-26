<template>
  <el-container class="full_windows">
    <!-- <el-aside class="aside"> -->
    <side-bar></side-bar>
    <el-container>
      <el-header class="header" height="50px">
        <home-header></home-header>
      </el-header>
      <el-main class="main" :style="{ left: mainPosLeft }">Main</el-main>
    </el-container>
  </el-container>
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
  computed: {
    mainPosLeft() {
      return this.$store.state.sidebarState ? "63px" : "230px";
    },
  },
};
</script>

<style lang="scss" scoped>
.full_windows {
  width: 100%;
  height: 100%;
  .header {
    padding: 0;
    height: $-height-bar;
  }
  .main {
    transition: all 0.2s;
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 230px;
  }
  .aside {
    transition: all 0.2s;
    background-color: #eee;
  }
}
</style>