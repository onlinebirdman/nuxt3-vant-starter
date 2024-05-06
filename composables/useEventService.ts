import { apiService } from '~/api'
import ProfitPushVue from '~/components/dialog/ProfitPush.vue'

export default () => {
  const onError = (error) => {
    const errorInfo = useSessionStorage('errorInfo', '{}')
    errorInfo.value = JSON.stringify({
      err: error,
    })
    useRouter().replace('/error')
  }
  const events = {
    /** 用户首次进入页面 */
    async onLaunch() {
      useLaunchRecorder().record()
      useStateService().launchDone = true
      try {
        // 首页加载逻辑
      }
      catch (error) {
        onError(error)
      }
    },
  }
  return events
}
