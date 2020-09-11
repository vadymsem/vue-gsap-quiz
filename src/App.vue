<template>
  <div id="app">
    <router-view
      :key="$route.path"
    />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "assets/styles/common.scss";

html, body, * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  background: rgb(38,2,38);
  background: radial-gradient(circle, rgba(38,2,38,1) 0%, rgba(21,32,55,1) 49%, rgba(36,4,45,1) 100%);
  color: #fafafa;
}
</style>
