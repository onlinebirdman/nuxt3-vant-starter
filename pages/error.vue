<script setup lang='ts'>
useStateService().launchDone = true
const errorInfo = useSessionStorage('errorInfo', '{}')
function retry() {
  // sessionStorage.clear()
  // localStorage.clear()
  useRouter().replace('/')
}
</script>

<template>
  <div>{{ errorInfo }}</div>
  <van-button @click="retry">
    重试
  </van-button>
</template>

<style lang='less' scoped>

</style>
