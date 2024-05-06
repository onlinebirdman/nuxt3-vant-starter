import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { apiService } from '~/api'

export const useStateService = defineStore('state', () => {
  return {
    /** 用户当日进入活动的次数 */
    launchCount: computed(() => useLaunchRecorder().getCount()),
    /** 首页加载逻辑是否完成 */
    launchDone: ref(false),
  }
})
