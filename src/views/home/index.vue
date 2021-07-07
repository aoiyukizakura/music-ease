<template>
  <div class="home-wrapper h-full overflow-y-auto py-4 px-2">
    <div>
      <h2 class="dark:text-white text-xl font-bold">推荐歌单</h2>
      <div>
        <scroll-panel class="mt-3">
          <cover
            v-for="item in recommendResult"
            :key="item.id"
            :name="item.name"
            :pic-url="item.picUrl"
            :id="item.id"
          />
        </scroll-panel>
      </div>
    </div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">网友精选</h2>
      <div>
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
    </div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">排行榜</h2>
      <div>
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
  </div>
</template>
<script setup lang="ts">
  import { recommendPlaylist, toplists, topPlaylist } from '/@/api/playlist';
  import Cover from '/@cp/cover.vue';
  import ScrollPanel from '/@cp/scroll-panel.vue';
  const [rec, topplay, top] = await Promise.all([
    recommendPlaylist({ limit: 10 }),
    topPlaylist({ limit: 10 }),
    toplists(),
  ]);
  const recommendResult: IRecommendPlaylist[] = rec.result;
  const topPlayResult: any[] = topplay.playlists;
  const topRankResult: any[] = top.list;
</script>
<style lang="postcss"></style>
