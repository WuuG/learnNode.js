<template>
  <div>
    <el-row
      type="flex"
      justify="space-between"
      :class="type"
      :style="{ height: height + 'px' }"
    >
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
    height: {
      type: String,
      default: "50",
    },
  },
};
</script>

<style lang="scss" scoped>
.default {
  background-color: #fff;
}
.primary {
  background-color: $-color-deep-primary;
}
</style>