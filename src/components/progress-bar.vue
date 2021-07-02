<template>
  <div id="progress-bar-line" class="bg-gray-700 h-0.5 flex">
    <input
      class="w-full absolute z-10"
      type="range"
      v-model="value"
      min="0"
      max="1"
      :step="0.00001"
      @input="$emit('drag-start')"
      @change="$emit('drag-end', $event)"
    />
    <svg id="line-progress" class="w-full h-0.5 absolute z-0">
      <line x1="0" y1="50%" :x2="`${value * 100}%`" y2="50%" stroke="#2dbd2d" stroke-width="2" />
    </svg>
  </div>
</template>
<script setup lang="ts">
  import { defineEmit, defineProps } from '@vue/runtime-core';
  defineProps<{ value: number }>();
  defineEmit(['drag-start', 'drag-end']);
</script>
<style lang="postcss">
  #progress-bar-line input[type='range'] {
    -webkit-appearance: none; /*清除系统默认样式*/
    height: 2px; /*横条的高度*/
    cursor: pointer;
    background-color: transparent;
  }
  /*拖动块的样式*/
  #progress-bar-line input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none; /*清除系统默认样式*/
    height: 6px; /*拖动块高度*/
    width: 6px; /*拖动块宽度*/
    border-radius: 50%;
    background-color: beige;
  }
</style>
