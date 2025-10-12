export function debounce(fn: () => void, duration: number = 300) {
  let timerId:any = null

  return () => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn()
    }, duration)
  }
}