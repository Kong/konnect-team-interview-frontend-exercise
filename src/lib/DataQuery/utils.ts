export function executeFetch<T>(fetcher: () => Promise<T>, retryLimit:number = 0) {
  function _runner(attempt = 0):Promise<T> {
    return fetcher().catch((err) => {
      if (attempt >= retryLimit) throw err
      return _runner(attempt + 1)
    })
  }
  return _runner()
}