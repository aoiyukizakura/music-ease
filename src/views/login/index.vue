<template>
  <div class="flex flex-col justify-center text-lg text-white bg-gray-900 p-8 w-auto h-full">
    <div v-if="Number(route.params.type) === LOGIN_TYPE.ACCOUNT">账户登录</div>
    <div v-if="Number(route.params.type) === LOGIN_TYPE.USERNAME">用户名登录</div>
  </div>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { LOGIN_TYPE } from '/@/type';
  const route = useRoute();
</script>
<style lang="postcss"></style>
