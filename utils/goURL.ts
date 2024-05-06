export default (url: string) => {
  if (!url)
    return
  location.href = url
}
