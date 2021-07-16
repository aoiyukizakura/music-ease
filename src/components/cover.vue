<template>
  <router-link :to="`/playlist/${id}`" class="min-w-max inline-block overflow-hidden">
    <img class="h-36 w-36 object-cover" v-img="picUrl + '?param=144y144'" alt="封面" />
    <p class="dark:text-gray-400 w-36 overflow-elision-2 text-sm mt-1">{{ name }}</p>
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
