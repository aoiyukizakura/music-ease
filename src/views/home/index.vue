<template>
  <div class="home-wrapper h-full overflow-y-auto py-4 px-2">
    <div>
      <h2 class="dark:text-white text-xl font-bold">推荐歌单</h2>
      <scroll-panel class="mt-3">
        <cover v-for="item in recommendResult" :key="item.id" :name="item.name" :pic-url="item.picUrl" :id="item.id" />
      </scroll-panel>
    </div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">网友精选</h2>
      <scroll-panel class="mt-3">
        <cover
          v-for="item in topPlayResult"
          :key="item.id"
          :name="item.name"
          :pic-url="item.coverImgUrl"
          :id="item.id"
        />
      </scroll-panel>
    </div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">排行榜</h2>
      <scroll-panel class="mt-3">
        <cover
          v-for="item in topRankResult"
          :key="item.id"
          :name="item.name"
          :pic-url="item.coverImgUrl"
          :id="item.id"
        />
      </scroll-panel>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import type { IRankList, IRecommendPlaylist, ITopPlaylist } from '../../index';
  import { recommendPlaylist, toplists, topPlaylist } from '/@/api/playlist';
  import Cover from '/@cp/cover.vue';
  import ScrollPanel from '/@cp/scroll-panel.vue';

  const pageStatus = ref(true);

  const recommendResult = ref<IRecommendPlaylist[]>([]);
  const topPlayResult = ref<ITopPlaylist[]>([]);
  const topRankResult = ref<IRankList[]>([]);
  
  try {
    const [rec, topplay, top] = await Promise.all([
      recommendPlaylist({ limit: 10 }),
      topPlaylist({ limit: 10 }),
      toplists(),
    ]);
    recommendResult.value = rec.data.result;
    topPlayResult.value = topplay.data.playlists;
    topRankResult.value = top.data.list;
  } catch (error) {
    pageStatus.value = false;
  }
</script>
<style lang="postcss"></style>
