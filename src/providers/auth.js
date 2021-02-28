import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { beginLogin, fetchWithToken } from '../utils/spotifyAuth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', undefined)

  const login = async () => {
    if (localStorage.getItem('tokenSet')) {
      try {
        const user = fetchWithToken('https://api.spotify.com/v1/me')
        setUser(user)
      } catch {
        beginLogin()
      }
    } else {
      beginLogin()
    }
  }
  const logout = () => {
    setUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('You must wrap useAuth in an AuthProvider')
  }
  return context
}

// async function sendRequest (endpoint, body, successCallback) {
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json'
//     },
//     credentials: 'include'
//   }

//   if (body) {
//     requestOptions.headers['Content-Type'] = 'application/json'
//     requestOptions.body = JSON.stringify(body)
//   }

//   const response = await fetch(
//     `/.netlify/functions/${endpoint}`,
//     requestOptions
//   )

//   if (response.ok) {
//     const responseBody = await response.json()
//     successCallback(responseBody)
//   }
// }
