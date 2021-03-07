import { useEffect, useRef, useState } from 'react'

import { Progressbar } from './Progressbar'
import { Time } from '../Time'
import { VolumeControl } from '../NowPlayingBar/VolumeControl'
import { PlayerControls } from './PlayerControls'
import { SpotifyConnectDevice } from '../SpotifyConnectDevice'
import { getAccessToken } from '../../utils'

export const Player = () => {
  const [player, setPlayer] = useState()
  const [spotifyState, setSpotifyState] = useState()

  const getOAuthToken = async cb => {
    getAccessToken()
      .then(cb)
      .catch(() => cb(''))
  }

  return (
    <div id='container' className={`h-full`}>
      <div className='w-full h-full'>
        <div className='flex items-center h-full'>
          <div className='flex flex-col justify-center w-2/3 h-full'>
            <SpotifyConnectDevice
              deviceName='podify'
              getOAuthToken={getOAuthToken}
              onPlayerStateChanged={setSpotifyState}
              onReady={setPlayer}
            />
            <PlayerControls
              playing={!spotifyState?.paused}
              onPause={() => player?.pause()}
              onPlay={() => player?.resume()}
              onReplay={() => player.seek(spotifyState.position - 15_000)}
              onForward={() => player.seek(spotifyState.position + 15_000)}
              onSkipPrevious={() => player.previousTrack()}
              onSkipNext={() => player.nextTrack()}
              disabled={!spotifyState}
            />

            <div className='flex items-center space-x-4'>
              <Time seconds={0} className='text-xl text-gray-200' />
              <Progressbar
                className='w-full'
                // progress={played}
                // onProgressChanged={handleOnProgressChanged}
              />
              <Time seconds={0} className='text-xl text-gray-200' />
            </div>
          </div>

          <VolumeControl
            className='w-1/3'
            // onChange={setVolume}
          />
        </div>
      </div>
    </div>
  )
}
