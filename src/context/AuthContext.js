import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(undefined)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { hash } = window.location
    window.location.hash = ''

    const spotifyResult = hash
      ?.substring(1)
      ?.split('&')
      ?.reduce((obj, item) => {
        const [key, value] = item.split('=')
        obj[key] = value
        return obj
      }, {})
    const accessToken = spotifyResult?.access_token
    setAccessToken(accessToken)

    if (accessToken) {
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(createUser)
        .then(setUser)
        .catch(console.error)
    }
  }, [])

  const isLoggedIn = () => accessToken !== undefined
  const logOut = () => setAccessToken(undefined)

  return (
    <AuthContext.Provider value={{ accessToken, isLoggedIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be wrapped in an AuthProvider')
  }
  return context
}

function createUser (spotifyProfile) {
  return {
    displayName: spotifyProfile.display_name
  }
}
