import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../providers/auth'
import { completeLogin, fetchWithToken } from '../utils/spotifyAuth'

export const SpotifyAuth = () => {
  const { setUser } = useAuth()
  const history = useHistory()

  useEffect(() => {
    async function finishLogin () {
      try {
        await completeLogin()
        const user = await fetchWithToken('https://api.spotify.com/v1/me')
        setUser(user)
        history.replace('/')
      } catch (error) {
        console.log('spotify-auth', error)
        history.replace('/')
      }
    }
    finishLogin()
  }, [setUser, history])

  return null
}
