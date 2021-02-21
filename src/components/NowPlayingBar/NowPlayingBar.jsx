import { usePlayContext } from '../../context/PlayContext'
import { MediaDisplay } from './MediaDisplay'
import { Player } from './Player'

export const NowPlayingBar = ({ imageUrl, episode, artist, trackUrl }) => {
  const [{ podcast, currentEpisode }] = usePlayContext()

  return (
    <div className='flex justify-between h-full bg-true-gray-900 align-center'>
      <div className='w-1/3'>
        <MediaDisplay
          image={currentEpisode?.itunes.image}
          episodeName={currentEpisode?.title}
          artistName={podcast?.collectionName}
        />
      </div>

      <div className='flex-grow'>
        <Player url={currentEpisode?.enclosure.url} />
      </div>
    </div>
  )
}
