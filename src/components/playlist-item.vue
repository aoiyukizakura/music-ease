<template>
  <li class="playlist-item__wrapper flex flex-row mx-2 space-x-3 items-center overflow-hidden">
    <img v-img="track.al.picUrl + '?param=56y56'" class="w-14 h-14 flex-none object-cover" alt="歌曲封面" />
    <div class="flex-1 overflow-hidden" @click="playable && $emit('on-play')">
      <p class="text-base font-medium truncate w-full" :class="{ 'text-gray-500': !playable }">
        {{ track.name }}
      </p>
      <span class="text-gray-400 text-sm truncate block font-medium" :class="{ 'text-gray-600': !playable }">
        <template v-for="(ar, index) in track.ar" :key="index">
          <template v-if="index >= 1">&nbsp;& </template>
          {{ ar.name }}
        </template>
      </span>
    </div>
    <svg-icon v-show="isPlaying" name="sounds" />
    <svg-icon name="more">菜单</svg-icon>
  </li>
</template>
<script setup lang="ts">
  import { defineEmits, defineProps, onMounted, onUnmounted, ref } from '@vue/runtime-core';
  import type { Track } from '/@/index.d';

  defineEmits(['on-play']);
  const props = defineProps<{
    track: Track;
    isPlaying?: boolean;
  }>();

  const playable = props.track.fee === 0 || (props.track.fee && props.track.fee !== 1 && props.track.fee !== 4);
</script>
<style lang="postcss">
  .decoration-corss {
    text-decoration: line-through;
  }
</style>
