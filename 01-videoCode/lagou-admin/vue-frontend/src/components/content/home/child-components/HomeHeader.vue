<template>
  <slot-header type="primary">
    <template v-slot:leftContent>
      <div class="left-content">
        <h1 class="web_title" :style="{ width: webTitleWidth }">
          拉勾网<span>职位信息管理</span>
        </h1>
        <el-button
          type="text"
          icon="el-icon-s-operation"
          class="left-button button"
          @click="collapeSidebar"
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
        <home-header-info />
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
import HomeHeaderInfo from "./HomeHeaderInfo";
export default {
  name: "HomeHeader",
  data() {
    return {
      webTitleWidth: "231px",
    };
  },
  components: {
    SlotHeader,
    HomeHeaderInfo,
  },
  methods: {
    collapeSidebar() {
      this.webTitleWidth = this.$store.state.sidebarState ? "231px" : "64px";
      this.$store.commit("collapseSidebar");
    },
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
  background-color: $-color-primary;
  text-align: left;
  display: flex;
  justify-items: left;
  .web_title {
    overflow: hidden;
    padding: 0;
    margin: 0;
    height: $-height-bar;
    line-height: $-height-bar;
    background-color: $-color-deep-primary;
    font-size: 18px;
    color: $-color-white;
    transition: all 0.2s ease;
    text-align: center;
    span {
      font-weight: 400;
    }
  }
  .left-button {
    margin: 5px 0 0 10px;
  }
}
.right-content {
  display: flex;
  float: right;
  .info-button-group {
    margin-right: 10px;
  }
  .right-last-button {
    margin: 0 10px;
  }
}
</style>