import { useState, useEffect } from 'react'
import {
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle
} from '@reach/slider'

import { VolumeIcon } from './VolumeIcon'

export const VolumeControl = ({ value = 0, onChange }) => {
  const [volume, setVolume] = useState(value)
  const [preMuteVolume, setPreMuteVolume] = useState(0)

  useEffect(() => {
    if (volume !== 0) {
      setPreMuteVolume(volume)
    }
    onChange?.(volume)
  }, [volume, onChange])

  const handleOnChange = value => {
    setVolume(value)
    onChange?.(value)
  }

  const handleOnClick = e => {
    if (volume === 0) {
      setVolume(preMuteVolume)
      onChange?.(preMuteVolume)
    } else {
      setVolume(0)
      onChange?.(0)
    }
  }

  return (
    <div className='w-32'>
      <div className='flex justify-center'>
        <button
          className='flex items-center justify-center w-8 h-8 text-true-gray-500 hover:text-true-gray-200 focus:outline-none'
          onClick={handleOnClick}
        >
          <VolumeIcon volume={volume} />
        </button>

        <div className='flex items-center flex-grow'>
          <SliderInput
            value={volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleOnChange}
          >
            <SliderTrack>
              <SliderRange />
              <SliderHandle />
            </SliderTrack>
          </SliderInput>
        </div>
      </div>
    </div>
  )
}
