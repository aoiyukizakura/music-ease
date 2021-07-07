<template>
  <div class="search-wrapper pt-24 h-full relative">
    <header class="absolute top-0 right-0 left-0">
      <h2 class="dark:text-white text-xl font-bold">搜索</h2>
      <input
        v-model="keyword"
        type="text"
        name="keyword"
        id="keyword"
        class="mt-3 w-full text-base text-gray-600 placeholder-gray-600 font-semibold py-2 px-4 rounded outline-none"
        placeholder="关键字"
        @keypress.enter="onSearch"
      />
    </header>
    <ul class="overflow-y-auto h-full">
      <playlist-item
        class="mb-1"
        v-for="(song, i) in songs"
        :key="i"
        :artist="song.ar"
        :name="song.name"
        :pic-url="song.al.picUrl"
        @on-play="player._playTrack(0, song)"
      />
      <li v-if="loading" class="w-full text-center text-sm text-gray-400 my-4">
        <span>加载中...</span>
      </li>
      <li v-else-if="more" class="w-full text-center text-sm text-gray-400 my-4">
        <span @click="onSearch">加载更多</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import { search } from '/@/api/others';
  import { getTrackDetail } from '/@/api/track';
  import { useStore } from '/@/store';
  import PlaylistItem from '/@cp/playlist-item.vue';

  const store = useStore();
  const player = computed(() => store.state.player);

  const keyword = ref('');
  const page = ref(1);
  const more = ref(false);
  const loading = ref(false);
  const songs: any[] = reactive<any[]>([]);
  const users: any[] = reactive([]);

  async function onSearch() {
    try {
      loading.value = true;
      const { result } = await search({ keywords: keyword.value, limit: 10, offset: page.value - 1, type: 1 });
      const ids = result.songs.map((i: any) => i.id).join(',');
      const { songs: res_songs } = await getTrackDetail(ids);
      songs.push(...res_songs);
      page.value++;
      more.value = result.hasMore;
      loading.value = false;
    } catch (e) {
      loading.value = false;
      console.log(e);
    }
  }
</script>
<style lang="postcss"></style>
