<script setup lang='ts'>
</script>

<template>
  <div class="default-layout">
    <slot />
  </div>
</template>

<style lang='less' scoped>
.default-layout {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  background-color: #f6f6f6;
  position: relative;
}
</style>
