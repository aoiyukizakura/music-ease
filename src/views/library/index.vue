<template>
  <div class="h-full pt-4 px-2">
    <div class="text-center h-full flex flex-col space-y-3 justify-center">
      <button class="bg-red-500 active:scale-95 btn" type="button" @click="router.push(`/login/${LOGIN_TYPE.ACCOUNT}`)">
        账号登录
      </button>
      <button
        class="bg-red-500 active:scale-95 btn"
        type="button"
        @click="router.push(`/login/${LOGIN_TYPE.USERNAME}`)"
      >
        昵称登录
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { LOGIN_TYPE } from '/@/type';
  const router = useRouter();
</script>

<style lang="postcss">
  .btn {
    @apply block outline-none rounded text-center px-6 py-3 text-sm text-white focus:outline-none transform transition-all duration-150 mx-auto;
  }

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
