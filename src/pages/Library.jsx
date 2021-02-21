import { useEffect, useState } from 'react'
import { PodcastCard } from '../components/PodcastCard'
import { useAuthContext } from '../context/AuthContext'
import { getPodcastById } from '../utils/itunesApi'

export const Library = () => {
  const { user } = useAuthContext()
  const [podcasts, setPodcasts] = useState([])

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
    getPodcasts(user.library)
  }, [user])

  return (
    <div className='flex min-h-screen px-8 py-24 bg-true-gray-900'>
      {podcasts.map(p => (
        <PodcastCard
          key={p.collectionId}
          id={p.collectionId}
          author={p.artistName}
          title={p.collectionName}
          image={p.image.url}
        />
      ))}
    </div>
  )
}
