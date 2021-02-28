import { useParams } from 'react-router-dom'
import { PodcastHeader } from '../components/PodcastHeader'
import { ActionBar } from '../components/ActionBar'
import { EpisodeList } from '../components/EpisodeList/EpisodeList'

import { usePodcast } from '../hooks/queries'

export const Podcast = ({ mainRef }) => {
  const { podcastId } = useParams()
  const { data: podcast, isError, isLoading } = usePodcast(podcastId)

  // const [{ podcast }, dispatch, actions] = usePlayContext()
  // const { user, setUser } = useAuth()

  return (
    <div className='bg-true-gray-900'>
      {isError && <h1>An error occurred.</h1>}
      {!isLoading && (
        <div className='-mt-14'>
          {podcast && (
            <PodcastHeader
              image={podcast.images[0].url}
              name={podcast.name}
              artist={podcast.publisher}
            />
          )}
          <ActionBar />
          <EpisodeList podcastId={podcastId} mainRef={mainRef} />
        </div>
      )}
    </div>
  )
}
