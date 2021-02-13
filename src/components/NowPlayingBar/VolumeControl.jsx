import { useState, useEffect } from 'react'

import { RangeInput } from '../RangeInput'
import { VolumeIcon } from './VolumeIcon'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export const VolumeControl = ({ onChange, className }) => {
  const [volume, setVolume] = useLocalStorage('podify-volume')
  const [preMuteVolume, setPreMuteVolume] = useState(0)

  useEffect(() => {
    if (volume !== 0) {
      setPreMuteVolume(volume)
    }
    onChange?.(volume)
  }, [volume, onChange])

  const handleOnInput = value => {
    setVolume(value)
  }

  const handleOnClick = e => {
    if (volume === 0) {
      setVolume(preMuteVolume)
    } else {
      setVolume(0)
    }
  }

  return (
    <div className={className}>
      <div className='flex justify-center'>
        <button onClick={handleOnClick} className='focus:outline-none'>
          <VolumeIcon volume={volume} />
        </button>

        <RangeInput
          className='w-40'
          onInput={handleOnInput}
          min={0}
          max={1}
          step={0.01}
          value={volume}
        />
      </div>
    </div>
  )
}
