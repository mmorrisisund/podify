import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key)
    try {
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = value => {
    const valueToBeStored =
      value instanceof Function ? value(storedValue) : value

    try {
      setStoredValue(valueToBeStored)
      window.localStorage.setItem(key, JSON.stringify(valueToBeStored))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
