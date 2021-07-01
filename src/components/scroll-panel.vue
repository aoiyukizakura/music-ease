<template>
  <div :class="vertical ? 'overflow-y-auto h-full' : 'overflow-x-auto pb-3'">
    <div class="flex min-w-min" :class="vertical ? 'flex-col space-y-2' : 'flex-row space-x-2'">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { defineProps } from '@vue/runtime-core';
  const props = defineProps<{
    vertical?: boolean;
  }>();
  const { vertical } = props;
</script>
<style lang="postcss"></style>
