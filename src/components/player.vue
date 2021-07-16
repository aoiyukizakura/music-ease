<template>
  <div class="player dark:bg-gray-800 box-border text-white flex h-16 items-center relative">
    <process-bar
      class="slider absolute left-0 z-20 w-full"
      :disabled="!player.currentTrack"
      :value="player.progress"
      @drag-start="player._pause()"
      @drag-end="change($event)"
    ></process-bar>
    <img
      v-if="player.currentTrack"
      :src="player.currentTrack?.al?.picUrl + '?param=64y64'"
      alt="封面"
      class="h-16 w-16 object-cover"
    />
    <img v-else src="../assets/default-music.jpg" alt="封面" class="h-16 w-16 object-cover" />
    <div class="flex-1 overflow-hidden mx-2">
      <div
        v-if="player.total"
        class="player-scroll-content w-full flex items-center transform"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        ref="scrollContent"
        :style="`transform: translateX(${distanceX}px);`"
      >
        <div class="controllers w-full">
          <div
            :style="`opacity: ${
              scrollContent?.clientWidth ? 1 - (Math.abs(distanceX) * 1.5) / scrollContent?.clientWidth : 1
            };`"
          >
            <span class="block truncate text-lg font-medium text-white">
              {{ player.currentTrack?.name }}
            </span>
            <span class="block truncate text-sm text-gray-300">
              <template v-for="(ar, index) in player.currentTrack?.ar" :key="index">
                <template v-if="Number(index) >= 1">&nbsp;& </template>
                {{ ar.name }}
              </template>
            </span>
          </div>
        </div>
      </div>
      <span v-else class="text-gray-500 font-medium text-sm">播放列表为空...</span>
    </div>
    <div class="controls flex">
      <svg-icon name="like" class="mr-2"></svg-icon>
      <svg-icon name="pause" v-show="player.playing" class="mr-2" @click="player._pause()"></svg-icon>
      <svg-icon name="play" v-show="!player.playing" class="mr-2" @click="player._play()"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from '@vue/runtime-core';
  import { useStore } from '/@/store';
  import ProcessBar from '/@cp/progress-bar.vue';

  const startX = ref(0);
  const distanceX = ref(0);
  const scrollContent = ref<HTMLElement | null>(null);

  const player = computed(() => useStore().state.player);
  function change($e: any) {
    player.value._seek(Number($e.target.value));
    player.value._play();
  }

  function onTouchStart(e: TouchEvent) {
    startX.value = e.touches[0].pageX;
    scrollContent.value?.classList.remove('transition-transform');
  }
  function onTouchMove(e: TouchEvent) {
    distanceX.value = e.touches[0].pageX - startX.value;
  }
  function onTouchEnd(e: TouchEvent) {
    if (distanceX.value > 120) player.value._playPrev();
    if (distanceX.value < -120) player.value._playNext();
    scrollContent.value?.classList.add('transition-transform');
    startX.value = 0;
    distanceX.value = 0;
  }
</script>

<style lang="postcss">
  .slider {
    top: -2px;
    margin: 0;
  }
  .controllers {
    position: relative;
    &::before {
      content: '上一首';
      @apply absolute -left-32 top-0 bottom-0 text-sm text-white flex items-center;
    }
    &::after {
      content: '下一首';
      @apply absolute -right-32 top-0 bottom-0 text-sm text-white flex items-center;
    }
  }
</style>
