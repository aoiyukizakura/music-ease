<template>
  <div class="player dark:bg-gray-800 box-border text-white flex h-16 items-center relative">
    <process-bar
      class="slider absolute left-0 z-20 w-full"
      :disabled="!player.currentTrack"
      :value="player.progress"
      @drag-start="player._pause()"
      @drag-end="change($event)"
    ></process-bar>
    <router-link v-if="player.currentTrack" :to="`/playlist/${player.listId}`">
      <img :src="player.currentTrack.al?.picUrl + '?param=64y64'" alt="封面" class="h-16 w-16 object-cover" />
    </router-link>
    <img v-else src="/default-music.jpg" alt="封面" class="h-16 w-16 object-cover" />
    <div class="flex-1 overflow-hidden mx-2">
      <div
        v-if="player.currentTrack"
        class="player-scroll-content w-full flex items-center transform"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @click="lyricVisible = true"
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
              <template v-for="(ar, index) in player.currentTrack.ar" :key="index">
                <template v-if="index >= 1">&nbsp;& </template>
                {{ ar.name }}
              </template>
            </span>
          </div>
        </div>
      </div>
      <span v-else class="text-gray-500 font-medium text-sm">播放列表为空...</span>
    </div>
    <div class="controls flex">
      <svg-icon v-if="likelist.includes(player.currentTrack?.id || -1)" name="liked" class="mr-2"></svg-icon>
      <svg-icon v-else name="like" class="mr-2"></svg-icon>
      <svg-icon name="pause" v-show="player.playing" class="mr-2" @click="player._pause()"></svg-icon>
      <svg-icon name="play" v-show="!player.playing" class="mr-2" @click="player._play()"></svg-icon>
    </div>
    <teleport to="body">
      <transition name="slide-down" mode="out-in">
        <div v-show="lyricVisible" id="lyric" class="h-full w-full absolute bg-gray-600 z-50 p-5 flex flex-col">
          <header class="flex space-x-3 text-white">
            <img
              :src="player.currentTrack ? player.currentTrack.al?.picUrl + '?param=64y64' : '/default-music.jpg'"
              alt="封面"
              class="h-16 w-16 object-cover shadow-lg"
            />
            <div class="flex-1 flex flex-col justify-center overflow-hidden">
              <span class="block truncate text-lg font-semibold">
                {{ player.currentTrack?.name }}
              </span>
              <span class="block truncate text-sm">
                <template v-for="(ar, index) in player.currentTrack?.ar" :key="index">
                  <template v-if="index >= 1">&nbsp;& </template>
                  {{ ar.name }}
                </template>
              </span>
            </div>
            <span>
              <span @click="lyricVisible = false">[x]</span>
            </span>
          </header>
          <div class="lyric-content flex-1 overflow-hidden mt-2">
            <ul class="font-bold h-full w-full overflow-y-scroll py-3 text-xl space-y-2">
              <li
                v-for="(l, index) in lyrics"
                :key="index"
                :class="{
                  'selected-lyric text-white': l.time < (Number(player.currentTrack?.dt) * player.progress) / 1000,
                }"
              >
                {{ l.content }} <br />
                {{ tdLyrics[index]?.content }}
              </li>
            </ul>
          </div>
          <footer class="h-16 w-full flex justify-center items-center">
            <svg-icon
              name="pause"
              v-show="player.playing"
              class="mr-2 text-white h-8 w-8"
              @click="player._pause()"
            ></svg-icon>
            <svg-icon
              name="play"
              v-show="!player.playing"
              class="mr-2 text-white h-8 w-8"
              @click="player._play()"
            ></svg-icon>
          </footer>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from '@vue/runtime-core';
  import { getLyric } from '../api/track';
  import { useStore } from '/@/store';
  import ProcessBar from '/@cp/progress-bar.vue';

  onMounted(() => {});

  onUnmounted(() => {
    if (lyricIntervalTimer.value !== null) {
      clearInterval(lyricIntervalTimer.value);
    }
  });

  const store = useStore();

  const startX = ref(0);
  const distanceX = ref(0);
  const scrollContent = ref<HTMLElement | null>(null);
  const lyrics = ref<{ time: number; rawTime: string; content: string }[]>([]);
  const tLyrics = ref<{ time: number; rawTime: string; content: string }[]>([]);
  const lyricVisible = ref(false);
  const lyricIndex = ref(-1);
  const lyricIntervalTimer = ref<NodeJS.Timeout | null>(null);

  const player = computed(() => store.state.player);
  const likelist = computed(() => store.state.favPlaylist);
  const tdLyrics = computed(() => {
    if (
      tLyrics.value.length &&
      lyrics.value.length > tLyrics.value.length &&
      lyrics.value[0].rawTime !== tLyrics.value[0].rawTime
    ) {
      return Array.from<{ time: number; rawTime: string; content: string }>({
        length: lyrics.value.length - tLyrics.value.length,
      }).concat(tLyrics.value);
    } else {
      return tLyrics.value;
    }
  });

  watchEffect(async () => {
    if (player.value.currentTrack?.id) {
      try {
        const { data } = await getLyric(player.value.currentTrack!.id);
        lyrics.value = parseLyric(data.lrc.lyric);
        tLyrics.value = parseLyric(data.tlyric.lyric);
      } catch (error) {
        /* do something */
      }
    }
  });

  watch(lyricVisible, () => {
    if (!lyricVisible.value && lyricIntervalTimer.value !== null) {
      clearInterval(lyricIntervalTimer.value);
    }
    if (lyricVisible.value) {
      lyricInterval();
    }
  });

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
  function parseLyric(lrc: string) {
    const lyrics = lrc.split('\n');
    const lrcs = [];
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i];
      const timeReg = /\[(\d+):(\d+)\.(\d+)\]/;
      const timesReg = /\[(\d+):(\d+)\.(\d+)\]/g;
      const timeRegExpArr = lyric.match(timesReg);
      if (!timeRegExpArr) continue;
      const content = lyric.replace(timesReg, '');
      for (let i = 0; i < timeRegExpArr.length; i++) {
        const t = timeRegExpArr[i].match(timeReg);
        if (!t) continue;
        const min = Number(t[1]);
        const sec = Number(t[2]);
        const ms = Number(t[3]) / 1000;
        const time = min * 60 + sec + ms;
        lrcs.push({ time, rawTime: t[0], content });
      }
    }
    return lrcs.sort(({ time: t1 }, { time: t2 }) => t1 - t2);
  }
  function lyricInterval() {
    lyricIntervalTimer.value = setInterval(() => {
      const lyrics = document.getElementsByClassName('selected-lyric');
      const currentIndex = lyrics.length - 1;
      if (currentIndex === lyricIndex.value) return;
      lyricIndex.value = currentIndex;
      lyrics[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
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
  .lyric-content {
    position: relative;
    &::before {
      content: '';
      @apply absolute w-full h-4 top-0 bg-gradient-to-b from-gray-600 to-transparent;
    }
    &::after {
      content: '';
      @apply absolute w-full h-4 bottom-0 bg-gradient-to-t from-gray-600 to-transparent;
    }
  }
</style>
