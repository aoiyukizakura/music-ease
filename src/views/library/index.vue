<template>
  <div v-if="pageStatus" class="h-full relativeflex flex-col flex">
    <template v-if="userinfo.userId">
      <header class="bg-gray-800 shadow-lg py-4 px-2 absolute top-0 w-full flex self-start items-center space-x-3">
        <img v-img="userinfo.avatarUrl + '?param=56y56'" alt="头像" class="h-12 w-12 rounded-full relative z-10" />
        <h2 class="flex-1">{{ userinfo.nickname }}的歌单</h2>
        <svg-icon @click="exit" name="logout"></svg-icon>
      </header>
      <ul class="flex-1 overflow-y-auto mt-20 flex flex-wrap px-2 py-4 justify-center">
        <cover
          class="mt-3 mx-3"
          v-for="(p, i) in playlist"
          :key="i"
          :name="p.name"
          :pic-url="p.coverImgUrl"
          :id="p.id"
        />
        <li ref="trigger" v-if="more">
          <loading />
        </li>
      </ul>
    </template>
    <div class="text-center h-full flex flex-col space-y-3 justify-center" v-else>
      <button class="btn-primary" type="button" @click="router.push(`/login/${LOGIN_TYPE.ACCOUNT}`)">账号登录</button>
      <button class="btn-primary" type="button" @click="router.push(`/login/${LOGIN_TYPE.USERNAME}`)">昵称登录</button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, onActivated, onMounted, onUnmounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { LOGIN_TYPE } from '/@/index.d';
  import type { Playlist } from '/@/index.d';
  import { useStore } from '/@/store';
  import SvgIcon from '/@/components/svg-icon.vue';
  import Cover from '/@/components/cover.vue';
  import { userPlaylist } from '/@/api/user';
  import Loading from '/@/components/loading.vue';

  const PAGE_SIZE = 10;

  const store = useStore();
  const router = useRouter();
  const route = useRoute();

  const loading = ref(false);
  const more = ref(true);
  const pageStatus = ref(true);
  const playlist = ref<Playlist[]>([]);
  const offset = ref(0);
  const trigger = ref<HTMLElement | null>(null);

  const userinfo = computed(() => store.state.userInfo);

  const observer = new IntersectionObserver((e, t) => e[0].isIntersecting && getUserData());

  onMounted(() => {
    trigger.value && observer.observe(trigger.value);
  });
  onUnmounted(() => {
    observer.disconnect();
  });
  onActivated(() => {
    if (route.query.refresh && userinfo.value.userId) {
      getUserData();
    }
  });
  async function getUserData(): Promise<void> {
    loading.value = true;
    try {
      const { data } = await userPlaylist({
        uid: userinfo.value.userId,
        limit: PAGE_SIZE,
        offset: offset.value,
      });
      more.value = data.more;
      playlist.value = playlist.value.concat(data.playlist);
      offset.value += PAGE_SIZE;
    } catch (error) {
      console.log(error);
      pageStatus.value = false;
    } finally {
      loading.value = false;
    }
  }

  async function exit() {
    await store.dispatch('logout');
    router.replace('/library');
  }
</script>

<style lang="postcss">
  .jump-active-enter,
  .jump-active-leave {
    transition: transform 0.25s;
    transform-origin: 50% 50%;
  }
  .jump-leave-to,
  .jump-enter-from {
    transform: scale(0);
  }
</style>
