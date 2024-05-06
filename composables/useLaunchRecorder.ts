import { useStorage } from '@vueuse/core'

export default () => {
  const todayStr = new Date().toISOString().substring(0, 10)
  const projectId = location.origin + location.pathname
  const launchRecorder = useStorage(`launchRecorder_${projectId}`, {
    [todayStr]: 0,
  })

  /** 记录次数 */
  const record = () => {
    launchRecorder.value[todayStr] = (launchRecorder.value[todayStr] ?? 0) + 1
  }

  /** 获取次数，默认今天 */
  const getCount = (date: string = todayStr) => {
    return launchRecorder.value[date] ?? 0
  }
  return {
    getCount,
    record,
  }
}
