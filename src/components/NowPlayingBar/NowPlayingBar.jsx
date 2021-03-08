import { MediaDisplay } from './MediaDisplay'
import { Player } from '../Player'
import { useState } from 'react'

export const NowPlayingBar = ({ imageUrl, episode, artist, trackUrl }) => {
  const [playerState, setPlayerState] = useState()

  return (
    <div className='flex justify-between h-full bg-true-gray-900 align-center'>
      <div className='w-1/3'>
        <MediaDisplay
          image={playerState?.track_window.current_track.album.images[0].url}
          episodeName={playerState?.track_window.current_track.name}
          artistName={playerState?.track_window.current_track.artists[0].name}
        />
      </div>

      <div className='flex-grow'>
        <Player onStateChanged={setPlayerState} />
      </div>
    </div>
  )
}
