import { Play } from '../Icons'

export const PlayButton = ({ onPlay, className }) => (
  <button className={className} onClick={onPlay}>
    <Play />
  </button>
)
