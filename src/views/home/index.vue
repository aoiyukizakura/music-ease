<template>
  <div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">推荐歌单</h2>
      <div>
        <scroll-panel class="mt-3">
          <cover v-for="item in data" :key="item.id" :name="item.name" :pic-url="item.picUrl" :playlistId="item.id" />
        </scroll-panel>
      </div>
    </div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">专属推荐</h2>
      <div>
        <scroll-panel class="mt-3">
          <cover v-for="item in data" :key="item.id" :name="item.name" :pic-url="item.picUrl" :playlistId="item.id" />
        </scroll-panel>
      </div>
    </div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">新专速递</h2>
      <div>
        <scroll-panel class="mt-3">
          <cover v-for="item in data" :key="item.id" :name="item.name" :pic-url="item.picUrl" :playlistId="item.id" />
        </scroll-panel>
      </div>
    </div>
    <div>
      <h2 class="dark:text-white text-xl font-bold">排行榜</h2>
      <div>
        <scroll-panel class="mt-3">
          <cover v-for="item in data" :key="item.id" :name="item.name" :pic-url="item.picUrl" :playlistId="item.id" />
        </scroll-panel>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { recommendPlaylist } from '/@/api/playlist';
  import Cover from '/@cp/cover.vue';
  import ScrollPanel from '/@cp/scroll-panel.vue';
  const data: Array<resultObject> = await recommendPlaylist({ limit: 10 }).then(res => res.result);

</script>
<style lang="postcss"></style>
