<template>
  <div>
    <h1 class="title">
      NodeLte
      <span class="title-text">登录</span>
    </h1>
    <signin-form></signin-form>
  </div>
</template>

<script>
import SigninForm from "./child-comps/SigninFrom";
export default {
  name: "Signin",
  components: {
    SigninForm,
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: block;
  width: 220px;
  margin: 20px auto;
  text-align: center;
  .title-text {
    font-weight: 400;
  }
}
</style>