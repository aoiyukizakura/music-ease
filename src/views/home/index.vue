<template>
  <div class="home-wrapper h-full overflow-y-auto py-4 px-2">
    <div
      v-if="loginType===1"
      class="h-1/6 w-full from-red-400 via-red-600 to-red-400 bg-gradient-to-bl mb-2 flex justify-center items-center font-bold text-2xl"
      @click="router.push('/playlist/0')"
    >
      每日推荐歌单
    </div>
    <div class="mb-2">
      <h2 class="dark:text-white text-xl font-bold">推荐歌单</h2>
      <div class="mt-3 overflow-x-auto w-full space-x-2 flex">
        <cover v-for="item in recommend" :key="item.id" :name="item.name" :pic-url="item.picUrl" :id="item.id" />
      </div>
    </div>
    <div class="mb-2">
      <h2 class="dark:text-white text-xl font-bold">网友精选</h2>
      <div class="mt-3 overflow-x-auto w-full space-x-2 flex">
        <cover v-for="item in topPlay" :key="item.id" :name="item.name" :pic-url="item.coverImgUrl" :id="item.id" />
      </div>
    </div>
    <div class="mb-2">
      <h2 class="dark:text-white text-xl font-bold">排行榜</h2>
      <div class="mt-3 overflow-x-auto w-full space-x-2 flex">
        <cover v-for="item in topRank" :key="item.id" :name="item.name" :pic-url="item.coverImgUrl" :id="item.id" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { LOGIN_TYPE } from '/@/index.d';
  import type { IRankList, IRecommendPlaylist, ITopPlaylist, Recommend } from '/@/index.d';
  import { dailyRecommendPlaylist, recommendPlaylist, toplists, topPlaylist } from '/@/api/playlist';
  import Cover from '/@cp/cover.vue';
  import { useStore } from '/@/store';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const loginType = computed(() => useStore().state.loginType);
  const pageStatus = ref(true);
  const recommend = ref<IRecommendPlaylist[]>([]);
  const topPlay = ref<ITopPlaylist[]>([]);
  const topRank = ref<IRankList[]>([]);

  try {
    const [rec, topplay, top] = await Promise.all([
      recommendPlaylist({ limit: 10 }),
      topPlaylist({ limit: 10 }),
      toplists(),
    ]);
    recommend.value = rec.data.result;
    topPlay.value = topplay.data.playlists;
    topRank.value = top.data.list;
  } catch (error) {
    pageStatus.value = false;
  }
</script>
<style lang="postcss"></style>
