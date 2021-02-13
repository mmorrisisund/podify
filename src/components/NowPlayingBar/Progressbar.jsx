import { useEffect, useState } from 'react'

export const Progressbar = ({ progress, onProgressChanged, className }) => {
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    setProgressValue(progress)
  }, [progress])

  const handleOnInput = e => {
    setProgressValue(e.target.value)
    onProgressChanged(e.target.value)
  }

  return (
    <div className={className ?? ''}>
      <div className='relative w-full group'>
        <div className='absolute w-full h-1 transform -translate-y-1/2 bg-gray-600 top-1/2'>
          <input
            type='range'
            className='absolute w-full transform -translate-y-1/2 opacity-0 cursor-pointer top-1/2'
            min={0}
            max={1}
            step={0.01}
            value={progressValue}
            onInput={handleOnInput}
          />
        </div>
        <div
          className='absolute h-1 transform -translate-y-1/2 bg-gray-200 top-1/2'
          style={{ width: `${progressValue * 100}%` }}
        />
        <div className='w-full transition-opacity opacity-0 group-hover:opacity-100'>
          <output
            style={{
              left: `calc(${progressValue * 100}% - ${progressValue * 12}px)`
            }}
            className='absolute w-3 h-3 transform -translate-y-1/2 bg-gray-200 rounded-full pointer-events-none top-1/2'
          />
        </div>
      </div>
    </div>
  )
}
