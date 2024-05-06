<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import '~/assets/styles/reset-mobile.css'
import 'virtual:image2css'
import 'virtual:uno.css'
</script>

<template>
  <NuxtLayout>
    <LoadingPage :loaded="useStateService().launchDone" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="less" scoped>
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid #fff;
  border-right: 50px solid #fff;
  border-bottom: 100px solid #e9965a;
  // border-top: 100px solid #e9965a;
}
</style>
