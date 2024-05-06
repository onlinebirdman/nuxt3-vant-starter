import { useStorage } from '@vueuse/core'

export default function useSessionStorage<T>(key: string, defaultValue: T) {
  const storage = useStorage<T>(key, { value: defaultValue }, sessionStorage)
  class V {
    get value() {
      return v.value
    }

    set value(v) {
      v = v.value // 这里需要把value的value取出来，因为v是ref类型
    }
  }

  return storage
}
