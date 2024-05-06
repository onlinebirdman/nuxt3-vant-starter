<script setup lang='ts'>
const props = defineProps({
  textList: {
    type: Array,
    default: () => [],
  },
})
const randomText = computed(() => {
  return props.textList[Math.floor(Math.random() * props.textList.length)]
})
</script>

<template>
  <span>{{ randomText }}</span>
</template>

<style lang='less' scoped>

</style>
