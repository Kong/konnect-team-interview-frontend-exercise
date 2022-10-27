/* eslint-disable @typescript-eslint/ban-types */
export default function useDebounce(): any {
  const debounce = (fn: Function, ms = 600) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function(this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  return { debounce }
}
