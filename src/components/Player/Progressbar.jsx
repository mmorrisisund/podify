import { useEffect, useRef, useState } from 'react'
import {
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle
} from '@reach/slider'

export const Progressbar = ({ onProgressChanged }) => {
  const [value, setValue] = useState(0)
  const valueRef = useRef(0)

  const handleOnChange = newValue => {
    valueRef.current = newValue
    setValue(newValue)
  }
  const handleOnMouseUp = () => onProgressChanged?.(valueRef.current)

  return (
    <div className='flex-1 w-full'>
      <SliderInput
        value={value}
        onChange={handleOnChange}
        onMouseUp={handleOnMouseUp}
      >
        <SliderTrack>
          <SliderRange />
          <SliderHandle />
        </SliderTrack>
      </SliderInput>
    </div>
  )
}
