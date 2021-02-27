import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CLIENT_ID = '6e2838543c824936abe0db7069a36ebb'

export const SpotifyAuth = () => {
  const [verifier, setVerifier] = useLocalStorage('code_verifier', '')
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code: params.get('code'),
      redirect_uri: 'http://localhost:3000/spotify-auth',
      code_verifier: verifier
    })

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
  }, [location.search, verifier])

  return <div className='w-screen h-screen'></div>
}
