// query查询 去hash
export default (name: string) => {
  const search = window.location.search.split('?')[1]
  if (search) {
    const params = search.split('&')
    for (const i in params) {
      const param = params[i].split('=')
      if (param[0] === name)
        return param[1]
    }
  }
  return null
}
