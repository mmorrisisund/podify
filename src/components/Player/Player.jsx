import { useEffect, useRef, useState } from 'react'

import { Progressbar } from './Progressbar'
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
          <div className='flex flex-col w-2/3 h-full justify-evenly'>
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

            <div className='flex items-center w-full space-x-4'>
              <Progressbar
                className='w-full'
                progress={spotifyState?.position}
                duration={spotifyState?.duration}
                onProgressChanged={percent =>
                  player.seek(spotifyState.duration * percent)
                }
              />
            </div>
          </div>

          <div className='flex justify-end w-1/3 mr-4'>
            <VolumeControl onChange={v => player?.setVolume(v + 0.0000001)} />
          </div>
        </div>
      </div>
    </div>
  )
}
