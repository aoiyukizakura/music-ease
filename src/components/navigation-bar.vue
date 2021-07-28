<template>
  <nav class="navigation-bar dark:bg-gray-800 dark:text-gray-500">
    <router-link class="nav-item transform transition-transform scale-90" to="/" active-class="dark:text-white scale-100">
      <svg-icon name="home"></svg-icon>
      <span>首页</span>
    </router-link>
    <router-link class="nav-item transform transition-transform scale-90" to="/search" active-class="dark:text-white scale-100">
      <svg-icon name="search"></svg-icon>
      <span>搜索</span>
    </router-link>
    <router-link class="nav-item transform transition-transform scale-90" to="/library" active-class="dark:text-white scale-100">
      <svg-icon name="library"></svg-icon>
      <span>音乐库</span>
    </router-link>
  </nav>
</template>
<script setup lang="ts"></script>
<style lang="postcss">
  .navigation-bar {
    @apply flex h-16 justify-center items-center rounded-tr-sm rounded-tl-sm font-medium text-sm;
    border-top: 1px solid #000;
  }
  .nav-item {
    @apply flex-1 h-full flex justify-center items-center flex-col;
  }
</style>
