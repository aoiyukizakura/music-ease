<template>
  <router-link :to="`/playlist/${playlistId}`" class="w-36 block">
    <img
      class="h-36 w-full object-cover duration-100 origin-top-left transform focus:scale-125 focus:translate-y-4"
      :src="picUrl"
      alt="封面"
    />
    <p class="overflow-elision-2 text-sm dark:text-gray-400 mt-1">{{ name }}</p>
  </router-link>
</template>
<script setup lang="ts">
  import { defineProps, toRefs } from '@vue/runtime-core';
  const props =
    defineProps<{
      name: string;
      picUrl: string;
      playlistId: number;
    }>();
  const { name, picUrl, playlistId } = toRefs(props);
</script>
<style lang="postcss">
  .overflow-elision-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
