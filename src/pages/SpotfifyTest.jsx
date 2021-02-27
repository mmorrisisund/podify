import sha256 from 'crypto-js/sha256'
import { Base64 } from 'js-base64'
import { useHistory } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const SpotifyTest = () => {
  const [verifier, setVerifier] = useLocalStorage('code_verifier', '')
  const CLIENT_ID = '6e2838543c824936abe0db7069a36ebb'
  const AUTH_URL = 'https://accounts.spotify.com/authorize?'

  const handleOnClick = () => {
    const codeVerifier =
      'RaL0V7Xsh022VrRMoV8eGNCUjFXJGs3BdDhZSoZ71gruG7xyLwyWjzkb1wUmajzEnhu'
    setVerifier(codeVerifier)
    const codeChallenge = Base64.encode(sha256(codeVerifier))
    const responseType = 'code'
    const redirectURI = encodeURI('http://localhost:3000/spotify-auth')
    const codeChallengeMethod = 'S256'
    const state = Base64.encodeURI(sha256('state'))
    const scope = [
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'app-remote-control',
      'streaming',
      'user-read-email'
    ].join(' ')
    const authUrl = `${AUTH_URL}response_type=${responseType}&client_id=${CLIENT_ID}&redirect_uri=${redirectURI}&scope=${scope}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`

    window.location.replace(authUrl)
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div>
        <button onClick={handleOnClick}>Sign In</button>
      </div>
    </div>
  )
}
