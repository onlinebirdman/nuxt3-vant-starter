<script setup lang="ts">
const props = defineProps({
  loaded: Boolean,
})

const loadingProcess = ref(0)
const targetProcess = ref(0)
const finished = ref(false)
const duration = ref(600)
const delay = ref(300)
const progressWidth = computed(() => `${loadingProcess.value}%`)

// 监听loaded属性
function watchLoaded() {
  watch(
    () => props.loaded,
    (val) => {
      if (val)
        goto(100, 300)
    },
    {
      immediate: true,
    },
  )
}
// 监听进度条是否到100了
function watchLoading() {
  watch(
    loadingProcess,
    (val) => {
      if (val >= 100) {
        setTimeout(() => {
          finished.value = true
        }, delay.value + duration.value)
      }
    },
    {
      immediate: true,
    },
  )
}
function goto(percent: number, dur = 1000) {
  return new Promise((resolve) => {
    duration.value = dur
    percent = Math.min(Math.max(0, percent), 100)
    const dis = percent - targetProcess.value
    targetProcess.value = percent
    const step = Math.ceil(dis / Math.ceil(dur / 80))
    const timer = setInterval(() => {
      if (loadingProcess.value >= percent) {
        clearInterval(timer)
        return resolve(true)
      }
      loadingProcess.value = Math.min(loadingProcess.value + step, percent)
    }, 80)
  })
}
onMounted(() => {
  const defaultRandomProgress = Math.floor(Math.random() * 100 * 0.2 + 79)
  watchLoading()
  setTimeout(async () => {
    await goto(defaultRandomProgress, 600)
    watchLoaded()
  }, 60)
})
</script>

<template>
  <div v-if="!finished" class="load-page" :disable-scroll="true">
    <div absolute bottom-25px left-25px right-25px top-25px bg="#fff" border-rounded="30px">
      <div class="load-progress-container" top-584px flex-center-y absolute-center-x>
        <div class="load-progress relative flex-center-y justify-end">
          <div class="img-loading" translate-x="20%" />
        </div>
      </div>
      <p color="#721B16" top-668px font-size-32px absolute-center-x>
        loading...
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.load-page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: #ffeccb;

  display: flex;
  flex-direction: column;
  align-items: center;

  .progress-box {
    width: 426px;
    height: 26px;
    background: #ffffff;
    border: 2px solid #ff5748;
    border-radius: 13px;
    box-sizing: border-box;

    .progress-line {
      height: 100%;
      width: 426px;
      border-radius: 13px;
      background: linear-gradient(90deg, #ff5648 0%, #fc765d 100%);
      border-radius: inherit;
      width: 0%;
    }
  }

  .load-desc {
    margin-top: 40px;
    font-size: 32px;
    color: #a23434;
    white-space: no-warp;
  }
}

.load-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.load-progress {
  width: v-bind(progressWidth);
  transition: width 0.2s ease-in-out;
  height: 20px;
  background: linear-gradient(90deg, #a7e671 0%, #71b53e 100%);
  box-shadow: 3px 4px 7px 0px rgba(255, 255, 255, 0.91);
  border-radius: 10px;
}
.load-progress-container {
  width: 440px;
  height: 20px;
  background: #f4e5ce;
  border-radius: 10px;
}
</style>
