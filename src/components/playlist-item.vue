<template>
  <li class="flex flex-row mx-2 space-x-3 items-center overflow-hidden" @click="$emit('on-play')">
    <img :src="picUrl" class="w-14 h-14 flex-none object-cover" alt="歌曲封面" />
    <div class="flex-1 overflow-hidden">
      <p class="text-base font-medium truncate w-full">{{ name }}</p>
      <span class="text-gray-400 text-sm truncate block">
        <template v-for="(ar, index) in artist" :key="index">
          <template v-if="index >= 1">&nbsp;& </template>
          {{ ar.name }}
        </template>
      </span>
    </div>
    <svg-icon v-show="isPlaying" name="sounds"/>
    <svg-icon name="more">菜单</svg-icon>
  </li>
</template>
<script setup lang="ts">
  import { defineEmits, defineProps } from '@vue/runtime-core';
  defineProps<{
    picUrl: string;
    artist: any[];
    name: string;
    isPlaying: boolean;
  }>();
  defineEmits(['on-play']);
</script>
<style lang="postcss"></style>
