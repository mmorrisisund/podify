import { fetchWithToken } from './spotifyAuth'

const BASE_URL = 'https://api.spotify.com/v1'
const spotifyFetch = (endpoint, config) =>
  fetchWithToken(`${BASE_URL}${endpoint}`, config)

// Episodes API
export const getEpisodes = async (...episodes) => {
  return spotifyFetch(`/episodes?ids=${episodes.flat().join(',')}`)
}

export const getEpisode = async id => {
  return spotifyFetch(`/episodes/${id}`)
}

// Library API
export const getUserShows = async (limit = 20, offset = 0) => {
  const params = new URLSearchParams({ limit, offset })
  return spotifyFetch(`/me/shows?${params}`)
}

export const addUserShows = async (...ids) => {
  return spotifyFetch(`/me/shows?ids=${ids.flat().join(',')}`, {
    method: 'PUT'
  })
}

export const removeUserShows = async (...ids) => {
  return spotifyFetch(`/me/shows?ids=${ids.flat().join(',')}`, {
    method: 'DELETE'
  })
}

export const checkUserShows = async (...ids) => {
  return spotifyFetch(`/me/shows/contains?ids=${ids.flat().join(',')}`)
}

// Shows API
export const getShows = async ids => {
  return spotifyFetch(`/shows?${ids.flat().join(',')}`)
}

export const getShow = async id => {
  return spotifyFetch(`/shows/${id}`)
}

export const getShowEpisodes = async (id, limit = 20, offset = 0) => {
  const params = new URLSearchParams({ limit, offset })
  return spotifyFetch(`/shows/${id}/episodes?${params}`)
}

// Search API
export const search = async (query, limit = 20, offset = 0) => {
  const params = new URLSearchParams({
    q: query,
    limit,
    offset,
    type: 'show'
  })
  return spotifyFetch(`/search?${params}`)
}
