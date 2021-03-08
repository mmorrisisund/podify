import { useEffect, useRef, useState } from 'react'
import {
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle
} from '@reach/slider'
import { Time } from '../Time'

export const Progressbar = ({ onProgressChanged, progress, duration }) => {
  const [value, setValue] = useState(0)
  const [progressValue, setProgressValue] = useState(progress)
  const valueRef = useRef(0)

  useEffect(() => {
    setProgressValue(progress)
    setValue(progress / duration)
  }, [progress, duration])

  const handleOnChange = newValue => {
    valueRef.current = newValue
    setValue(newValue)
    setProgressValue(duration * newValue)
  }
  const handleOnMouseUp = () => onProgressChanged?.(valueRef.current)

  return (
    <div className='flex items-center w-full'>
      <Time time={progressValue} className='text-xs text-gray-400' />

      <div className='flex items-center flex-grow'>
        <SliderInput
          value={value}
          min={0}
          max={1}
          step={0.01}
          onChange={handleOnChange}
          onMouseUp={handleOnMouseUp}
        >
          <SliderTrack>
            <SliderRange />
            <SliderHandle />
          </SliderTrack>
        </SliderInput>
      </div>

      <Time time={duration} className='text-xs text-gray-400' />
    </div>
  )
}
