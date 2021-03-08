import { useState, useEffect } from 'react'

export const Time = ({ time = 0, ...props }) => {
  const seconds = time / 1000
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [minutesLeft, setMinutesLeft] = useState(0)
  const [hoursLeft, setHoursLeft] = useState(0)

  useEffect(() => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    setSecondsLeft(s)
    setMinutesLeft(m)
    setHoursLeft(h)
  }, [seconds])

  const formatHours = h => (h ? (h < 1 ? '' : String(h).padStart(2, 0)) : '')
  const formatTime = t => (t ? String(t).padStart(2, 0) : '00')

  return (
    <div {...props}>
      <span className='select-none'>{formatHours(hoursLeft)}</span>
      {hoursLeft > 0 && <span>:</span>}
      <span className='select-none'>{formatTime(minutesLeft)}</span>
      <span className='select-none'>:</span>
      <span className='select-none'>{formatTime(secondsLeft)}</span>
    </div>
  )
}
