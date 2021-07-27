<template>
  <div class="flex flex-col text-lg text-white bg-gray-900 pt-4 px-2 w-auto h-full relative">
    <div v-if="login_type === LOGIN_TYPE.ACCOUNT" class="h-full flex flex-col justify-center">
      <input
        v-model="account"
        class="w-full mt-4 px-4 py-2 rounded text-base font-medium text-black"
        type="text"
        placeholder="输入邮箱、手机号"
      />
      <input
        v-model="pwd"
        class="w-full mt-4 px-4 py-2 rounded text-base font-medium text-black"
        type="password"
        placeholder="密码"
      />
      <button class="btn-primary mt-3" type="button" @click="doLogin">账号登录</button>
    </div>
    <div v-if="login_type === LOGIN_TYPE.USERNAME" class="h-full flex flex-col">
      <h2>昵称登录</h2>
      <fieldset>
        <label for="keyword"></label>
        <input
          v-model="nickname"
          class="w-full mt-4 px-4 py-2 rounded text-base font-medium text-black"
          type="text"
          name="username"
          id="username"
          placeholder="请输入您的网易云用户名"
          @keypress.enter="onSearch()"
        />
      </fieldset>
      <ul class="mt-4 space-y-2 overflow-y-auto flex-1 pb-4 overflow-x-hidden">
        <li
          v-for="(u, i) in userProfiles"
          :key="u.userId"
          class="relative h-24 flex transition-all rounded-sm items-center self-start bg-opacity-30 duration-300"
          :class="{ 'transform origin-left -translate-x-24': i === index }"
          @click="index = i"
        >
          <img v-img="u.avatarUrl" alt="头像" class="h-full" />
          <div class="ml-3 flex-1 transition-all">
            <p class="text-xl truncate">{{ u.nickname }}</p>
            <p class="text-sm text-gray-400 mt-1 overflow-elision-3">{{ u.signature }}</p>
          </div>
          <span class="btn-primary absolute -right-20" @click="updateState"> 确认 </span>
        </li>
        <li v-if="loading" class="w-full text-center text-sm text-gray-400 my-4">
          <span>加载中...</span>
        </li>
        <li v-else-if="more" class="w-full text-center text-sm text-gray-400 my-4">
          <span @click="onSearch(true)">加载更多</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, onBeforeMount, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { search } from '/@/api/others';
  import { LOGIN_TYPE } from '/@/index.d';
  import type { UserProfile } from '/@/index.d';
  import { useStore } from '/@/store';
  import { loginWithEmail, loginWithPhone } from '/@/api/auth';

  onBeforeMount(() => {
    if (store.state.loginType && store.state.loginType !== -1) {
      router.replace('/');
    }
  });
  const PAGE_SIZE = 10;
  const store = useStore();
  const router = useRouter();
  const login_type = Number(useRoute().params.type);

  const nickname = ref('');
  const loading = ref(false);
  const more = ref(false);
  const offset = ref(0);
  const index = ref(-1);
  const account = ref('');
  const pwd = ref('');
  const userProfiles = ref<UserProfile[]>([]);

  const loginType = ref<LOGIN_TYPE | -1>(-1);

  function updateState(): void {
    if (!userProfiles.value.length) return;
    store.commit('UPDATE_USERINFO', userProfiles.value[index.value]);
    store.commit('UPDATE_LOGINTYPE', loginType.value);
    store.dispatch('getLikelist');
    router.replace('/library?refresh=1');
  }

  async function doLogin() {
    if (!account.value && !pwd.value) return;
    loginType.value = LOGIN_TYPE.ACCOUNT;
    const cellphone_reg =
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
    const email_reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (cellphone_reg.test(account.value)) {
      // 手机号登录
      const { data } = await loginWithPhone({ phone: account.value, password: pwd.value });
      userProfiles.value.push(data.profile);
      index.value = 0;
      updateState();
    } else if (email_reg.test(account.value)) {
      // 邮箱登录
      const { data } = await loginWithEmail({ email: account.value, password: pwd.value });
      userProfiles.value.push(data.profile);
      index.value = 0;
      updateState();
    } else {
      // 无效账号名
      console.log('无效账号名');
    }
  }

  async function onSearch(loadmore: boolean = false) {
    if (!nickname.value) return;
    if (!loadmore) {
      offset.value = 0;
      userProfiles.value = [];
    }
    loading.value = true;
    try {
      const { data } = await search({ keywords: nickname.value, limit: PAGE_SIZE, offset: offset.value, type: 1002 });
      if (data.result.userprofiles) {
        userProfiles.value = userProfiles.value.concat(data.result.userprofiles);
        offset.value += PAGE_SIZE;
        more.value = data.result.hasMore;
      }
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
      loginType.value = LOGIN_TYPE.USERNAME;
    }
  }
</script>
<style lang="postcss">
  .rotate-y {
    transform: rotateY(-25deg);
  }
</style>
