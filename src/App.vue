<template>
  <main>
    <router-view></router-view>
  </main>
  <Mnav></Mnav>
</template>

<script lang="ts" setup>
  import Mnav from '/@cp/m-nav/index.vue';
</script>

<style>
  body,
  html {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
