import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PodcastHeader } from '../components/Podcast'
import { ActionBar } from '../components/ActionBar'
import { EpisodeList } from '../components/Podcast/EpisodeList'
import { usePlayContext } from '../context/PlayContext'
import { useAuthContext } from '../context/AuthContext'
import { getPodcastById } from '../utils/itunesApi'

export const Podcast = () => {
  const [{ podcast }, dispatch, actions] = usePlayContext()
  const [error, setError] = useState(false)
  const { podcastId } = useParams()
  const { user, setUser } = useAuthContext()

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const podcast = await getPodcastById(podcastId)
        dispatch({ type: actions.SET_PODCAST, payload: podcast })
      } catch (error) {
        setError(true)
      }
    }
    fetchPodcast()
  }, [podcastId, dispatch, actions.SET_PODCAST])

  const handleOnFollow = () => {
    const existing = user.library.find(p => p === podcastId)

    if (existing) {
      setUser({
        ...user,
        library: [...user.library.filter(p => p !== podcastId)]
      })
    } else {
      setUser({ ...user, library: [...user.library, podcastId] })
    }
  }

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
        <ActionBar onFollow={handleOnFollow} />
        <EpisodeList episodes={podcast?.items} />
      </div>
    </div>
  )
}
