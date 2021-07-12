<template>
  <div v-if="pageStatus" class="playlist-wrapper w-full h-full pt-4 px-2">
    <header
      class="head-menu flex text-base h-14 absolute left-0 right-0 top-0 z-20 pt-4 px-2"
      :class="fixed ? 'bg-gray-900' : ''"
    >
      <svg-icon name="back" @click="$router.go(-1)"></svg-icon>
      <h2 class="flex-1 text-center mx-5 truncate" :style="`opacity: ${1 - rate}`">{{ playlist.name }}</h2>
      <svg-icon name="like"></svg-icon>
    </header>
    <div class="scroll-wrapper h-full overflow-y-auto" ref="scrollBox">
      <div class="playlist-info">
        <div
          class="mask transform absolute z-10 top-0 left-0 right-0 bottom-0 opacity-0 bg-gray-900"
          :style="rate > 0 ? `opacity: ${(1 - rate) * 1.4}` : `opacity: 1`"
        ></div>
        <figure
          :style="rate > 0 ? `transform: scale(${0.4 * rate + 0.6}` : 'transform: scale(0)'"
          class="flex flex-col items-center overflow-hidden w-full transform"
        >
          <img v-img="playlist.coverImgUrl" alt="封面" class="h-48 w-48 object-cover align-bottom" />
          <figcaption class="text-center w-full">
            <h1 class="text-2xl mt-2 truncate">{{ playlist.name }}</h1>
            <p class="text-sm font-light mt-1 overflow-elision-2">{{ playlist.description }}</p>
          </figcaption>
        </figure>
      </div>
      <div class="w-full relative z-10" id="playlist">
        <div
          class="btn-divider text-center h-6 z-30 left-0 right-0"
          :class="fixed ? 'fixed top-14 w-full bg-gray-900' : 'relative '"
        >
          <button class="btn absolute m-auto left-0 right-0 -bottom-6 z-20 shadow-sm" type="button" @click="playAll">
            播放
          </button>
        </div>
        <div v-show="fixed" class="h-6"></div>
        <div class="pt-10 relative bg-gray-900">
          <ul class="space-y-2 pb-2" v-if="playlist.id">
            <playlist-item
              v-for="(item, index) in tracks"
              :track="item"
              :is-playing="isPlayingThisList && item.id === player?.currentTrack?.id"
              @on-play="onPlay(index)"
            />
          </ul>
        </div>
        <div class="my-5 w-full text-center font-normal text-sm text-gray-400" v-show="loading">
          <span>loading...</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full text-lg h-full flex items-center justify-center">加载失败~</div>
</template>
<script setup lang="ts">
  import { ref } from '@vue/reactivity';
  import PlaylistItem from '/@cp/playlist-item.vue';
  import { computed, onBeforeUnmount, onDeactivated, onMounted } from '@vue/runtime-core';
  import { getPlaylistDetail } from '/@/api/playlist';
  import { useRoute } from 'vue-router';
  import { useStore } from '/@/store';
  import { getTrackDetail } from '/@/api/track';
  import type { Playlist, Track, TrackId } from '/@/index.d';

  onMounted(() => {
    if (scrollBox.value !== null) scrollBox.value.addEventListener('scroll', onScroll);
  });
  onBeforeUnmount(() => {
    if (scrollBox.value !== null) scrollBox.value.removeEventListener('scroll', onScroll);
  });
  onDeactivated(() => {
    rate.value = 1;
    fixed.value = false;
  });

  const PAGE_SIZE = 20;
  const store = useStore();

  const player = computed(() => store.state.player);
  const isPlayingThisList = computed(() => playlist.value.id === player.value.listId);
  const playlistId = computed(() => Number(useRoute().params.id));

  const fixed = ref(false);
  const rate = ref(1);
  const offset = ref(0);
  const loading = ref(false);
  const pageStatus = ref(true);

  const scrollBox = ref<HTMLElement | null>(null);

  const tracks = ref<Track[]>([]);
  const playlistIds = ref<TrackId[]>([]);
  const playlist = ref<Playlist>({} as Playlist);

  try {
    const { data } = await getPlaylistDetail(playlistId.value);
    playlist.value = data.playlist;
    playlistIds.value = Array.prototype.concat([], playlist.value.trackIds);
    tracks.value = tracks.value.concat(playlist.value.tracks);
    offset.value = tracks.value.length;
  } catch (error) {
    pageStatus.value = false;
  }

  async function getMore(): Promise<void> {
    loading.value = true;
    const req_ids: string = playlistIds.value
      .slice(offset.value, offset.value + PAGE_SIZE)
      .map((t: any) => t.id)
      .join(',');
    try {
      const {
        data: { songs },
      } = await getTrackDetail(req_ids);
      if (songs) {
        tracks.value = tracks.value.concat(songs);
        offset.value += PAGE_SIZE; // 加载成功之后，再准备加载下一页
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  function playAll(): void {
    loadThisPlaylist();
    player.value.current = 0;
    player.value._playTrack();
  }
  function onPlay(index: any): void {
    loadThisPlaylist();
    player.value._playTrack(index);
  }
  // 把该歌单的内容加载到播放器中
  function loadThisPlaylist() {
    const listId = player.value.listId;
    if (listId === playlist.value.id) {
      return;
    } else {
      player.value.list = playlistIds.value;
      player.value.listId = playlist.value.id;
    }
  }
  function onScroll(): void {
    if (scrollBox.value === null) return;
    const offsetTop = 360 - Number(scrollBox.value.scrollTop);
    rate.value = offsetTop / 360;
    fixed.value = offsetTop <= 70; //提前执行fixed，看起来更丝滑

    // 触底加载
    const offsetBottom = scrollBox.value.scrollHeight - scrollBox.value.scrollTop - scrollBox.value.clientHeight;
    if (offsetBottom < 60 && !loading.value && offset.value < playlistIds.value.length) {
      getMore();
    }
  }
</script>
<style lang="postcss">
  .btn {
    @apply active:bg-gray-200 py-3 px-8 bg-white text-black rounded-full text-base font-semibold;
  }
  .playlist-info {
    @apply flex flex-col items-center pt-16 fixed top-0 left-0 right-0 z-0 px-2 transform origin-bottom bg-gradient-to-b from-red-500 to-gray-900;
  }
  .scroll-wrapper {
    padding-top: 21rem;
  }
</style>
