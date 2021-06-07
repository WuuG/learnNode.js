<template>
  <div>
    <!-- <slot name="button">
      <el-button></el-button>
    </slot> -->
    <el-dialog
      :title="title"
      :width="width + 'px'"
      :visible.sync="dialogVisible"
      @change="$emit('changeVisible', $event.target.dialogVisible)"
    >
    </el-dialog>
  </div>
</template>

<script>
export default {
  model: {
    prop: "dialogVisible",
    event: "changeVisible",
  },
  props: {
    title: {
      type: String,
      default: "默认dia-log",
    },
    width: {
      type: Number,
      default: 30,
    },
    dialogVisible: Boolean,
  },
};
</script>

<style lang="scss" scoped>
</style>