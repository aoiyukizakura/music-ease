<template>
  <li class="flex flex-row px-2 space-x-3 items-center overflow-hidden" @click="$emit('on-play')">
    <img :src="props.track.picUrl" class="w-14 h-14 flex-none object-cover" alt="歌曲封面" />
    <div class="flex-1 overflow-hidden">
      <p class="text-base font-medium truncate w-full">{{ props.track.name }}</p>
      <span class="text-gray-400 text-sm truncate block">
        <template v-for="(ar, index) in props.artist" :key="index">
          <template v-if="index >= 1">&nbsp;& </template>
          {{ ar.name }}
        </template>
      </span>
    </div>
    <svg-icon name="more">菜单</svg-icon>
  </li>
</template>
<script setup lang="ts">
  import { defineEmit, defineProps } from '@vue/runtime-core';
  interface ar {
    alias: Array<any>;
    id: number;
    name: string;
    tns: Array<any>;
  }
  interface al {
    id: number;
    name: string;
    pic: number;
    picUrl: string;
    tns: Array<any>;
  }
  const props = defineProps<{
    track: al;
    artist: Array<ar>;
  }>();
  defineEmit(['on-play']);
</script>
<style lang="postcss"></style>
