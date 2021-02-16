let timeout
export const debounce = (fn, wait = 200) => {
  return function debounced (...args) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      timeout = null
      fn(...args)
    }, wait)
  }
}
