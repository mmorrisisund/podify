import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PodcastHeader } from '../components/Podcast'
import { ActionBar } from '../components/Podcast/ActionBar'
import { EpisodeList } from '../components/Podcast/EpisodeList'
import { getPodcastById } from '../utils/itunesApi'

export const Podcast = () => {
  const [podcast, setPodcast] = useState(null)
  const [error, setError] = useState(false)
  const { podcastId } = useParams()

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const podcast = await getPodcastById(podcastId)
        setPodcast(podcast)
      } catch (error) {
        setError(true)
      }
    }
    fetchPodcast()
  }, [podcastId])

  return (
    <div className='bg-true-gray-900'>
      {error && <h1>An error occurred.</h1>}
      <div className='-mt-14'>
        {podcast && (
          <PodcastHeader
            image={podcast.image.url}
            name={podcast.collectionName}
            artist={podcast.artistName}
          />
        )}
        <ActionBar />
        <EpisodeList episodes={podcast?.items} />
      </div>
    </div>
  )
}
