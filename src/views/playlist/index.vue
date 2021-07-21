<template>
  <div
    v-if="pageStatus"
    class="playlist-wrapper w-full h-full overflow-y-scroll overflow-x-hidden relative"
    ref="scrollBox"
  >
    <header
      class="head-menu flex text-base h-14 sticky left-0 top-0 z-20 px-2 pt-4 m-0"
      :class="stickied ? 'bg-gray-900' : ''"
    >
      <svg-icon name="back" @click="$router.go(-1)"></svg-icon>
      <h2 class="flex-1 text-center mx-5 truncate opacity-0" :class="{ 'opacity-100': stickied }">
        {{ playlist.name }}
      </h2>
      <svg-icon name="more"></svg-icon>
    </header>
    <figure class="sticky flex flex-col items-center overflow-hidden w-full transform top-16 mt-2" id="playlist-info">
      <img v-img="playlist.coverImgUrl + '?param=200y200'" alt="封面" class="h-48 w-48 object-cover align-bottom" />
      <figcaption class="text-center w-full">
        <h1 class="text-2xl mt-2 truncate">{{ playlist.name }}</h1>
        <p class="text-sm font-light mt-1 overflow-elision-2">{{ playlist.description }}</p>
      </figcaption>
    </figure>
    <div class="w-full z-10 pt-4" id="playlist-content">
      <div class="btn-divider text-center h-6 sticky z-30 left-0 top-14" :class="{ 'bg-gray-900': stickied }">
        <button class="btn absolute m-auto left-0 right-0 -bottom-6 z-20 shadow-sm" type="button" @click="playAll">
          播放
        </button>
      </div>
      <div class="pt-10 relative bg-gray-900">
        <span class="absolute -top-20 z-0" :ref="setSentinel" data-flag="PRE"></span>
        <ul class="space-y-2 pb-2">
          <playlist-item
            v-for="(item, index) in tracks"
            :track="item"
            :is-playing="isPlayingThisList && item.id === player?.currentTrack?.id"
            @on-play="onPlay(index)"
            @on-menu="onMenu(item.id)"
          />
        </ul>
      </div>
      <div class="my-5 w-full text-center font-normal text-sm text-gray-400" v-show="more">
        <span :ref="setSentinel" data-flag="SUF">loading...</span>
      </div>
    </div>
  </div>
  <div v-else class="w-full text-lg h-full flex items-center justify-center">加载失败~</div>
</template>
<script setup lang="ts">
  import { ref } from '@vue/reactivity';
  import PlaylistItem from '/@cp/playlist-item.vue';
  import {
    computed,
    onActivated,
    onBeforeUnmount,
    onDeactivated,
    onErrorCaptured,
    onMounted,
    onUnmounted,
  } from '@vue/runtime-core';
  import { dailyRecommendTracks, getPlaylistDetail } from '/@/api/playlist';
  import { useRoute } from 'vue-router';
  import { useStore } from '/@/store';
  import { getTrackDetail } from '/@/api/track';
  import type { Playlist, Track, TrackId } from '/@/index.d';

  const store = useStore();
  const route = useRoute();

  onMounted(() => {
    observeSentinel();
  });
  onUnmounted(() => {
    unObserveSentinel();
  });
  onActivated(() => {
    observeSentinel();
  });
  onDeactivated(() => {
    unObserveSentinel();
    stickied.value = false;
  });
  onErrorCaptured(() => {
    pageStatus.value = false;
  });

  const PAGE_SIZE = 20;
  const scrollBox = ref<HTMLElement | null>(null);
  const sentinel = ref<HTMLElement[]>([]);
  const observer = new IntersectionObserver(
    es => {
      es.forEach(e => {
        const flag = e.target.getAttribute('data-flag');
        switch (flag) {
          case 'SUF':
            if (e.intersectionRatio) {
              if (bufferList.value.length) {
                // 缓冲区中的数据还未读取完成
                tracks.value = tracks.value.concat(bufferList.value.splice(0, 20));
              } else {
                getMore();
              }
            }
            break;
          case 'PRE':
            stickied.value = !e.intersectionRatio;
            break;
          default:
            break;
        }
      });
    },
    {
      root: scrollBox.value,
    }
  );

  const stickied = ref(false);
  const offset = ref(0);
  const pageStatus = ref(true);
  const tracks = ref<Track[]>([]);
  const playlistIds = ref<TrackId[]>([]);
  const playlist = ref<Playlist>({} as Playlist);
  const bufferList = ref<Track[]>([]);

  const player = computed(() => store.state.player);
  const isPlayingThisList = computed(() => playlist.value.id === player.value.listId);
  const playlistId = computed(() => Number(route.params.id));
  const more = computed(() => bufferList.value.length || offset.value < playlistIds.value.length);

  try {
    if (playlistId.value) {
      const { data } = await getPlaylistDetail(playlistId.value);
      playlist.value = data.playlist;
      playlistIds.value = playlist.value.trackIds;
      bufferList.value = tracks.value.concat(playlist.value.tracks);
      offset.value = bufferList.value.length;
      if (bufferList.value.length > 10) {
        tracks.value = bufferList.value.splice(0, 10);
      } else {
        tracks.value = bufferList.value;
      }
    } else {
      const { data } = await dailyRecommendTracks();
      tracks.value = data.data.dailySongs;
      playlist.value = {
        id: 0,
        name: '每日推荐',
        description: `${store.state.userInfo.nickname}的每日专属推荐歌曲`,
        coverImgUrl: tracks.value[0].al.picUrl,
      } as Playlist;
    }
  } catch (error) {
    pageStatus.value = false;
  }

  async function getMore(): Promise<void> {
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
    }
  }

  function playAll(): void {
    loadThisPlaylist();
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
      // 把已经获取到详情的歌曲数据，放入到播放器中。
      player.value.trackList = tracks.value.concat(bufferList.value);
      player.value.list = playlistIds.value;
      player.value.listId = playlist.value.id;
    }
  }

  function setSentinel(el: any) {
    sentinel.value.push(el);
  }
  function observeSentinel(): void {
    if (sentinel.value.length) {
      sentinel.value.forEach(e => {
        observer.observe(e);
      });
    }
  }
  function unObserveSentinel(): void {
    if (sentinel.value.length) {
      sentinel.value.forEach(e => {
        observer.unobserve(e);
      });
      observer.disconnect();
    }
  }
  function onMenu(id: number): void {}
</script>
<style lang="postcss">
  .btn {
    @apply active:bg-gray-200 py-3 px-8 bg-white text-black rounded-full text-base font-semibold;
  }
  .playlist-info {
    @apply flex flex-col items-center pt-16 sticky top-0 left-0 right-0 z-0 px-2 transform origin-bottom;
  }
  .playlist-wrapper {
    @apply bg-gradient-to-b from-red-500 via-gray-900 to-gray-900;
  }
  .btn-divider {
    margin-top: -1px;
  }
</style>
