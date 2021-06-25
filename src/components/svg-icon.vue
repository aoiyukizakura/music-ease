<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup lang="ts">
  import { defineProps, computed } from '@vue/runtime-core';
  const props =
    defineProps<{
      name: string;
      color?: string;
    }>();
  const iconName = computed(() => `#icon-${props.name}`);
  const svgClass = computed(() => {
    if (props.name) {
      return `svg-icon icon-${props.name}`;
    }
    return 'svg-icon';
  });
</script>
<style lang="postcss">
  .svg-icon,
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    fill: currentColor;
    vertical-align: center;
  }
  svg {
    fill: currentColor;
  }
</style>
