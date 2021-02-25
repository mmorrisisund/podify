import { useQuery } from 'react-query'

export const useUserLibrary = () => {
  return useQuery('library', () => {
    return fetch('/.netlify/functions/user', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => console.error(error))
  })
}
