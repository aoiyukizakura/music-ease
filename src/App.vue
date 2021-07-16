<template>
  <div class="dark:bg-gray-900 flex flex-col h-full">
    <main class="dark:bg-gray-900 dark:text-white transition-all duration-200 overflow-hidden flex-1">
      <router-view v-slot="{ Component, route }">
        <template v-if="Component">
          <transition mode="out-in" name="fade">
            <!-- <keep-alive max="10"> -->
              <suspense :timeout="0">
                <template #default>
                  <component :is="Component" :key="route.name + route.fullPath" />
                </template>
                <template #fallback>
                  <div class="loading w-full h-full flex flex-col justify-center items-center space-y-2">
                    <loading>
                      <p class="text-sm">加载中...</p>
                    </loading>
                  </div>
                </template>
              </suspense>
            <!-- </keep-alive> -->
          </transition>
        </template>
      </router-view>
    </main>
    <transition mode="out-in" name="slide-down">
      <player v-show="player.visible"></player>
    </transition>
    <navigation-bar class="z-50" v-show="!route.meta.hideNavBar"></navigation-bar>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from '@vue/runtime-core';
  import { useRoute } from 'vue-router';
  import { useStore } from './store';
  import NavigationBar from '/@cp/navigation-bar.vue';
  import Player from '/@cp/player.vue';
  import Loading from './components/loading.vue';

  const route = computed(() => useRoute());
  const player = computed(() => useStore().state.player);

  const pageStatus = ref(true);
</script>

<style lang="postcss">
  body,
  html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
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

  .fade-leave-to,
  .fade-enter-from {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }

  .slide-down-leave-to,
  .slide-down-enter-from {
    transform: translateY(112px);
  }
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: transform 0.2s;
  }
</style>
