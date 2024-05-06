let loading
let count = 0
allowMultipleToast()
export default () => {
  const showLoading = () => {
    if (!loading) {
      loading = showLoadingToast({
        duration: 0,
        message: '请稍候...',
        forbidClick: true,
      })
    }
    else {
      count++
    }
  }
  const closeLoading = () => {
    count--
    count = Math.max(0, count)
    if (count <= 0) {
      setTimeout(() => {
        loading && loading.toggle(false)
        loading = false
      }, 200)
    }
  }
  return {
    showLoading,
    closeLoading,
  }
}
