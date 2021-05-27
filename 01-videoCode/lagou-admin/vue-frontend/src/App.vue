<template>
  <div id="app">
    <v-home></v-home>
  </div>
</template>

<script>
import vHome from "./components/content/home/Home";
export default {
  components: { vHome },
};
</script>

<style lang="scss">
@import url(assets/css/normalize.css);
@import url(assets/css/common.scss);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
