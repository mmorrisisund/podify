import { useEffect, useState } from 'react'
import { PodcastCard } from '../components/PodcastCard'
import { getUserShows } from '../utils'

export const Library = () => {
  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    getUserShows().then(data => setPodcasts(data.items.map(item => item.show)))
  }, [])

  return (
    <div className='flex flex-wrap min-h-screen px-8 py-24 bg-true-gray-900'>
      {podcasts?.map(podcast => (
        <PodcastCard podcast={podcast} />
      ))}
    </div>
  )
}
