<template>
  <router-link :to="`/playlist/${id}`" class="w-36 block">
    <img
      class="h-36 w-full object-cover duration-100 origin-top-left transform focus:scale-125 focus:translate-y-4"
      :src="picUrl"
      alt="封面"
    />
    <p class="dark:text-gray-400 overflow-elision-2 text-sm mt-1">{{ name }}</p>
  </router-link>
</template>
<script setup lang="ts">
  import { defineProps } from '@vue/runtime-core';
  const props = defineProps<{
    name: string;
    picUrl: string;
    id: number;
  }>();
  const { name, picUrl, id } = props;
</script>
<style lang="postcss"></style>
