import { Play } from '../Icons'

export const PlayButton = ({ onPlay, className }) => (
  <button
    className={`transition-transform hover:scale-105 active:scale-95 duration-75 focus:outline-none  ${className}`}
    onClick={onPlay}
  >
    <Play />
  </button>
)
