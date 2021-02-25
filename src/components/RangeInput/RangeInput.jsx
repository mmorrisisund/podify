import { useEffect, useState } from 'react'

export const RangeInput = ({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  displayValue = false,
  onInput,
  className
}) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setOffset(Number(((value - min) * 100) / (max - min)))
  }, [value, min, max])

  const handleOnInput = e => {
    onInput?.(Number(e.target.value))
  }

  return (
    <div className={className}>
      <div className='relative w-full max-w-xs p-3 group'>
        <div className='absolute right-0 block w-full h-1 transition transform -translate-y-1/2 bg-gray-800 rounded group-hover:bg-gray-200 top-1/2'>
          <input
            type='range'
            className='absolute w-full transform -translate-y-1/2 opacity-0 cursor-pointer top-1/2'
            min={min}
            max={max}
            step={step}
            value={value}
            onInput={handleOnInput}
          />
        </div>
        <output
          style={{ left: `calc(${offset}% - ${12 * (offset / 100)}px)` }} // 12 = 1/2 browser thumb + 1/2 custom thumb
          className='absolute grid w-3 h-3 text-transparent transform -translate-y-1/2 bg-gray-400 rounded-full pointer-events-none select-none group-hover:w-5 group-hover:h-5 group-hover:bg-gray-100 group-hover:-translate-y-1/2 group-hover:scale-150 group-hover:text-black bubble top-1/2 place-items-center '
        >
          {displayValue ? value : ''}
        </output>
      </div>
    </div>
  )
}
