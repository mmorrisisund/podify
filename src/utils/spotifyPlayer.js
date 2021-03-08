import { fetchWithToken } from './spotifyAuth'

const BASE_URL = 'https://api.spotify.com/v1'

const spotifyFetch = (endpoint, config) =>
  fetchWithToken(`${BASE_URL}${endpoint}`, config)

export const play = uri => {
  return spotifyFetch(`/me/player/play`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ uris: [uri] })
  })
}

export const pause = deviceId => {
  const params = new URLSearchParams({ device_id: deviceId })
  return spotifyFetch(`/me/player/pause?${params}`, { method: 'PUT' }).catch(
    console.log
  )
}

export const getCurrentPlaybackState = () =>
  spotifyFetch('/me/player?additional_types=episode')

export const transferPlayback = (deviceId, play = false) =>
  spotifyFetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      device_ids: [deviceId],
      play
    })
  })

export const getAvailableDevices = () => spotifyFetch('/me/player/devices')

export const getCurrentTrack = () =>
  spotifyFetch('/me/player/currently-playing?additional_types=episode')

export const playNextTrack = deviceId =>
  spotifyFetch(`/me/player/next?device_id=${deviceId}`, { method: 'POST' })

export const playPreviousTrack = deviceId =>
  spotifyFetch(`/me/player/previous?device_id=${deviceId}`, { method: 'POST' })

export const seekTo = (position, deviceId) => {
  const params = new URLSearchParams({
    position_ms: position,
    device_id: deviceId
  })
  return spotifyFetch(`/me/player/seek?${params}`, { method: 'PUT' })
}

export const setRepeatMode = (state, deviceId) => {
  const params = new URLSearchParams({ state, device_id: deviceId })
  spotifyFetch(`/me/player/repeat?${params}`, { method: 'PUT' })
}

export const setVolume = (percent, deviceId) => {
  const params = new URLSearchParams({
    volume_percent: percent,
    device_id: deviceId
  })
  spotifyFetch(`/me/player/volume?${params}`, { method: 'PUT' })
}

export const setShuffle = (state, deviceId) => {
  const params = new URLSearchParams({ state, device_id: deviceId })
  spotifyFetch(`/me/player/shuffle?${params}`)
}

export const getRecentlyPlayed = (limit = 20, before, after = 0) => {
  const paramName = before ? 'before' : 'after'
  const paramValue = before ?? after
  const params = new URLSearchParams({ limit, [paramName]: paramValue })
  spotifyFetch(`/me/player/recently-played?${params}`)
}

export const addToQueue = (uri, deviceId) => {
  const params = new URLSearchParams({ uri, device_id: deviceId })
  spotifyFetch(`/me/player/queue?${params}`, { method: 'POST' })
}
