import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/file'

import { Progressbar } from './Progressbar'
import { Time } from '../Time'
import { VolumeControl } from './VolumeControl'
import { PlayerControls } from './PlayerControls'

export const Player = ({ className, url }) => {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.1)
  const [{ played, playedSeconds }, setPlayerState] = useState({ played: 0 })
  const [duration, setDuration] = useState(0)
  const playerRef = useRef()

  useEffect(() => {
    if (url) setPlaying(true)
  }, [url])

  const handleOnPlay = () => setPlaying(true)
  const handleOnPause = () => setPlaying(false)
  const handleOnProgress = state => setPlayerState(state)
  const handleOnDuration = d => setDuration(d)
  const handleOnReplay = () => playerRef.current.seekTo(playedSeconds - 10)
  const handleOnForward = () =>
    playerRef.current.seekTo(Math.min(playedSeconds + 30, duration - 1))
  const handleOnProgressChanged = newPercentage =>
    playerRef.current.seekTo(newPercentage, 'fraction')

  return (
    <div id='container' className={`h-full ${className ?? ''}`}>
      <div className='w-full h-full'>
        <div className='flex items-center h-full'>
          <div className='flex flex-col justify-center w-2/3 h-full'>
            <ReactPlayer
              className='hidden'
              ref={playerRef}
              url={url}
              height={0}
              width={0}
              playing={playing}
              progressInterval={250}
              loop={false}
              volume={volume}
              onProgress={handleOnProgress}
              onPlay={handleOnPlay}
              onPause={handleOnPause}
              onDuration={handleOnDuration}
            />

            <PlayerControls
              playing={playing}
              onPause={handleOnPause}
              onPlay={handleOnPlay}
              onReplay={handleOnReplay}
              onForward={handleOnForward}
            />

            <div className='flex items-center space-x-4'>
              <Time seconds={playedSeconds} className='text-xl text-gray-200' />
              <Progressbar
                className='w-full'
                progress={played}
                onProgressChanged={handleOnProgressChanged}
              />
              <Time seconds={duration} className='text-xl text-gray-200' />
            </div>
          </div>

          <VolumeControl className='w-1/3' onChange={setVolume} />
        </div>
      </div>
    </div>
  )
}
