<template>
  <div class="search-wrapper pt-24 h-full relative flex flex-col">
    <header class="absolute top-0 right-0 left-0 pt-4 px-2">
      <h2 class="dark:text-white text-xl font-bold">搜索</h2>
      <input
        v-model="keyword"
        type="text"
        name="keyword"
        id="keyword"
        class="mt-3 w-full text-base text-gray-600 placeholder-gray-600 font-semibold py-2 px-4 rounded outline-none"
        placeholder="关键字"
        @keypress.enter="onSearch()"
      />
    </header>
    <ul class="overflow-y-auto mt-4 flex-1">
      <playlist-item
        class="mb-1"
        v-for="(song, i) in songs"
        :key="i"
        :track="song"
        @on-play="player._playTrack(0, song)"
      />
      <li v-if="loading" class="w-full text-center text-sm text-gray-400 my-4">
        <span>加载中...</span>
      </li>
      <li v-else-if="more" class="w-full text-center text-sm text-gray-400 my-4">
        <span @click="onSearch(true)">加载更多</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import type { UserProfile, Track } from '/@/index.d';
  import { search } from '/@/api/others';
  import { getTrackDetail } from '/@/api/track';
  import { useStore } from '/@/store';
  import PlaylistItem from '/@cp/playlist-item.vue';

  const PAGE_SIZE = 20;

  const store = useStore();
  const player = computed(() => store.state.player);

  const keyword = ref('');
  const offset = ref(0);
  const more = ref(false);
  const loading = ref(false);

  const songs = ref<Track[]>([]);
  const users = ref<UserProfile[]>([]);

  async function onSearch(loadmore: boolean = false) {
    try {
      loading.value = true;
      if (!loadmore) {
        offset.value = 0;
        songs.value = [];
      }
      const {
        data: { result },
      } = await search({ keywords: keyword.value, limit: PAGE_SIZE, offset: offset.value, type: 1 });
      if (result.songs) {
        const ids = result.songs.map((i: any) => i.id).join(',');
        const { data } = await getTrackDetail(ids);
        songs.value = songs.value.concat(data.songs);
        offset.value += PAGE_SIZE;
        more.value = result.hasMore;
      }
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }

</script>
<style lang="postcss"></style>
