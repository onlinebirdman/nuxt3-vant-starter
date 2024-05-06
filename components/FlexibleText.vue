<script setup lang="ts">
import { ref, watchEffect, withDefaults } from 'vue'

withDefaults(
  defineProps<{
    text: string | number
    baseline?: 'top' | 'middle' | 'bottom' | 'left' | 'right'
  }>(),
  {
    text: '',
    baseline: 'left',
  },
)

// Refs
const container = ref<HTMLElement | null>(null)
const scale = ref(1)
watchEffect(() => {
  const containerEl = container.value
  if (containerEl) {
    const parentWidth = containerEl.offsetWidth
    const childWidth = containerEl.scrollWidth
    const scaleFactor = parentWidth < childWidth ? parentWidth / childWidth : 1
    scale.value = scaleFactor
  }
})
onMounted(() => {
  const containerEl = container.value
  if (containerEl) {
    const parentWidth = containerEl.offsetWidth
    const childWidth = containerEl.scrollWidth
    const scaleFactor = parentWidth < childWidth ? parentWidth / childWidth : 1
    scale.value = scaleFactor
  }
})
</script>

<template>
  <div
    ref="container"
    class="flexible-text-container"
  >
    <p :style="{ transform: `scale(${scale})`, transformOrigin: baseline }">
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
.flexible-text-container {
  overflow: hidden;
  white-space: nowrap;
}
</style>
