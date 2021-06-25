<template>
  <div class="player box-border dark:bg-gray-800 text-white flex h-16 items-center relative">
    <slider v-model="pro" :height="2" class="slider absolute left-0 z-20"></slider>
    <img src="icon-144x144.png" alt="封面" class="h-16 w-16 object-cover" />
    <div class="flex flex-col flex-1 overflow-hidden mx-2">
      <span class="block truncate text-lg font-medium text-white">歌曲名</span>
      <span class="block truncate text-sm text-gray-300">歌手名</span>
    </div>
    <div class="controls flex">
      <svg-icon name="like" class="mr-2"></svg-icon>
      <svg-icon name="pause" class="mr-2"></svg-icon>
      <svg-icon name="play" class="mr-2"></svg-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from '@vue/reactivity';
  import Slider from 'vue3-slider';
  const pro = ref(34);
</script>
<style lang="postcss">
  /* .player {
  } */
  .slider {
    top: -2px;
    margin: 0;
  }
</style>
