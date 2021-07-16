<template>
  <slot name="top"></slot>
  <div class="loading space-x-1 h-6">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
  <slot></slot>
</template>
<style lang="postcss" scoped>
  .loading span {
    display: inline-block;
    height: 100%;
    padding: 2px;
    background-color: #fff;
    -webkit-animation: rotation 1s ease-in-out infinite;
    -moz-animation: rotation 1s ease-in-out infinite;
    animation: rotation 1s ease-in-out infinite;
    &:nth-of-type(1) {
      animation-delay: -0.2s;
      -moz-animation-delay: -0.2s;
    }
    &:nth-of-type(2) {
      animation-delay: -0.4s;
      -moz-animation-delay: -0.4s;
    }
    &:nth-of-type(3) {
      animation-delay: -0.6s;
      -moz-animation-delay: -0.6s;
    }
    &:nth-of-type(4) {
      animation-delay: -0.8s;
      -moz-animation-delay: -0.8s;
    }
  }
  @keyframes rotation {
    0%,
    100% {
      transform: scaleY(0.4);
    }
    50% {
      transform: scaleY(1);
    }
  }
</style>
