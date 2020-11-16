<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home-project1</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: red;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: red;
    &.router-link-exact-active {
      color: red;
    }
  }
}
</style>
