import { VolumeOff, VolumeLow, VolumeMedium, VolumeHigh } from '../Icons'

export const VolumeIcon = ({ volume }) => (
  <div className='relative w-4 h-4 '>
    <VolumeOff
      className={`absolute inset-y-0 left-0 w-4 h-4 transition-opacity duration-200 ease-out ${
        volume === 0 ? 'opacity-1' : 'opacity-0'
      }`}
    />
    <VolumeLow
      className={`absolute inset-y-0 left-0 w-4 h-4 transition-opacity duration-200 ease-out ${
        volume > 0 && volume <= 0.333 ? 'opacity-1' : 'opacity-0'
      }`}
    />
    <VolumeMedium
      className={`absolute inset-y-0 left-0 w-4 h-4 transition-opacity duration-200 ease-out ${
        volume > 0.333 && volume <= 0.667 ? 'opacity-1' : 'opacity-0'
      }`}
    />
    <VolumeHigh
      className={`absolute inset-y-0 left-0 w-4 h-4 transition-opacity duration-200 ease-out ${
        volume > 0.667 ? 'opacity-1' : 'opacity-0'
      }`}
    />
  </div>
)
