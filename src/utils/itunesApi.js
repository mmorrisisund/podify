import fetchJsonp from 'fetch-jsonp'
import { map, pick, prop } from 'ramda'
import Parser from 'rss-parser'

const BASE_URL = 'https://itunes.apple.com'
const ITUNES_PROPS = [
  'collectionId',
  'artistName',
  'collectionName',
  'feedUrl',
  'artworkUrl30',
  'artworkUrl60',
  'artworkUrl100',
  'artworkUrl1600',
  'collectionExplicitness',
  'trackCount',
  'primaryGenreName',
  'genreIds',
  'genres'
]
const FEED_PROPS = ['items', 'image', 'title', 'description']
const EPISODE_PROPS = [
  'title',
  'isoDate',
  'content',
  'contentSnippet',
  'enclosure',
  'itunes'
]

const getJsonResponse = res => res.json()
const getFetchResults = prop('results')
const getPodcastData = pick(ITUNES_PROPS)
const processSearchResults = map(getPodcastData)

export const searchByTerm = (term, cb) => {
  const safeTerm = encodeURI(term)

  return fetchJsonp(`${BASE_URL}/search?term=${safeTerm}&media=podcast`)
    .then(getJsonResponse)
    .then(getFetchResults)
    .then(processSearchResults)
    .then(cb)
    .catch(console.error)
}

export const getPodcastById = async podcastId => {
  const parser = new Parser()

  try {
    const response = await fetchJsonp(`${BASE_URL}/lookup?id=${podcastId}`)
    const data = await response.json()

    if (data.resultCount !== 0) {
      const [podcastRaw] = data.results
      const podcast = getPodcastData(podcastRaw)
      const feed = await parser.parseURL(podcast.feedUrl).then(pick(FEED_PROPS))
      const episodes = map(pick(EPISODE_PROPS), feed.items)

      return { ...podcast, ...feed, items: episodes }
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
