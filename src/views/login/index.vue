<template>
  <div class="flex flex-col justify-center text-lg text-white bg-gray-800 p-8 w-auto h-screen">
    <img src="/icon-144x144.png" alt="icon" class="h-16 w-16 mx-auto rounded-lg self-center" />
    <h2 class="text-lg text-white py-4 text-center">网易云音乐</h2>
    <div class="flex flex-col self-center space-y-3 px-2 py-8">
      <router-link to="/"><button class="bg-gray-500 active:bg-gray-700 btn" type="button">登录账号</button></router-link>
      
      <button class="bg-gray-500 active:bg-gray-700 btn" type="button">搜索用户</button>
      <button class="bg-red-500 active:bg-red-700 btn" type="button">直接进入</button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="postcss">
  .btn {
    @apply outline-none rounded-full text-center px-24 py-3 text-sm text-white focus:outline-none;
  }
</style>
