<script setup lang='ts'>
const props = withDefaults(defineProps<{
  income: any
  percentUnit?: boolean
}>(), {
  income: 0.01,
  percentUnit: true,
})
// 不带百分号的百分比，小数点后保留2位
const percentValue = computed(() => formatter('num2percent', props.income))
</script>

<template>
  <span v-if="income >= 0" color-red>{{ percentValue }}<i v-if="percentUnit">%</i></span>
  <span v-else color-green>{{ percentValue }}<i v-if="percentUnit">%</i></span>
</template>

<style lang='less' scoped>

</style>
