import { useEffect } from 'react'
import { useImportScript } from '../../hooks'
import { getAccessToken } from '../../utils/spotifyAuth'

export const SpotifyConnectDevice = ({
  deviceName,
  getOAuthToken,
  volume,
  onInitializationError,
  onAuthenticationError,
  onAccountError,
  onPlaybackError,
  onPlayerStateChanged,
  onReady,
  onNotReady
}) => {
  useImportScript('https://sdk.scdn.co/spotify-player.js')

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = async () => {
      const player = new window.Spotify.Player({
        name: deviceName,
        getOAuthToken,
        volume
      })

      // Error handling
      player.addListener('initialization_error', params =>
        onInitializationError?.(params)
      )
      player.addListener('authentication_error', params =>
        onAuthenticationError?.(params)
      )
      player.addListener('account_error', params => onAccountError?.(params))
      player.addListener('playback_error', params => onPlaybackError?.(params))

      // Playback status updates
      player.addListener('player_state_changed', params =>
        onPlayerStateChanged?.(params)
      )

      // Ready
      player.addListener('ready', async ({ device_id }) => {
        const accessToken = await getAccessToken()

        await fetch('https://api.spotify.com/v1/me/player', {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            device_ids: [device_id]
          })
        })
        onReady?.(device_id)
      })

      // Not Ready
      player.addListener('not_ready', onNotReady)

      player.connect()
    }
  }, [
    deviceName,
    getOAuthToken,
    volume,
    onInitializationError,
    onAuthenticationError,
    onAccountError,
    onPlaybackError,
    onPlayerStateChanged,
    onReady,
    onNotReady
  ])

  return null
}
