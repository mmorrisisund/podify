import {
  MdPlayArrow,
  MdPause,
  MdForward30,
  MdReplay10,
  MdSkipNext,
  MdSkipPrevious
} from 'react-icons/md'

export const PlayerControls = ({
  className,
  onReplay,
  onForward,
  onSkipPrevious,
  onSkipNext,
  onPause,
  onPlay,
  playing
}) => {
  return (
    <div className={className}>
      <div className='flex items-center justify-center space-x-5 text-gray-300'>
        <MdSkipPrevious
          className='w-10 h-10 transition ease-in-out rounded-full cursor-pointer hover:text-gray-100'
          onClick={() => onSkipPrevious?.()}
        />
        <MdReplay10
          className='transition ease-in-out rounded-full cursor-pointer hover:text-gray-100 w-9 h-9'
          onClick={() => onReplay?.()}
        />
        {playing ? (
          <MdPause
            className='w-16 h-16 transition ease-in-out rounded-full cursor-pointer hover:text-gray-100'
            onClick={() => onPause?.()}
          />
        ) : (
          <MdPlayArrow
            className='w-16 h-16 transition ease-in-out rounded-full cursor-pointer hover:text-gray-100'
            onClick={() => onPlay?.()}
          />
        )}
        <MdForward30
          className='transition ease-in-out rounded-full cursor-pointer hover:text-gray-100 w-9 h-9'
          onClick={() => onForward?.()}
        />
        <MdSkipNext
          className='w-10 h-10 transition ease-in-out rounded-full cursor-pointer hover:text-gray-100'
          onClick={() => onSkipNext?.()}
        />
      </div>
    </div>
  )
}
