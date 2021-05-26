<template>
  <div>
    <el-row type="flex" justify="space-between" :style="{ height: height }">
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
    height: {
      type: String,
      default: "60px",
    },
    span: {
      type: Object,
      default: function () {
        return {
          left: 2,
          middle: 10,
          right: 12,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>