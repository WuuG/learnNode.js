<template>
  <div class="background">
    <el-row class="header"></el-row>
    <el-row class="content">
      <el-col :xs="12" :sm="10" :md="9" :lg="8" :xl="7" class="content-box">
        <router-view></router-view>
      </el-col>
    </el-row>
    <el-row class="footer"></el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 5;
    height: auto;
    min-height: 500px;
    .content-box {
      float: none;
      margin: 0 auto;
      background-color: #eee;
    }
  }
  &:before {
    content: "";
    flex: 2;
  }
  &:after {
    content: "";
    flex: 2;
  }
}
</style>