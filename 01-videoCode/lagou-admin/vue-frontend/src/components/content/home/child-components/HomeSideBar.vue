<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      @open="handleOpen"
      @close="handleClose"
      :collapse="sidebarState"
      @select="handleSelect"
      unique-opened
      router
    >
      <template v-for="item in menuItems">
        <el-submenu v-if="item.subs" :index="item.index" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="subitem in item.subs">
            <el-submenu
              v-if="subitem.subs"
              :key="subitem.id"
              :index="subitem.index"
            >
              <template v-slot:title>
                <i :class="subitem.icon"></i>
                <span>{{ subitem.title }}</span>
              </template>
              <template v-for="threeSubItem in subitem.subs">
                <el-menu-item
                  :key="threeSubItem.id"
                  :index="threeSubItem.index"
                >
                  <template v-slot:title>
                    <span>{{ threeSubItem.title }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :index="subitem.index" :key="subitem.id">
              <span slot="title">
                <i :class="subitem.icon"></i>
                {{ subitem.title }}
              </span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="item.index" :key="item.id">
          <i :class="item.icon"></i>
          <template v-slot:title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      menuItems: [
        {
          icon: "el-icon-user",
          index: "user",
          title: "用户管理",
        },
        {
          icon: "el-icon-s-help",
          index: "base",
          title: "基础组件",
          subs: [
            {
              icon: "el-icon-s-order",
              index: "table",
              title: "基础表格",
            },
          ],
        },
        {
          icon: "el-icon-warning",
          index: "test",
          title: "测试",
        },
        {
          icon: "el-icon-warning",
          title: "二级菜单",
          index: "1",
          subs: [
            {
              icon: "el-icon-warning",
              index: "home",
              title: "测试",
            },
            {
              icon: "el-icon-warning",
              index: "1-1",
              title: "加1",
              subs: [
                {
                  index: "test",
                  title: "测试",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {
    sidebarState() {
      return this.$store.state.sidebarState;
    },
  },
  methods: {
    handleOpen(index) {},
    handleClose(index) {},
    handleSelect(index) {},
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  top: 50px;
  bottom: 0;
  text-align: left;
  ul {
    height: 100%;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 230px;
    // &:hover {
    //   color: #fff;
    // }
  }
}
</style>