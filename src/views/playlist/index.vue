<template>
  <div class="absolute top-0 left-0 w-full pt-80 bg-gradient-to-b">
    <header
      class="head-menu flex text-base h-16 fixed left-0 right-0 top-0 z-20 pt-4 px-2"
      :class="fixed?'bg-gray-900':''"
    >
      <svg-icon name="back" @click="$router.go(-1)"></svg-icon>
      <h2 class="flex-1 text-center" :style="`opacity: ${1 - rate}`">今日推荐</h2>
      <svg-icon name="like"></svg-icon>
    </header>
    <div
      class="playlist-info flex flex-col items-center pt-16 fixed top-0 left-0 right-0 z-0 px-2 transform origin-bottom bg-gradient-to-b from-red-500 via-gray-800 to-gray-900"
    >
      <div
        class="mask transform absolute z-10 top-0 left-0 right-0 bottom-0 opacity-0 bg-gray-900"
        :style="rate > 0 ? `opacity: ${(1 - rate) * 1.4}` : `opacity: 1`"
      ></div>
      <figure :style="rate > 0 ? `transform: scale(${0.4 * rate + 0.6}` : 'transform: scale(0)'">
        <img
          src="https://p1.music.126.net/rTZFxGumNSsiL-XchfBSwQ==/109951165882947189.jpg"
          alt="封面"
          class="h-48 w-48 object-cover align-bottom"
        />
        <figcaption class="text-center">
          <h1 class="text-2xl mt-2">今日推荐</h1>
          <p class="text-sm font-light mt-1">为morphologica打造</p>
        </figcaption>
      </figure>
    </div>
    <div class="h-full w-full relative z-10" id="playlist" ref="scrollEl">
      <div
        class="btn-divider text-center h-6 z-30 left-0 right-0"
        :class="fixed ? 'fixed top-16 w-full bg-gray-900' : 'relative '"
      >
        <button class="btn absolute m-auto left-0 right-0 -bottom-6 z-20 shadow-sm" type="button">播放</button>
      </div>
      <div v-show="fixed" class="h-6"></div>
      <div class="pt-10 relative bg-gray-900">
        <ul class="space-y-2 pb-2">
          <playlist-item v-for="(item, index) in 20" :key="index"></playlist-item>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from '@vue/reactivity';
  import type { Ref } from '@vue/reactivity';
  import PlaylistItem from '/@cp/playlist-item.vue';
  import { onMounted, onUnmounted } from '@vue/runtime-core';

  const fixed = ref(false);
  const scrollEl: Ref<HTMLElement | null> = ref(null);
  const rate = ref(1);

  function onScroll() {
    const offsetTop = Number(scrollEl.value?.getBoundingClientRect()?.top);
    rate.value = offsetTop / 340;
    fixed.value = offsetTop <= 64;
  }
  onMounted(() => {
    document.getElementById('scroll-box')?.addEventListener('scroll', onScroll);
  });
  onUnmounted(() => {
    document.getElementById('scroll-box')?.removeEventListener('scroll', onScroll);
  });
</script>
<style lang="postcss">
  .btn {
    @apply active:bg-gray-200 py-3 px-8 bg-white text-black rounded-full text-base font-semibold;
  }
</style>
