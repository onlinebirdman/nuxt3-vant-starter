<script setup lang='ts'>
useStateService().launchDone = true
const status = computed(() => useRoute().query.status)
function retry() {
  location.replace(location.origin + location.pathname)
  // useStateService().launchDone = false
  // sessionStorage.clear()
  // localStorage.clear()
  // useRouter().replace('/')
}
</script>

<template>
  <div bg="#ffeccb" relative h-100vh w-100vw>
    <div absolute bottom-25px left-25px right-25px top-25px bg="#fff" border-rounded="30px">
      <div flex-col-center-x top-584px gap-20px absolute-center-x>
        <template v-if="status === 'END'">
          <div class="img-end" />
          <p color="#721B16" whitespace-nowrap font-size-32px>
            活动已结束，感谢支持～
          </p>
        </template>
        <template v-else-if="status === 'BEGIN'">
          <div class="img-before" />
          <p color="#721B16" whitespace-nowrap font-size-32px>
            活动未开始，稍后再来吧～
          </p>
        </template>
        <template v-else>
          <div class="img-network-error" />
          <p color="#721B16" whitespace-nowrap font-size-32px>
            网络异常，刷新试试～
          </p>
          <div class="button flex-center" @click="retry">
            刷新一下
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.button {
  color: #ffffff;
  width: 403px;
  height: 83px;
  background: linear-gradient(90deg, #f09440 0%, #ef873f 49%, #eb492c 100%);
  box-shadow: 0px 17px 13px 0px rgba(183, 89, 51, 0.2);
  border-radius: 40px;
}
</style>
