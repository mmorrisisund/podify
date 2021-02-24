import { useEffect, useState } from 'react'
import { PodcastCard } from '../PodcastCard'
import {
  clearQueue,
  addPodcastEpisodesToQueue,
  playQueue,
  usePlayContext
} from '../../context/PlayContext'
import { searchByGenre } from '../../utils/itunesApi'

export const Category = ({ term }) => {
  const [podcasts, setPodcasts] = useState([])
  const [, dispatch] = usePlayContext()

  useEffect(() => {
    async function fetchPodcasts () {
      const pods = await searchByGenre(term)
      setPodcasts(pods)
    }
    fetchPodcasts()
  }, [term])

  const handleOnPlay = id => {
    const podcast = podcasts.find(p => p.collectionId === id)

    if (!podcast) return

    dispatch(clearQueue())
    dispatch(addPodcastEpisodesToQueue(podcast))
    dispatch(playQueue())
  }

  return (
    <article className='flex flex-col px-8 bg-true-gray-900'>
      <h2 className='text-4xl text-true-gray-100'>{term}</h2>
      <div className='flex'>
        {podcasts.map(podcast => (
          <PodcastCard
            key={podcast.collectionId}
            id={podcast.collectionId}
            author={podcast.artist}
            image={podcast.artworkUrl100}
            title={podcast.collectionName}
            onPlay={handleOnPlay}
          />
        ))}
      </div>
    </article>
  )
}
