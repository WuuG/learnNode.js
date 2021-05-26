<template>
  <div>
    <el-row type="flex" justify="space-between" :class="type">
      <el-col :span="span.left" class="left-header">
        <slot name="leftContent"> </slot>
      </el-col>
      <el-col :span="span.middle">
        <slot name="middleContent"></slot>
      </el-col>
      <el-col :span="span.right">
        <slot name="rightContent"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    span: {
      type: Object,
      default: function () {
        return {
          left: 10,
          middle: 2,
          right: 12,
        };
      },
    },
    type: {
      type: String,
      default: "default",
    },
  },
};
</script>

<style lang="scss" scoped>
.default {
  background-color: #fff;
  height: $-height-bar;
}
.primary {
  background-color: $-color-deep-primary;
  height: $-height-bar;
}
</style>