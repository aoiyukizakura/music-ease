<template>
  <div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">推荐歌单</h2>
      <div>
        <scroll-panel class="mt-3">
          <cover v-for="item in recommendResult" :key="item.id" :name="item.name" :pic-url="item.picUrl" :id="item.id" />
        </scroll-panel>
      </div>
    </div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">网友精选</h2>
      <div>
        <scroll-panel class="mt-3">
          <cover v-for="item in topPlayResult" :key="item.id" :name="item.name" :pic-url="item.coverImgUrl" :id="item.id" />
        </scroll-panel>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { recommendPlaylist, topPlaylist } from '/@/api/playlist';
  import Cover from '/@cp/cover.vue';
  import ScrollPanel from '/@cp/scroll-panel.vue';
  const recommendResult: Array<IRecommendPlaylist> = (await recommendPlaylist({ limit: 10 })).result;
  const topPlayResult: Array<any> = (await topPlaylist({ limit: 10 })).playlists;
</script>
<style lang="postcss"></style>
