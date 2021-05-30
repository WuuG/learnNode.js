<template>
  <div class="background">
    <el-row class="content">
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="7" class="content-box">
        <router-view></router-view>
      </el-col>
    </el-row>
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
    .content-box {
      float: none;
      margin: 0 auto;
      min-height: 300px;
      border: 1px solid rgb(218, 220, 224);
      border-radius: 8px;
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