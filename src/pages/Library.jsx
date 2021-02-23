import { useEffect, useState } from 'react'
import { PodcastCard } from '../components/PodcastCard'
import { useAuth } from '../providers/auth'
import { getPodcastById } from '../utils/itunesApi'
import {
  clearQueue,
  addPodcastEpisodesToQueue,
  playQueue,
  usePlayContext
} from '../context/PlayContext'

export const Library = () => {
  const { user } = useAuth()
  const [podcasts, setPodcasts] = useState([])
  const [, dispatch] = usePlayContext()

  useEffect(() => {
    async function getPodcasts (urls) {
      const promises = await Promise.allSettled(urls.map(getPodcastById))
      const podcasts = promises.reduce((acc, promise) => {
        if (promise.status === 'fulfilled') {
          return [...acc, promise.value]
        }
        return acc
      }, [])
      setPodcasts(podcasts)
    }
    if (user?.library) {
      getPodcasts(user.library)
    }
  }, [user])

  const handleOnPlay = id => {
    const podcast = podcasts.find(p => p.collectionId === id)

    if (!podcast) return

    dispatch(clearQueue())
    dispatch(addPodcastEpisodesToQueue(podcast))
    dispatch(playQueue())
  }

  return (
    <div className='flex min-h-screen px-8 py-24 bg-true-gray-900'>
      {podcasts.map(p => (
        <PodcastCard
          key={p.collectionId}
          id={p.collectionId}
          author={p.artistName}
          title={p.collectionName}
          image={p.image.url}
          onPlay={handleOnPlay}
        />
      ))}
    </div>
  )
}
