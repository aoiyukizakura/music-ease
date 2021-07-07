<template>
  <main
    class="dark:bg-gray-900 dark:text-white flex flex-col relative h-full transition-all"
    :class="player.visible ? 'pb-32' : 'pb-16'"
  >
    <div class="h-full overflow-hidden relative">
      <router-view v-slot="{ Component, route }">
        <template v-if="Component">
          <!-- <keep-alive> -->
          <suspense :timeout="0">
            <template #default>
              <component :is="Component" :key="route.fullPath" />
            </template>
            <template #fallback>
              <div class="w-full text-center">{{ route.name }} Loading...</div>
            </template>
          </suspense>
          <!-- </keep-alive> -->
        </template>
      </router-view>
    </div>
    <div class="w-full absolute bottom-0 left-0">
      <player v-show="player.visible"></player>
      <navigation-bar></navigation-bar>
    </div>
  </main>
</template>

<script lang="ts" setup>
  import { computed } from '@vue/runtime-core';
  import { useStore } from './store';
  import NavigationBar from '/@cp/navigation-bar.vue';
  import Player from '/@cp/player.vue';
  const player = computed(() => useStore().state.player);
</script>

<style lang="postcss">
  body,
  html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  * {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
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
