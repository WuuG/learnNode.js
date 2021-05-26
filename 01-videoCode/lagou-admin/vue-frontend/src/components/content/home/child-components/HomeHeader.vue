<template>
  <slot-header type="primary">
    <template v-slot:leftContent>
      <div class="left-content">
        <el-button
          type="text"
          icon="el-icon-s-operation"
          class="left-button button"
        ></el-button>
      </div>
    </template>
    <template v-slot:rightContent>
      <div class="right-content">
        <div class="info-button-group">
          <el-button
            type="text"
            icon="el-icon-message"
            class="button"
          ></el-button>
          <el-button type="text" icon="el-icon-bell" class="button"></el-button>
          <el-button
            type="text"
            icon="el-icon-s-flag"
            class="button"
          ></el-button>
        </div>
        <div class="user-info">
          <el-avatar size="small" class="avatar">user</el-avatar>
          <span>wuug jeey</span>
        </div>
        <el-button
          type="text"
          icon="el-icon-s-tools"
          class="button right-last-button"
        ></el-button>
      </div>
    </template>
  </slot-header>
</template>

<script>
import SlotHeader from "../../../common/Header";
export default {
  name: "HomeHeader",
  components: {
    SlotHeader,
  },
};
</script>

<style lang="scss" scoped>
.button {
  border: 0;
  color: $-color-white;
  font-size: 20px;
  margin-top: 5px;
}
.left-content {
  height: $-height-bar;
  background-color: $-color-deep-primary;
  text-align: left;
  .left-button {
    margin: 5px 0 0 10px;
  }
}
.right-content {
  display: flex;
  float: right;
  .info-button-group {
    margin-right: 20px;
  }
  .user-info {
    display: flex;
    margin-right: 10px;
    height: $-height-bar;
    max-width: 200px;
    line-height: $-height-bar;
    color: $-color-white;
    .avatar {
      margin-top: 25px - 14px;
      margin-right: 10px;
    }
  }
  .right-last-button {
    margin-right: 10px;
  }
}
</style>