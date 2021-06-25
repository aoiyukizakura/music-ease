<template>
  <main class="flex flex-col pb-32 relative h-full dark:bg-gray-900 dark:text-white">
    <div class="mt-4 mx-2 h-full overflow-y-auto relative" id="scroll-box" ref="scroll-box">
      <suspense>
        <template #default>
          <router-view></router-view>
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </suspense>
    </div>
    <div class="w-full absolute bottom-0 left-0">
      <player></player>
      <navigation-bar></navigation-bar>
    </div>
  </main>
</template>

<script lang="ts" setup>
  import NavigationBar from '/@cp/navigation-bar.vue';
  import Player from '/@cp/player.vue';
</script>

<style>
  body,
  html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  #app {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
  button,
  button:focus,
  button:active {
    outline: none !important;
    border: none !important;
  }
</style>
