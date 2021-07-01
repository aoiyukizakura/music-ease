<template>
  <div class="player box-border dark:bg-gray-800 text-white flex h-16 items-center relative">
    <process-bar
      class="slider absolute left-0 z-20 w-full"
      :value="player.progress"
      @drag-start="player._pause()"
      @drag-end="change($event)"
    ></process-bar>
    <img :src="player.currentTrack?.al?.picUrl" alt="封面" class="h-16 w-16 object-cover" />
    <div class="flex flex-col flex-1 overflow-hidden mx-2">
      <span class="block truncate text-lg font-medium text-white">{{ player.currentTrack?.al?.name }}</span>
      <span class="block truncate text-sm text-gray-300">
        <template v-for="(ar, index) in player.currentTrack?.ar" :key="index"> {{ ar.name }}&nbsp; </template>
      </span>
    </div>
    <div class="controls flex">
      <svg-icon name="like" class="mr-2"></svg-icon>
      <svg-icon name="pause" v-show="player.playing" class="mr-2" @click="player._pause()"></svg-icon>
      <svg-icon name="play" v-show="!player.playing" class="mr-2" @click="player._play()"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick } from '@vue/runtime-core';
  import { useStore } from '/@/store';
  import ProcessBar from '/@cp/progress-bar.vue';

  const player = computed(() => useStore().state.player);
  function change($e: any) {
    player.value._seek(Number($e.target.value));
    player.value._play();
  }
</script>

<style lang="postcss">
  .slider {
    top: -2px;
    margin: 0;
  }
</style>
