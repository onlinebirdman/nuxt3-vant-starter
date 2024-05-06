import { defineStore } from 'pinia'

interface Dialog {
  visible: Ref<boolean>
  openPayload: Ref<DialogPayload | null>
  closePayload: Ref<DialogPayload | null>
  open: (payload?: DialogPayload) => Promise<void>
  close: (payload?: DialogPayload) => void
}
const dialogImports = import.meta.glob('~/components/dialog/*.vue', { eager: true })
export const useDialog: Dialog = () => {
  const visible = ref(false)
  const openPayload = ref(null)
  const closePayload = ref(null)
  const resolver = ref(null)
  const open = (payload?: any) => {
    return new Promise((resolve) => {
      visible.value = true
      openPayload.value = payload
      resolver.value = resolve
    })
  }
  const close = (payload?: any) => {
    visible.value = false
    closePayload.value = payload
    resolver.value(payload)
  }
  return {
    visible,
    openPayload,
    closePayload,
    open,
    close,
  }
}
export default defineStore('dialog', () => {
  const MyDialogs = reactive<{ [key: string]: Dialog }>({})
  const dialogComponents = shallowRef({})
  for (const path in dialogImports) {
    const name = path.split('/').pop().replace('.vue', '')
    dialogComponents.value[name] = dialogImports[path].default
    MyDialogs[name] = useDialog()
  }
  return {
    MyDialogs,
    dialogComponents,
  }
})
