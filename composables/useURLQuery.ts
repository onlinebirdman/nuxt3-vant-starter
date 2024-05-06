export default (key?: string) => {
  const query = useUrlSearchParams('history')
  const queryFromHash = useUrlSearchParams('hash-params')

  const value = key ? query[key] || queryFromHash[key] : undefined
  return {
    value,
    query,
    queryFromHash,
  }
}
