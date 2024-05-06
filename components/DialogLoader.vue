<script setup>
// 动态导入对话框组件
// const dialogImports = import.meta.glob('../components/dialog/*.vue', { eager: true })
// const dialogComponents = {}
// for (const path in dialogImports) {
//   const name = path.split('/').pop().replace('.vue', '')
//   dialogComponents[name] = dialogImports[path].default
// }
const { dialogComponents, MyDialogs } = useDialogService()
const dialogNames = computed(() => {
  return Object.keys(dialogComponents)
})
// dialogStore.register(dialogNames.value)
</script>

<template>
  <div
    v-for="dialogName in dialogNames"
    :key="dialogName"
  >
    <component
      :is="dialogComponents[dialogName]"
      v-if="MyDialogs[dialogName].visible"
    />
  </div>
</template>
