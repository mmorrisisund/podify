import { MdVolumeMute, MdVolumeDown, MdVolumeUp } from 'react-icons/md'

export const VolumeIcon = ({ volume, className }) => (
  <div className='relative w-6 h-6 mr-4 text-gray-300 opacity-50'>
    <MdVolumeMute
      className={`absolute inset-y-0 left-0 w-6 h-6  transition-opacity duration-200 ease-out ${
        volume === 0 ? 'opacity-1' : 'opacity-0'
      }`}
    />
    <MdVolumeDown
      style={{ left: 2 }}
      className={`absolute inset-y-0 w-6 h-6  transition-opacity duration-200 ease-out ${
        volume > 0 && volume < 0.5 ? 'opacity-1' : 'opacity-0'
      }`}
    />
    <MdVolumeUp
      style={{ left: 3 }}
      className={`absolute inset-y-0 w-6 h-6 transition-opacity  duration-200 ease-out ${
        volume > 0.5 ? 'opacity-1' : 'opacity-0'
      }`}
    />
  </div>
)
